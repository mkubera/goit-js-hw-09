var throttle = require('lodash.throttle');

const form = document.querySelector('.feedback-form');
const LOCALSTORAGE_KEY = 'feedback-form-state';

updateForm();

form.addEventListener('input', throttle(saveEmailAndMessage, 500));

function saveEmailAndMessage(evt) {
  const data = {
    email: form.elements.email.value,
    message: form.elements.message.value,
  };
  const dataJSON = JSON.stringify(data);
  localStorage.setItem(LOCALSTORAGE_KEY, dataJSON);
}

function updateForm() {
  if (localStorage.getItem(LOCALSTORAGE_KEY) === null) {
    return;
  } else {
    form.elements.email.value =
      JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)).email || '';
    form.elements.message.value =
      JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)).message || '';
  }
}

form.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();
  console.log(
    '%cParsed JSON from localStorage',
    'color: pink; font-weight: bold',
    JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)),
  );
  localStorage.removeItem(LOCALSTORAGE_KEY);
  form.reset();
}
