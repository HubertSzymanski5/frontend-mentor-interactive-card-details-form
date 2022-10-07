const getInputElement = (inputType) => {
    return document.querySelector(`input[id=${inputType.inputId}]`);
}

const getDisplayElement = (inputType) => {
    return document.querySelector(inputType.displaySelector);
}

const getErrorLabel = (inputType) => {
    return document.querySelector(`label[for=${inputType.inputId}].error-info`);
}

function styleError(result, errorLabel, inputElement) {
    if (result) {
        errorLabel.classList.add("hidden");
        inputElement.classList.remove("error");
    } else {
        errorLabel.classList.remove("hidden");
        inputElement.classList.add("error");
    }
}

function isValidNumber(inputElement, errorLabel) {
    const intValue = parseInt(inputElement.value);
    let result;
    if (inputElement.value.trim() === "") {
        errorLabel.textContent = "Can't be blank";
        result = false;
    } else if (!intValue || intValue < 1) {
        errorLabel.textContent = "Invalid value"
        result = false;
    } else {
        result = true;
    }
    styleError(result, errorLabel, inputElement);
    return result;
}

const inputTypes = {
    cardNumber: {
        inputId: "card-number",
        displaySelector: ".card-number",
        modifyDuringType: (input, display) => {
            if (input.value.length % 5 === 4) {
                if (display.textContent.length > input.value.length) {
                    input.value = input.value.substring(0, input.value.length - 1);
                } else {
                    input.value += " "
                }
            }
        },
        isValid: (inputType) => {
            const regex = new RegExp("[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}");
            const inputElement = getInputElement(inputType);
            const errorLabel = getErrorLabel(inputType);
            let result;
            if (inputElement.value.trim() === "") {
                errorLabel.textContent = "Can't be blank";
                result = false;
            } else if (inputElement.value.replaceAll(" ", "").length !== 16) {
                errorLabel.textContent = "Wrong format, too short";
                result = false;
            } else if (!regex.test(inputElement.value.trim())) {
                errorLabel.textContent = "Wrong format, numbers only";
                result = false;
            } else {
                result = true;
            }
            styleError(result, errorLabel, inputElement);
            return result;
        },
        default: "0000 0000 0000 0000"
    },
    cardholderName: {
        inputId: "cardholder-name",
        displaySelector: ".cardholder-name",
        isValid: (inputType) => {
            const regex = new RegExp("^[A-Za-z\- ]+$");
            const inputElement = getInputElement(inputType);
            const errorLabel = getErrorLabel(inputType);
            let result = true;
            if (inputElement.value.trim() === "") {
                errorLabel.textContent = "Can't be blank";
                result = false;
            } else if (!regex.test(inputElement.value.trim())) {
                errorLabel.textContent = "Illegal characters";
                result = false;
            }
            styleError(result, errorLabel, inputElement);
            return result;
        }
        ,
        default: "name surname"
    },
    expMonth: {
        inputId: "card-exp-month",
        displaySelector: "span.month",
        modifyDisplay: (inputValue) => {
            return inputValue.length === 1 ? "0" + inputValue : inputValue;
        },
        isValid: (inputType) => {
            let result;
            const inputElement = getInputElement(inputType);
            const errorLabel = getErrorLabel(inputType);
            const intValue = parseInt(inputElement.value);
            if (inputElement.value.trim() === "") {
                errorLabel.textContent = "Can't be blank";
                result = false;
            } else if (!intValue || intValue > 12 || intValue < 1) {
                errorLabel.textContent = "Invalid value"
                result = false;
            } else {
                result = true;
            }
            styleError(result, errorLabel, inputElement);
            return result;
        },
        default: "00"
    },
    expYear: {
        inputId: "card-exp-year",
        displaySelector: "span.year",
        modifyDisplay: (inputValue) => {
            return inputValue.length === 1 ? "0" + inputValue : inputValue;
        },
        isValid: (inputType) => {
            const inputElement = getInputElement(inputType);
            const errorLabel = getErrorLabel(inputTypes.expMonth);
            return isValidNumber(inputElement, errorLabel);
        },
        default: "00"
    },
    cardCvc: {
        inputId: "card-cvc",
        displaySelector: ".cvc",
        isValid: (inputType) => {
            const inputElement = getInputElement(inputType);
            const errorLabel = getErrorLabel(inputType);
            return isValidNumber(inputElement, errorLabel);
        },
        default: "000"
    }
}

const handleFormFilling = () => {
    for (let inputKey in inputTypes) {
        const inputType = inputTypes[inputKey];
        const inputElement = getInputElement(inputType);
        const displayElement = getDisplayElement(inputType);
        inputElement.addEventListener("selectionchange", () => {
            if (inputType.modifyDuringType) {
                inputType.modifyDuringType(inputElement, displayElement);
            }
            let value = inputElement.value;
            if (inputType.modifyDisplay) {
                value = inputType.modifyDisplay(value);
            }
            displayElement.textContent = value ? value : inputType.default;
        });
    }
};

handleFormFilling();
window.onload = () => {
    for (let inputKey in inputTypes) {
        getInputElement(inputTypes[inputKey]).value = "";
    }
};

function handleConfirmAndContinue() {
    const confirmButton = document.querySelector("input[type='button']");
    confirmButton.addEventListener("click", () => {
        let isFormValid = true;
        for (let inputKey in inputTypes) {
            isFormValid = inputTypes[inputKey].isValid(inputTypes[inputKey]) && isFormValid;
        }
        if (isFormValid) {
            document.querySelector(".card-front").classList.add("rotate");
            document.querySelector(".card-back").classList.add("rotate");
            document.querySelector("form").classList.add("rotate-out");
            setTimeout(() => {
                document.querySelector("form").classList.add("hidden");
                document.querySelector("div.completed").classList.remove("hidden");
                document.querySelector("div.completed").classList.add("rotate-in");

            }, 1000);
        }
    });

    const continueLink = document.querySelector(".completed a");
    continueLink.addEventListener("click", () => {
        window.location.reload();
    });
}

handleConfirmAndContinue();
