/**
 * Local test for the self-healing contact form monitor.
 * Run: node tests/local-monitor-test.js
 *
 * Tests the health check and cron monitor endpoints locally
 * using your real RESEND_API_KEY from .env.
 */

const fs = require("fs");
const path = require("path");

// Load .env manually (no dotenv dependency needed)
const envPath = path.join(__dirname, "..", ".env");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim().replace(/^["']|["']$/g, "");
      if (!process.env[key]) process.env[key] = value;
    }
  }
}

// Mock req/res factory
function mockReqRes(overrides = {}) {
  const req = { method: "GET", headers: {}, ...overrides };
  let result = null;
  const res = {
    statusCode: 200,
    headers: {},
    setHeader(k, v) { this.headers[k] = v; return this; },
    status(code) { this.statusCode = code; return this; },
    json(data) { result = data; },
    end() { result = { _ended: true }; },
  };
  return { req, res, getResult: () => ({ statusCode: res.statusCode, body: result }) };
}

let passed = 0;
let failed = 0;

function assert(name, condition, detail) {
  if (condition) {
    console.log(`  \x1b[32mPASS\x1b[0m ${name}`);
    passed++;
  } else {
    console.log(`  \x1b[31mFAIL\x1b[0m ${name}${detail ? ` — ${detail}` : ""}`);
    failed++;
  }
}

async function runTests() {
  console.log("\n\x1b[1m=== Self-Healing Monitor — Local Tests ===\x1b[0m\n");

  // ── Test 1: Health check (happy path) ──
  console.log("\x1b[36mTest 1: Health check — happy path\x1b[0m");
  {
    const healthHandler = require("../api/health.js");
    const { req, res, getResult } = mockReqRes();
    await healthHandler(req, res);
    const { statusCode, body } = getResult();
    assert("Status 200", statusCode === 200, `got ${statusCode}`);
    assert("status: ok", body?.status === "ok", `got ${JSON.stringify(body?.status)}`);
    assert("apiKey check passed", body?.checks?.apiKey === true);
    assert("resendConnection check passed", body?.checks?.resendConnection === true);
    console.log(`    Response: ${JSON.stringify(body)}\n`);
  }

  // ── Test 2: Health check (missing API key) ──
  console.log("\x1b[36mTest 2: Health check — missing API key\x1b[0m");
  {
    const savedKey = process.env.RESEND_API_KEY;
    delete process.env.RESEND_API_KEY;

    // Re-require to get fresh handler (the module reads env at call time, not import time)
    delete require.cache[require.resolve("../api/health.js")];
    const healthHandler = require("../api/health.js");
    const { req, res, getResult } = mockReqRes();
    await healthHandler(req, res);
    const { statusCode, body } = getResult();
    assert("Status 500", statusCode === 500, `got ${statusCode}`);
    assert("status: error", body?.status === "error");
    assert("error mentions 'not set'", body?.error?.includes("not set"), body?.error);

    process.env.RESEND_API_KEY = savedKey;
    console.log(`    Response: ${JSON.stringify(body)}\n`);
  }

  // ── Test 3: Cron monitor (happy path) ──
  console.log("\x1b[36mTest 3: Cron monitor — happy path\x1b[0m");
  {
    delete require.cache[require.resolve("../api/cron/monitor.js")];
    const monitorHandler = require("../api/cron/monitor.js");
    const { req, res, getResult } = mockReqRes();
    await monitorHandler(req, res);
    const { statusCode, body } = getResult();
    assert("Status 200", statusCode === 200, `got ${statusCode}`);
    assert("status: ok", body?.status === "ok");
    console.log(`    Response: ${JSON.stringify(body)}\n`);
  }

  // ── Test 4: Cron monitor (failure path — no dispatch since no GITHUB_PAT) ──
  console.log("\x1b[36mTest 4: Cron monitor — failure triggers error response\x1b[0m");
  {
    const savedKey = process.env.RESEND_API_KEY;
    delete process.env.RESEND_API_KEY;

    delete require.cache[require.resolve("../api/cron/monitor.js")];
    const monitorHandler = require("../api/cron/monitor.js");
    const { req, res, getResult } = mockReqRes();
    await monitorHandler(req, res);
    const { statusCode, body } = getResult();
    assert("Status 500", statusCode === 500, `got ${statusCode}`);
    assert("status: error", body?.status === "error");
    assert("errors array has items", body?.errors?.length > 0, JSON.stringify(body?.errors));
    assert("error mentions API key", body?.errors?.[0]?.includes("RESEND_API_KEY"), body?.errors?.[0]);

    process.env.RESEND_API_KEY = savedKey;
    console.log(`    Response: ${JSON.stringify(body)}\n`);
  }

  // ── Summary ──
  console.log("\x1b[1m=== Results ===\x1b[0m");
  console.log(`  ${passed} passed, ${failed} failed\n`);

  if (failed > 0) {
    console.log("\x1b[31mSome tests failed. Check output above.\x1b[0m\n");
    process.exit(1);
  } else {
    console.log("\x1b[32mAll tests passed! The monitor pipeline is working correctly.\x1b[0m\n");
  }
}

runTests().catch((err) => {
  console.error("\x1b[31mTest runner crashed:\x1b[0m", err);
  process.exit(1);
});
