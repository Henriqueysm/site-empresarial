const scrollButton = document.getElementById('scrollButton');
  
window.addEventListener('scroll', () => {
  // Detecta o quanto a página foi rolada (em pixels)
  const scrollPosition = window.scrollY;

  // Altere o valor 300 para o número de pixels desejado
  if (scrollPosition > 300) {
    scrollButton.style.display = 'block'; // Mostra o botão
  } else {
    scrollButton.style.display = 'none'; // Esconde o botão
  }
});