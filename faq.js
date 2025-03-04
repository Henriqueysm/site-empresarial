document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
      const answer = button.nextElementSibling;

      // Fecha todas as outras respostas abertas
      document.querySelectorAll('.faq-answer').forEach(ans => {
          if (ans !== answer) {
              ans.style.display = 'none';
          }
      });

      // Alterna a visibilidade da resposta clicada
      answer.style.display = (answer.style.display === 'block') ? 'none' : 'block';
  });
});

