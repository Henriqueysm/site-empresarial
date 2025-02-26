const carousel = document.querySelector('.carousel');
const images = document.querySelectorAll('.img-carousel');
const progressBar = document.getElementById('progress-bar');
const totalImages = images.length;

let currentIndex = 0;
let isTransitioning = false;

// Atualiza a imagem exibida e reinicia a barra de progresso
function showNextImage() {
  if (isTransitioning) return; // Evita mudanças rápidas demais
  isTransitioning = true;

  currentIndex = (currentIndex + 1) % totalImages;
  updateCarousel();
  restartProgressBar();

  setTimeout(() => {
    isTransitioning = false;
  }, 1000); // Tempo de transição
}

function showPreviousImage() {
  if (isTransitioning) return; // Evita mudanças rápidas demais
  isTransitioning = true;

  currentIndex = (currentIndex - 1 + totalImages) % totalImages;
  updateCarousel();
  restartProgressBar();

  setTimeout(() => {
    isTransitioning = false;
  }, 1000); // Tempo de transição
}

// Atualiza o carrossel
function updateCarousel() {
  const offset = -currentIndex * 100; // Calcula o deslocamento
  carousel.style.transform = `translateX(${offset}%)`;
}

// Reinicia a barra de progresso
function restartProgressBar() {
  progressBar.style.transition = 'none'; // Remove transição para reset
  progressBar.style.width = '0%'; // Reinicia a barra

  setTimeout(() => {
    progressBar.style.transition = 'width 5s linear'; // Reaplica a transição
    progressBar.style.width = '100%'; // Faz a barra preencher
  }, 50); // Pequeno delay para permitir o reset
}

// Eventos de clique para os botões
document.querySelector('.button.left').addEventListener('click', showPreviousImage);
document.querySelector('.button.right').addEventListener('click', showNextImage);

// Alterna automaticamente a imagem a cada 5 segundos
setInterval(showNextImage, 5000);

// Inicia a barra de progresso na primeira imagem
restartProgressBar();
