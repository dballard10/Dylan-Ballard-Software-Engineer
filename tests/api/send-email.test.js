import { describe, it, expect, vi, beforeEach } from "vitest";

const handler = (await import("../../api/send-email.js")).default;
const { _setClient } = await import("../../api/send-email.js");

const mockSend = vi.fn();

// Helpers to create mock req/res
function mockReq(overrides = {}) {
  return {
    method: "POST",
    body: {
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@example.com",
      phone: "555-1234",
      message: "Hello!",
    },
    ...overrides,
  };
}

function mockRes() {
  const res = {
    statusCode: null,
    headers: {},
    body: null,
    setHeader(key, value) {
      res.headers[key] = value;
      return res;
    },
    status(code) {
      res.statusCode = code;
      return res;
    },
    json(data) {
      res.body = data;
      return res;
    },
    end() {
      return res;
    },
  };
  return res;
}

describe("POST /api/send-email", () => {
  beforeEach(() => {
    mockSend.mockReset();
    mockSend.mockResolvedValue({ data: { id: "test_123" }, error: null });
    _setClient({ emails: { send: mockSend } });
  });

  it("handles OPTIONS preflight with 200", async () => {
    const req = mockReq({ method: "OPTIONS" });
    const res = mockRes();
    await handler(req, res);
    expect(res.statusCode).toBe(200);
  });

  it("rejects non-POST methods with 405", async () => {
    const req = mockReq({ method: "GET" });
    const res = mockRes();
    await handler(req, res);
    expect(res.statusCode).toBe(405);
    expect(res.body.message).toBe("Method not allowed");
  });

  it("returns 400 when required fields are missing", async () => {
    const req = mockReq({ body: { firstName: "Jane" } });
    const res = mockRes();
    await handler(req, res);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/Missing required fields/);
  });

  it("returns 400 for invalid email format", async () => {
    const req = mockReq({
      body: {
        firstName: "Jane",
        lastName: "Doe",
        email: "not-an-email",
        message: "Hi",
      },
    });
    const res = mockRes();
    await handler(req, res);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/valid email/);
  });

  it("sends email and returns 200 on success", async () => {
    const req = mockReq();
    const res = mockRes();
    await handler(req, res);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Email sent successfully!");
    expect(res.body.id).toBe("test_123");
    expect(mockSend).toHaveBeenCalledOnce();
  });

  it("returns 500 when Resend API returns an error object", async () => {
    mockSend.mockResolvedValue({
      data: null,
      error: { message: "Rate limited" },
    });
    const req = mockReq();
    const res = mockRes();
    await handler(req, res);
    expect(res.statusCode).toBe(500);
    expect(res.body.message).toMatch(/Failed to send email/);
  });

  it("returns 500 on unexpected throw", async () => {
    mockSend.mockRejectedValue(new Error("Network down"));
    const req = mockReq();
    const res = mockRes();
    await handler(req, res);
    expect(res.statusCode).toBe(500);
    expect(res.body.message).toMatch(/Internal server error/);
  });

  it("includes phone in email when provided", async () => {
    const req = mockReq();
    const res = mockRes();
    await handler(req, res);
    const callArgs = mockSend.mock.calls[0][0];
    expect(callArgs.html).toContain("555-1234");
    expect(callArgs.text).toContain("555-1234");
  });

  it("omits phone from email when not provided", async () => {
    const req = mockReq({
      body: {
        firstName: "Jane",
        lastName: "Doe",
        email: "jane@example.com",
        message: "Hello!",
      },
    });
    const res = mockRes();
    await handler(req, res);
    const callArgs = mockSend.mock.calls[0][0];
    expect(callArgs.html).not.toContain("Phone:");
  });
});
