const feedbackForm = document.querySelector('.feedback-form');

let formData = {
    email: "",
    message:""
};

const fillFormField = event => {
    try {
        const formDataFromLS = JSON.parse(localStorage.getItem("feedback-form-state"));
        if (formDataFromLS === null) {
            return;
        }
        formData = formDataFromLS;
        console.log(formData);
        for (const key in formDataFromLS) {
            feedbackForm.elements[key].value = formDataFromLS[key]; 
     }  
    }
    catch (err) {
        console.log(err);
    }
};
fillFormField();

const onFormFieldChange = event => {
    const formFieldEl = event.target;

    const fieldValue = formFieldEl.value;
    const fieldName = formFieldEl.name;

    formData[fieldName] = fieldValue;

    localStorage.setItem("feedback-form-state", JSON.stringify(formData));
}

const onFeedbackFormSubmit = event => {
    event.preventDefault();
  if (!(formData.email && formData.email.trim()) || !(formData.message && formData.message.trim())) {
        alert('Fill please all fields');
        return;
    }

    console.log(formData);

    formData = {};
    const formEl = event.currentTarget;
    
    formEl.reset();
    localStorage.removeItem("feedback-form-state");
}

feedbackForm.addEventListener("input", onFormFieldChange);
feedbackForm.addEventListener("submit", onFeedbackFormSubmit);