const scriptURL =
  "https://script.google.com/macros/s/AKfycbzjLcr7weUUNKLTgR4jYk0kM2hzz_5PEkKmVlSHS4WIVJsOx1T-gAdf8rLqPWunz6U-MQ/exec";
const form = document.forms["submit-to-google-sheet"];

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const formSendResult = document.querySelector(".form-send");
  formSendResult.textContent = "";
  const drinks = formData.getAll("drinks");
  const submitButton = document.querySelector(".button");
  submitButton.textContent = "Отправка...";
  // Преобразуем массив в строку с разделителем (например, запятая)
  const drinksString = drinks.join(", ");

  // Создаем новый FormData и добавляем все поля
  const newFormData = new FormData();
  newFormData.append("name", formData.get("name"));
  newFormData.append("presence", formData.get("presence"));
  newFormData.append("eat", formData.get("eat") || "-");
  newFormData.append("drinks", drinksString);
  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      body: newFormData,
    });
    formSendResult.textContent = "Спасибо! Анкета отправлена.";
    form.reset(); // Очищаем форму
  } catch (error) {
    formSendResult.textContent = "Повторите попытку позже.";
    console.error(error);
  } finally {
    // Возвращаем кнопку в исходное состояние
    submitButton.textContent = "Отправить";
  }
});

const nameInput = document.getElementById("name");
const errorElement = document.getElementById("error-text");

nameInput.addEventListener("invalid", function (event) {
  event.preventDefault();
  if (this.validity.valueMissing) {
    errorElement.classList.add("show");
  }
});

nameInput.addEventListener("input", function () {
  if (this.value.trim() !== "") {
    errorElement.classList.remove("show");
  }
});

document.querySelectorAll('input[name="presence"]').forEach((radio) => {
  radio.addEventListener("invalid", function (e) {
    e.preventDefault();
    document.getElementById("presenceError").classList.add("show");
    return false;
  });
});

document.querySelectorAll('input[name="presence"]').forEach((radio) => {
  radio.addEventListener("change", function () {
    document.getElementById("presenceError").classList.remove("show");
  });
});




