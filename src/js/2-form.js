const feedbackForm = document.querySelector('.feedback-form');

let formData = {
    email: "",
    message: ""
};

const fillFormField = () => {
    try {
        const formDataFromLS = JSON.parse(localStorage.getItem("feedback-form-state"));
        if (formDataFromLS === null) {
            return;
        }
        formData = formDataFromLS;
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
    formData[formFieldEl.name] = formFieldEl.value;
    localStorage.setItem("feedback-form-state", JSON.stringify(formData));
};

const onFeedbackFormSubmit = event => {
    event.preventDefault();

    if (!(formData.email && formData.email.trim()) || !(formData.message && formData.message.trim())) {
        alert('Fill please all fields');
        return;
    }

    console.log(formData); // Виведення об'єкта тільки при сабміті

    formData = { email: "", message: "" }; // Очистка об'єкта
    feedbackForm.reset();
    localStorage.removeItem("feedback-form-state");
};

feedbackForm.addEventListener("input", onFormFieldChange);
feedbackForm.addEventListener("submit", onFeedbackFormSubmit);
