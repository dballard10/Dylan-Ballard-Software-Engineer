import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Contact from "../../src/variants/variant-e/Contact";

// Mock the email API
vi.mock("../../src/utils/emailApi", () => ({
  sendContactEmail: vi.fn(),
}));

// Mock ScrollAnimation to render children directly
vi.mock("../../src/shared/ScrollAnimation", () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock profile data
vi.mock("../../src/data/profile", () => ({
  profile: {
    contact: {
      email: "test@example.com",
      github: { url: "https://github.com/test" },
      linkedin: { url: "https://linkedin.com/in/test" },
    },
  },
}));

import { sendContactEmail } from "../../src/utils/emailApi";

const mockSendEmail = vi.mocked(sendContactEmail);

// Helper: find the submit button (only button in the form)
const getSubmitButton = () => screen.getByRole("button");

// Helper: fill out the form
async function fillForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText("First Name"), "Jane");
  await user.type(screen.getByLabelText("Last Name"), "Doe");
  await user.type(
    screen.getByLabelText("Email", { selector: "input" }),
    "jane@example.com"
  );
  await user.type(screen.getByLabelText("Message"), "Hello!");
}

describe("Contact component", () => {
  beforeEach(() => {
    mockSendEmail.mockReset();
  });

  it("renders all form fields and submit button", () => {
    render(<Contact />);

    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Email", { selector: "input" })
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
    expect(getSubmitButton()).toBeInTheDocument();
    expect(getSubmitButton()).toHaveTextContent("Send Message");
  });

  it("renders social links", () => {
    render(<Contact />);

    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/test"
    );
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://linkedin.com/in/test"
    );
    expect(screen.getByRole("link", { name: "Email" })).toHaveAttribute(
      "href",
      "mailto:test@example.com"
    );
  });

  it("updates form fields on user input", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const firstNameInput = screen.getByLabelText("First Name");
    await user.type(firstNameInput, "Jane");
    expect(firstNameInput).toHaveValue("Jane");

    const messageInput = screen.getByLabelText("Message");
    await user.type(messageInput, "Hello!");
    expect(messageInput).toHaveValue("Hello!");
  });

  it("calls sendContactEmail with form data on submit", async () => {
    mockSendEmail.mockResolvedValue({ message: "Email sent successfully!" });
    const user = userEvent.setup();
    render(<Contact />);

    await fillForm(user);
    await user.click(getSubmitButton());

    await waitFor(() => {
      expect(mockSendEmail).toHaveBeenCalledWith({
        firstName: "Jane",
        lastName: "Doe",
        email: "jane@example.com",
        phone: "",
        message: "Hello!",
      });
    });
  });

  it("resets form after successful submission", async () => {
    mockSendEmail.mockResolvedValue({ message: "Email sent successfully!" });
    const user = userEvent.setup();
    render(<Contact />);

    await fillForm(user);
    await user.click(getSubmitButton());

    await waitFor(() => {
      expect(screen.getByLabelText("First Name")).toHaveValue("");
      expect(screen.getByLabelText("Last Name")).toHaveValue("");
      expect(
        screen.getByLabelText("Email", { selector: "input" })
      ).toHaveValue("");
      expect(screen.getByLabelText("Message")).toHaveValue("");
    });
  });

  it("shows success notification after successful submission", async () => {
    mockSendEmail.mockResolvedValue({ message: "Email sent successfully!" });
    const user = userEvent.setup();
    render(<Contact />);

    await fillForm(user);
    await user.click(getSubmitButton());

    await waitFor(() => {
      const notification = document.querySelector(".notification-success");
      expect(notification).toBeTruthy();
      expect(notification?.textContent).toBe("Message sent successfully!");
    });
  });

  it("shows error notification on failed submission", async () => {
    mockSendEmail.mockRejectedValue(new Error("Server error"));
    const user = userEvent.setup();
    render(<Contact />);

    await fillForm(user);
    await user.click(getSubmitButton());

    await waitFor(() => {
      const notification = document.querySelector(".notification-error");
      expect(notification).toBeTruthy();
      expect(notification?.textContent).toBe("Server error");
    });
  });

  it("disables submit button while sending", async () => {
    let resolveSubmit: (value: unknown) => void;
    mockSendEmail.mockImplementation(
      () => new Promise((resolve) => { resolveSubmit = resolve as typeof resolveSubmit; })
    );
    const user = userEvent.setup();
    render(<Contact />);

    await fillForm(user);
    await user.click(getSubmitButton());

    await waitFor(() => {
      const button = getSubmitButton();
      expect(button).toBeDisabled();
      expect(button).toHaveTextContent("Sending...");
    });

    // Resolve to clean up
    resolveSubmit!({ message: "done" });
  });

  it("keeps form data on failed submission", async () => {
    mockSendEmail.mockRejectedValue(new Error("Network error"));
    const user = userEvent.setup();
    render(<Contact />);

    await fillForm(user);
    await user.click(getSubmitButton());

    await waitFor(() => {
      expect(document.querySelector(".notification-error")).toBeTruthy();
    });

    expect(screen.getByLabelText("First Name")).toHaveValue("Jane");
    expect(screen.getByLabelText("Last Name")).toHaveValue("Doe");
    expect(
      screen.getByLabelText("Email", { selector: "input" })
    ).toHaveValue("jane@example.com");
    expect(screen.getByLabelText("Message")).toHaveValue("Hello!");
  });
});
