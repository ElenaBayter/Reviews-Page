// Создайте интерактивную веб-страницу для оставления и просмотра отзывов о продуктах. Пользователи могут добавлять отзывы о различных продуктах и просматривать добавленные отзывы.

// Страница добавления отзыва:

// Поле для ввода названия продукта.
// Текстовое поле для самого отзыва.
// Кнопка "Добавить отзыв", которая сохраняет отзыв о продукте в LocalStorage.

// Страница просмотра отзывов:

// Показывает список всех продуктов, о которых были оставлены отзывы.
// При клике на название продукта отображается список всех отзывов по этому продукту.
// Возможность удаления отзыва (при нажатии на кнопку "Удалить" рядом с отзывом, данный отзыв удаляется из LocalStorage).

const addReviewBtn = document.querySelector("#addReview");

if (addReviewBtn) {
  addReviewBtn.addEventListener("click", function () {
    const productName = document.querySelector("#product_name_input").value;
    const reviewText = document.querySelector("#review_text").value;

    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    reviews.push({ productName, reviewText });

    localStorage.setItem("reviews", JSON.stringify(reviews));

    window.location.href = "reviewLook.html";
  });
}

// Просмотр отзывов
window.addEventListener("DOMContentLoaded", function () {
  const reviewsDiv = document.querySelector(".products_reviews");
  const reviews = JSON.parse(localStorage.getItem("reviews")) || [];

  // Отображение отзывов
  reviews.forEach((review) => {
    const reviewElDiv = document.createElement("div");
    const titleEl = document.createElement("h2");
    const textEl = document.createElement("p");
    const deleteBtn = document.createElement("button");

    titleEl.textContent = review.productName;
    textEl.textContent = review.reviewText;
    deleteBtn.textContent = "Удалить отзыв";

    reviewElDiv.appendChild(titleEl);
    reviewElDiv.appendChild(textEl);
    reviewElDiv.appendChild(deleteBtn);
    reviewsDiv.appendChild(reviewElDiv);

    deleteBtn.addEventListener("click", () => {
      // Удаление отзыва из списка
      const index = reviews.findIndex(
        (item) =>
          item.productName === review.productName &&
          item.reviewText === review.reviewText
      );
      if (index !== -1) {
        reviews.splice(index, 1);

        localStorage.setItem("reviews", JSON.stringify(reviews));
      }

      reviewElDiv.remove();
    });
  });
});

const backBtn = document.querySelector(".back_btn");
if (backBtn) {
  backBtn.addEventListener("click", () => {
    window.location.href = "reviewsAdd.html";
  });
}
