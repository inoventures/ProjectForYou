const root = document.body;
const themeToggle = document.getElementById("theme-toggle");
const themeToggleLabel = themeToggle?.querySelector(".theme-toggle-label");
const storedTheme = localStorage.getItem("portfolio-theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const activeTheme = storedTheme || (prefersDark ? "dark" : "light");

function setTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem("portfolio-theme", theme);
  if (themeToggleLabel) {
    themeToggleLabel.textContent = theme === "dark" ? "Light Mode" : "Dark Mode";
  }
}

setTheme(activeTheme);

themeToggle?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  setTheme(nextTheme);
});

const reveals = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -40px 0px",
  }
);

reveals.forEach((section, index) => {
  section.style.transitionDelay = `${index * 70}ms`;
  revealObserver.observe(section);
});

const contactForm = document.getElementById("contact-form");
const formNote = document.getElementById("form-note");

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const subject = String(formData.get("subject") || "").trim();
  const message = String(formData.get("message") || "").trim();

  const mailSubject = encodeURIComponent(subject || "Portfolio Enquiry");
  const mailBody = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  );

  window.location.href = `mailto:shubhamdwivedi.me@gmail.com?subject=${mailSubject}&body=${mailBody}`;

  if (formNote) {
    formNote.textContent =
      "Your mail app should open with the message pre-filled. If it does not, use the direct email link instead.";
  }
});
