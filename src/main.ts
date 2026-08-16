// Код для открытия/закрытия секции категорий по кнопке на главном экране
const mainBtn = document.querySelector(
  '.main-screen__btn',
) as HTMLButtonElement | null;
const categoriesSection = document.querySelector(
  '.categories',
) as HTMLElement | null;

if (mainBtn && categoriesSection) {
  mainBtn.addEventListener('click', () => {
    // Тогглим класс активности
    const isOpen = categoriesSection.classList.toggle('is-open');

    if (isOpen) {
      // Если секция открылась: ставим твой точный текст и плавно скроллим вниз
      mainBtn.textContent = 'Сховати всіх персонажів';
      categoriesSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Если секция закрылась: возвращаем исходный текст и плавно скроллим наверх
      mainBtn.textContent = 'Показати всіх персонажів';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}
