const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Impede datas anteriores ao dia atual.
const dateInput = document.querySelector("#date");
const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
  .toISOString()
  .split("T")[0];
dateInput.min = localToday;

// Troque este número pelo WhatsApp real da Marta.
// Formato internacional, sem +, espaços ou pontuação.
const WHATSAPP = "5573999999999";

document.querySelector("#orderForm").addEventListener("submit", event => {
  event.preventDefault();

  const name = document.querySelector("#name").value.trim();
  const cake = document.querySelector("#cake").value;
  const date = document.querySelector("#date").value;
  const quantity = document.querySelector("#quantity").value;
  const message = document.querySelector("#message").value.trim();

  const formattedDate = new Date(`${date}T12:00:00`).toLocaleDateString("pt-BR");

  const text = [
    "Olá, Marta! Gostaria de fazer uma encomenda.",
    "",
    `Nome: ${name}`,
    `Bolo: ${cake}`,
    `Quantidade: ${quantity}`,
    `Data: ${formattedDate}`,
    message ? `Observação: ${message}` : ""
  ].filter(Boolean).join("\n");

  const whatsappUrl = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
});
