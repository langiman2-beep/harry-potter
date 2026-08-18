import { HPCharacter } from './types.js';

const API_URL = 'https://hp-api.onrender.com/api/characters';

/**
 * Универсальная функция загрузки персонажей с лоудером и обработкой ошибок
 */
export async function fetchData(
  container: HTMLElement | null,
  filterFn: (char: HPCharacter) => boolean,
): Promise<HPCharacter[]> {
  if (!container) return [];

  // 1. Показываем лоудер (Замечание Дениса!)
  container.innerHTML = `
    <div class="loading-message" style="color: #f9b50c; text-align: center; font-size: 20px; font-family: 'Inter', sans-serif; width: 100%; margin-top: 50px;">
      🧙‍♂️ Завантаження магії... Зачекайте, будь ласка...
    </div>
  `;

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Помилка сервера: ${response.status}`);
    }
    const allCharacters: HPCharacter[] = await response.json();

    // Очищаем контейнер перед рендером
    container.innerHTML = '';

    // Фильтруем данные по переданному правилу (студенты или препы)
    return allCharacters.filter(filterFn);
  } catch (error) {
    // 2. Выводим ошибку для пользователя на экран (Замечание Дениса!)
    container.innerHTML = `
      <div class="error-message" style="color: #ff4d4d; text-align: center; font-family: 'Inter', sans-serif; width: 100%; margin-top: 50px;">
        <p style="font-size: 22px; font-weight: bold; margin-bottom: 10px;">🔮 Ой-вей! Магічний зв'язок обірвався...</p>
        <span style="color: #aaa;">Не вдалося завантажити персонажів. Спробуйте оновити сторінку трохи пізніше.</span>
      </div>
    `;
    console.error('Помилка при отриманні даних:', error);
    return [];
  }
}
