// імпортуємо дефолтну змінну throttle з модулю 'lodash.throttle'
import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector("form.feedback-form"),
  input: document.querySelector("input[name='email']"),
  textarea: document.querySelector("textarea[name='message']"),
};

const formInputValues = {
  email: "",
  message: "",
};

setValueToInput();

refs.form.addEventListener("input", throttle(onInputChangesSaveValue, 500));
refs.form.addEventListener("submit", onSubmit);

function onInputChangesSaveValue(event) {
  // console.log(formInputValues);

  if (event.target.nodeName === refs.input.nodeName) {
    formInputValues.email = event.target.value;
  } else {
    formInputValues.message = event.target.value;
  };

  // console.log(formInputValues);
  saveValueToLocalStorage();
  // console.log(saveValueToLocalStorage(formInputValues));
};

function saveValueToLocalStorage() {
  localStorage.setItem("feedback-form-state", JSON.stringify(formInputValues));

  // return localStorage.getItem("feedback-form-state");
}

function onSubmit(event) {
  event.preventDefault();

  console.log(formInputValues);

  event.currentTarget.reset();
  localStorage.clear();

  // console.log(formInputValues);
  // console.log(localStorage);
}

function setValueToInput() {
  if (localStorage.getItem("feedback-form-state") === null) {
    // console.log('localStorage порожній');
    return;
  };

  const tempValues = JSON.parse(localStorage.getItem("feedback-form-state"));

  refs.input.value = tempValues.email;
  formInputValues.email = tempValues.email;
  refs.textarea.value = tempValues.message;
  formInputValues.message = tempValues.message;

  // console.log('пушимо дані з localStorage');
  // console.log(tempValues);
  // console.log(formInputValues);
};