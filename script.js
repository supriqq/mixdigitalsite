/* ================================================================
   MIX DIGITAL — LANDING PAGE
   JavaScript puro, sem dependências externas.
================================================================ */

/* ----------------------------------------------------------------
   CONFIGURAÇÃO — EDITE AQUI
   Troque o número de WhatsApp pelo número real da empresa,
   no formato internacional, somente dígitos (DDI+DDD+número).
   Exemplo para (41) 99999-9999 -> "5541999999999"
---------------------------------------------------------------- */
const WHATSAPP_CONFIG = {
  numero: "5541997383631",
  mensagemPadrao: "Olá! Quero saber mais sobre a Mix Digital."
};

document.addEventListener("DOMContentLoaded", () => {
  setupWhatsappLinks();
  setupHeaderScroll();
  setupMobileMenu();
  setupFaqAccordion();
  setupScrollReveal();
  setupFooterYear();
});

/* ----------------------------------------------------------------
   Monta os links de WhatsApp em todos os botões da página.
   Cada botão pode ter um atributo data-msg com uma mensagem
   específica; caso contrário, usa a mensagem padrão.
---------------------------------------------------------------- */
function setupWhatsappLinks() {
  const links = document.querySelectorAll(".js-whatsapp");
  links.forEach((link) => {
    const msg = link.getAttribute("data-msg") || WHATSAPP_CONFIG.mensagemPadrao;
    const url = `https://wa.me/${WHATSAPP_CONFIG.numero}?text=${encodeURIComponent(msg)}`;
    link.setAttribute("href", url);
  });
}

/* ----------------------------------------------------------------
   Adiciona efeito visual (fundo sólido) ao cabeçalho ao rolar.
---------------------------------------------------------------- */
function setupHeaderScroll() {
  const header = document.querySelector(".js-header");
  if (!header) return;

  const toggle = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  toggle();
  window.addEventListener("scroll", toggle, { passive: true });
}

/* ----------------------------------------------------------------
   Controla a abertura/fechamento do menu mobile.
---------------------------------------------------------------- */
function setupMobileMenu() {
  const toggleBtn = document.querySelector(".js-nav-toggle");
  const mobileNav = document.querySelector(".js-nav-mobile");
  if (!toggleBtn || !mobileNav) return;

  toggleBtn.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("is-open");
    toggleBtn.setAttribute("aria-expanded", String(isOpen));
    toggleBtn.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  });

  // Fecha o menu ao clicar em qualquer link
  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("is-open");
      toggleBtn.setAttribute("aria-expanded", "false");
    });
  });
}

/* ----------------------------------------------------------------
   Accordion do FAQ — abre uma pergunta por vez.
---------------------------------------------------------------- */
function setupFaqAccordion() {
  const items = document.querySelectorAll(".faq-item");

  items.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    if (!question || !answer) return;

    question.addEventListener("click", () => {
      const isOpen = question.getAttribute("aria-expanded") === "true";

      // Fecha todos antes de abrir o selecionado
      items.forEach((other) => {
        const otherQuestion = other.querySelector(".faq-question");
        const otherAnswer = other.querySelector(".faq-answer");
        otherQuestion.setAttribute("aria-expanded", "false");
        otherAnswer.style.maxHeight = null;
      });

      if (!isOpen) {
        question.setAttribute("aria-expanded", "true");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
}

/* ----------------------------------------------------------------
   Revela elementos com a classe .reveal conforme entram na tela.
   Usa IntersectionObserver para não pesar no scroll.
---------------------------------------------------------------- */
function setupScrollReveal() {
  const targets = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || targets.length === 0) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  targets.forEach((el) => observer.observe(el));
}

/* ----------------------------------------------------------------
   Atualiza o ano do copyright no rodapé automaticamente.
---------------------------------------------------------------- */
function setupFooterYear() {
  const el = document.querySelector(".js-year");
  if (el) el.textContent = new Date().getFullYear();
}
