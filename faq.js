document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      button.classList.toggle('active'); // Alterna a classe active
      const answer = button.nextElementSibling;
      if (answer.style.display === 'block') {
        answer.style.display = 'none'; // Esconde a resposta
      } else {
        answer.style.display = 'block'; // Exibe a resposta
      }
    });
  });
  