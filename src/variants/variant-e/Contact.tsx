import { useState, type FormEvent } from "react";
import { Mail, Github, Linkedin, Send } from "lucide-react";
import { profile } from "../../data/profile";
import { sendContactEmail } from "../../utils/emailApi";
import { useNotification } from "../../hooks/useNotification";
import ScrollAnimation from "../../shared/ScrollAnimation";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

const INITIAL_FORM: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
};

export default function Contact() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [sending, setSending] = useState(false);
  const { showNotification } = useNotification();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      await sendContactEmail(formData);
      showNotification("Message sent successfully!", "success");
      setFormData(INITIAL_FORM);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to send message.";
      showNotification(message, "error");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="ve-contact">
      <div className="ve-contact__inner">
        <ScrollAnimation>
          <h2 className="ve-contact__title">Let's work together.</h2>
          <p className="ve-contact__subtitle">
            Have a project in mind? Drop me a line.
          </p>
        </ScrollAnimation>

        <ScrollAnimation delay={100}>
          <div className="ve-contact__socials">
            <a
              href={profile.contact.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ve-contact__social-link"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href={profile.contact.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ve-contact__social-link"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href={`mailto:${profile.contact.email}`}
              className="ve-contact__social-link"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </ScrollAnimation>

        <ScrollAnimation delay={200}>
          <form className="ve-contact__form" onSubmit={handleSubmit}>
            <div className="ve-contact__form-row">
              <div className="ve-contact__field">
                <label htmlFor="ve-firstName" className="ve-contact__label">
                  First Name
                </label>
                <input
                  id="ve-firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="ve-contact__input"
                />
              </div>
              <div className="ve-contact__field">
                <label htmlFor="ve-lastName" className="ve-contact__label">
                  Last Name
                </label>
                <input
                  id="ve-lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="ve-contact__input"
                />
              </div>
            </div>

            <div className="ve-contact__field">
              <label htmlFor="ve-email" className="ve-contact__label">
                Email
              </label>
              <input
                id="ve-email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="ve-contact__input"
              />
            </div>

            <div className="ve-contact__field">
              <label htmlFor="ve-message" className="ve-contact__label">
                Message
              </label>
              <textarea
                id="ve-message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                className="ve-contact__textarea"
                rows={4}
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="ve-contact__submit"
            >
              {sending ? "Sending..." : "Send Message"}
              {!sending && <Send size={16} />}
            </button>
          </form>
        </ScrollAnimation>
      </div>
    </section>
  );
}
