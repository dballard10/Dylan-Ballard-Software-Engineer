import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { sendContactEmail } from "../../src/utils/emailApi";

const validForm = {
  firstName: "Jane",
  lastName: "Doe",
  email: "jane@example.com",
  phone: "555-1234",
  message: "Hello!",
};

describe("sendContactEmail", () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("sends POST request with JSON body to the API endpoint", async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ message: "Email sent successfully!" }),
    });

    await sendContactEmail(validForm);

    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/send-email"),
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validForm),
      })
    );
  });

  it("returns parsed response on success", async () => {
    const mockResponse = { message: "Email sent successfully!", id: "abc123" };
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await sendContactEmail(validForm);
    expect(result).toEqual(mockResponse);
  });

  it("throws with server error message on non-ok response", async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false,
      json: () =>
        Promise.resolve({ message: "Missing required fields" }),
    });

    await expect(sendContactEmail(validForm)).rejects.toThrow(
      "Missing required fields"
    );
  });

  it("throws default message when server error has no message", async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({}),
    });

    await expect(sendContactEmail(validForm)).rejects.toThrow(
      "Failed to send email"
    );
  });

  it("throws helpful message when fetch fails (API not running)", async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockRejectedValue(
      new TypeError("fetch failed")
    );

    await expect(sendContactEmail(validForm)).rejects.toThrow(
      /Email API not available/
    );
  });
});
