export function initFaq() {
  const questions = document.querySelectorAll(".lmy-faq__question");

  questions.forEach((question) => {
    question.addEventListener("click", () => {
      const answer = question.nextElementSibling;
      const isOpen = question.getAttribute("aria-expanded") === "true";

      question.setAttribute("aria-expanded", String(!isOpen));
      answer.setAttribute("data-open", String(!isOpen));
    });
  });
}