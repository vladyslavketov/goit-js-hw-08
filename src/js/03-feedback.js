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
  if (event.target.nodeName === refs.input.nodeName) {
    formInputValues.email = event.target.value;
  } else {
    formInputValues.message = event.target.value;
  };

  saveValueToLocalStorage(formInputValues);
};

function saveValueToLocalStorage() {
  localStorage.setItem("feedback-form-state", JSON.stringify(formInputValues));
}

function onSubmit(event) {
  event.preventDefault();

  console.log(formInputValues);
  
  formInputValues.email = "";
  formInputValues.message = "";

  event.currentTarget.reset();
  localStorage.clear();
}

function setValueToInput() {
  if (localStorage.getItem("feedback-form-state") !== null) {
    const tempValues = JSON.parse(localStorage.getItem("feedback-form-state"));

    refs.input.value = tempValues.email;
    refs.textarea.value = tempValues.message;
  }
}

// =================
// if (login.value === "" || password.value === "") {
//     return console.log("Please fill in all the fields!");
//   }