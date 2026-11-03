// Существующее модальное окно из КР №1: только открытие и закрытие.
const orderDialog = document.getElementById('order-dialog');
const closeDialogButton = document.getElementById('close-order-dialog');

if (orderDialog && closeDialogButton) {
  document.querySelectorAll('.product-card__button').forEach((button) => {
    button.addEventListener('click', () => {
      document.getElementById('selected-product').value = button.dataset.product;
      orderDialog.showModal();
    });
  });
  closeDialogButton.addEventListener('click', () => orderDialog.close());
}

// Базовая проверка форм. Контакты не отправляются и не сохраняются.
const successMessage = document.getElementById('success-message');
document.querySelectorAll('.order-form, .contact-form').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    successMessage.hidden = true;
    Array.from(form.elements).forEach((field) => {
      if (field.willValidate) {
        if (field.validity.valid) field.removeAttribute('aria-invalid');
        else field.setAttribute('aria-invalid', 'true');
      }
    });
    if (!form.reportValidity()) return;
    form.reset();
    if (orderDialog && orderDialog.contains(form)) orderDialog.close();
    successMessage.hidden = false;
    successMessage.focus();
  });
  form.addEventListener('input', (event) => {
    if (event.target.validity && event.target.validity.valid) {
      event.target.removeAttribute('aria-invalid');
    }
    successMessage.hidden = true;
  });
});
