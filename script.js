// Dark / light theme toggle (remembers your choice)
const toggleBtn = document.getElementById("theme-toggle");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  toggleBtn.textContent = "☀️";
}

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  toggleBtn.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Typing effect
const words = ["Software Developer", "Engineering Student", "Football Lover"];
const typingEl = document.getElementById("typing");
let wordIndex = 0, charIndex = 0, deleting = false;

function type() {
  const word = words[wordIndex];
  typingEl.textContent = deleting
    ? word.substring(0, charIndex--)
    : word.substring(0, charIndex++);

  let delay = deleting ? 50 : 100;

  if (!deleting && charIndex > word.length) {
    deleting = true;
    delay = 1500;
  } else if (deleting && charIndex < 0) {
    deleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    charIndex = 0;
    delay = 400;
  }
  setTimeout(type, delay);
}
type();

// Calculate age automatically from date of birth
const dob = new Date(2007, 9, 14); // 14 Oct 2007 (month is 0-based)
const today = new Date();
let age = today.getFullYear() - dob.getFullYear();
const hadBirthday =
  today.getMonth() > dob.getMonth() ||
  (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());
if (!hadBirthday) age--;
document.getElementById("age").textContent = age + " years";

// Footer year
document.getElementById("year").textContent = today.getFullYear();

// Scroll reveal animation
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Highlight active nav link while scrolling
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((sec) => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + current);
  });
});