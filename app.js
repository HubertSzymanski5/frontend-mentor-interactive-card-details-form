
const confirmButton = document.querySelector("input[type='button']");

confirmButton.addEventListener("click", () => {
    // TODO: verify and then go to thank You
    console.log("brah...");
});

// HANDLE NUMBER
const cardNumberInput = document.querySelector("input[id='card-number']");
const cardNumberDisplay = document.querySelector(".card-number");
cardNumberInput.addEventListener("selectionchange", (e) => {
    // TODO: clear out this space insert / delete logic
    if (cardNumberInput.value.length % 5 === 4) {
        if (cardNumberDisplay.textContent.length > cardNumberInput.value.length) {
            cardNumberInput.value = cardNumberInput.value.substring(0, cardNumberInput.value.length - 1);
        } else {
            cardNumberInput.value += " "
        }
    }
    const value = cardNumberInput.value;
    cardNumberDisplay.textContent = value ? value : "0000 0000 0000 0000";
});

// HANDLE NAME
const cardholderNameInput = document.querySelector("input[id='cardholder-name']");
const cardholderNameDisplay = document.querySelector(".cardholder-name");
cardholderNameInput.addEventListener("selectionchange", () => {
   const value = cardholderNameInput.value;
   cardholderNameDisplay.textContent = value ? value : "name surname";
});

// HANDLE EXP DATE
const expMonthInput = document.querySelector("input[id='card-exp-month']");
const expMonthDisplay = document.querySelector("span.month");
const expYearInput = document.querySelector("input[id='card-exp-year']");
const expYearDisplay = document.querySelector("span.year");
expMonthInput.addEventListener("selectionchange", () => {
   expMonthDisplay.textContent = expMonthInput.value ? expMonthInput.value : "00";
});
expYearInput.addEventListener("selectionchange", () => {
    expYearDisplay.textContent = expYearInput.value ? expYearInput.value : "00";
});

// HANDLE CVC
const cvcInput = document.querySelector("input[id='card-cvc']");
const cvcDisplay = document.querySelector(".cvc");
cvcInput.addEventListener("selectionchange", () => {
    cvcDisplay.textContent = cvcInput.value ? cvcInput.value : "000";
});


// let's clear onload - security ofc
window.onload = () => {
    cardNumberInput.value = "";
    cardholderNameInput.value = "";
    expMonthInput.value = "";
    expYearInput.value = "";
    cvcInput.value = "";
};