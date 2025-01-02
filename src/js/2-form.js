const inputForm = document.querySelector('input');
inputForm.classList.add('input-form-email');
const textareaForm = document.querySelector('textarea');
textareaForm.classList.add('textarea-form-message');
const buttonForm = document.querySelector('button');
buttonForm.classList.add('btn-form-submit');

const feedbackFormEl = document.querySelector('.feedback-form');
let formData = {
  email: '',
  message: '',
};

const fillFormFields = () => {
  try {
    const formStateFromLS = JSON.parse(
      localStorage.getItem('feedback-form-state')
    );

    if (formStateFromLS === null) {
      return;
    }

    formData = formStateFromLS;
    for (const key in formStateFromLS) {
      feedbackFormEl.elements[key].value = formStateFromLS[key];
    }
  } catch (err) {
    console.log(err);
  }
};

fillFormFields();

const onFormFieldInput = event => {
  const { target: formFieldEl } = event;

  const fieldValue = formFieldEl.value;
  const fieldName = formFieldEl.name;

  formData[fieldName] = fieldValue;

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};

const onFeedbackFormSubmit = event => {
  event.preventDefault();

  if (formData.email === '' || formData.message === '') {
    alert('Fill please all fields');
  } else {
    console.log(formData);
  }

  const { currentTarget: formEl } = event;

  formEl.reset();
  localStorage.removeItem('feedback-form-state');
};

feedbackFormEl.addEventListener('input', onFormFieldInput);
feedbackFormEl.addEventListener('submit', onFeedbackFormSubmit);