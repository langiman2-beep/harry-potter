// Находим элементы на странице
const startBtn = document.querySelector('.main-screen__btn');
const mainScreen = document.querySelector('.main-screen');
const categoriesScreen = document.querySelector('.categories');

// Слушаем клик по желтой кнопке
startBtn.addEventListener('click', () => {
  /* Переключаем класс открытия у категорий: 
     если его нет — он добавится (категории откроются ниже), 
     а если он уже есть — он снимется (категории спрячутся) */
  categoriesScreen.classList.toggle('is-open');

  /* Проверяем, открылись ли категории прямо сейчас, 
     и меняем текст на кнопке в зависимости от этого */
  if (categoriesScreen.classList.contains('is-open')) {
    startBtn.textContent = 'Сховати персонажів';
  } else {
    startBtn.textContent = 'Показати всіх персонажів';
  }
});
