const weddingDate = new Date("2026-08-22T13:00:00");
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function updateCountdown() {
  const now = new Date();
  const diff = weddingDate.getTime() - now.getTime();

  if (diff <= 0) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  daysEl.textContent = String(days).padStart(2, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

const rsvpForm = document.getElementById("rsvp-form");
const rsvpStatus = document.getElementById("rsvp-status");

rsvpForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!rsvpForm.checkValidity()) {
    rsvpStatus.textContent = "Please complete all required RSVP fields before submitting.";
    return;
  }

  const data = Object.fromEntries(new FormData(rsvpForm).entries());
  const key = `rsvp-${Date.now()}`;
  localStorage.setItem(key, JSON.stringify(data));

  rsvpStatus.textContent = `Thank you, ${data.fullName}. Your RSVP for ${data.attendance} has been received.`;
  rsvpForm.reset();
});

const copyStatus = document.getElementById("copy-status");
const copyButtons = document.querySelectorAll(".copy-btn");

copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const accountNumber = button.dataset.copy;

    try {
      await navigator.clipboard.writeText(accountNumber);
      copyStatus.textContent = `Account number ${accountNumber} copied to clipboard.`;
    } catch (error) {
      copyStatus.textContent = "Copy failed. Please copy manually.";
    }
  });
});

const revealSections = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.15 }
);

revealSections.forEach((section) => observer.observe(section));

const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  primaryNav.classList.toggle("open");
});
