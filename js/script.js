document.getElementById("name").focus();
const OptionsOther = document.getElementById("other-job-role");
const JobroledropDown = document.getElementById("title");
OptionsOther.style.display = "none";
const ColorSelect = document.getElementById("shirt-colors");
ColorSelect.style.display = "none";
const dropboxColor = ColorSelect.querySelector("select");
const DesignSelect = document.getElementById("design");
const designoptions = DesignSelect.querySelectorAll("option");
const colorOptions = ColorSelect.querySelectorAll("option");
const ColorDefault = ColorSelect.querySelector("option[selected][hidden]");
const Activities = document.getElementById("activities");
const activitiesLabel = Activities.querySelectorAll("label");
console.log(activitiesLabel.length);

const CheckboxActivities = Activities.querySelectorAll("input");
console.log(CheckboxActivities.length);
const activitiescost = document.getElementById("activities-cost");
let cost = 0;

const zipBox = document.querySelector(".zip-box");
const ZipInput = zipBox.querySelector("input");
const ccInput = document.getElementById("cc-num");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");

const cvvBox = document.querySelector(".cvv-box");
const cvvInput = cvvBox.querySelector("input");
//select the payment dropdown
const selectPayment = document.getElementById("payment");
selectPayment.value = "credit-card";
//the credit card option has the a property with crdit card value,
//to make it our default opotion we call our select, and its value will be the calue of the property of the option credit card

//blocks with payment content
const creditCard = document.getElementById("credit-card");
const paypal = document.getElementById("paypal");
const bitcoin = document.getElementById("bitcoin");

paypal.style.display = "none";
bitcoin.style.display = "none";

const form = document.querySelector("form");
//regex validators for text fieldset
const validateName = /^[a-zA-Z][a-zA-Z '.-]{1,49}$/;
const validateEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const validateCreditCard = /^(?:\d[ -]*?){13,16}$/;
const validateZip = /^\d{5}(?:-\d{4})?$/;
const validateCvv = /^[0-9]{3,4}$/;

//function that iterates the activites checkboxes and applies or removes focus
const Focustactivities = function Focus() {
  for (let i = 0; i < CheckboxActivities.length; i++) {
    CheckboxActivities[i].addEventListener("focus", () => {
      CheckboxActivities[i].classList.add("focus");
      CheckboxActivities[i].parentElement.classList.add("focus");
    });
  }

  for (let i = 0; i < CheckboxActivities.length; i++) {
    CheckboxActivities[i].addEventListener("blur", () => {
      CheckboxActivities[i].classList.remove("focus");
      CheckboxActivities[i].parentElement.classList.remove("focus");
    });
  }
};
//call the function so it runs all the time
Focustactivities();

//submit button will call all our functions that validate the fields and checkboxes
form.addEventListener("submit", (e) => {
  validateInputs(
    validateName.test(nameInput.value),
    nameInput.parentElement,
    e,
  );

  validateInputs(
    validateEmail.test(emailInput.value),
    emailInput.parentElement,
    e,
  );

  validateActivity(e);

  //if payment is selcted in the dropdown call the functions that verify the inpput fields of the cc
  if (selectPayment.value === "credit-card") {
    validateInputs(
      validateCreditCard.test(ccInput.value),
      ccInput.parentElement,
      e,
    );

    validateInputs(validateZip.test(ZipInput.value), zipBox, e);
    validateInputs(validateCvv.test(cvvInput.value), cvvBox, e);
  }
});

//validate that any input in activities is checked
function validateActivity(e) {
  //utilizar some para encontrar minimo un valor con checked
  //para usar el metodo de filter tenemos que convertir nuestro Nodelist a array, solo en array existe este metodo
  //convertimos el nodelist a arrglo, con from iteramos en cada uno y con filter ponemos la condicion de que encuentre 1 coincidencia
  const valid = Array.from(CheckboxActivities).filter((ch) => ch.checked);

  //seleccionamos el p con su id para facilitar el acceso
  const span = Activities.querySelector("#activities-hint");

  //comprobamos si tenemos un valor checked y aplicacamos diferentes clases dependiendo si se cumple o no
  if (valid.length >= 1) {
    span.style.display = "none";
    console.log("si tenemos actividades seleccionadas");
    Activities.classList.remove("not-valid");
  } else {
    e.preventDefault();
    span.style.display = "inline";
    Activities.classList.add("not-valid");
  }
}

function validateInputs(validation, label, e) {
  //the only way to select both spans was targeting the spans with last of type, cause they dont have anything in common and the first span interferes in the selection
  const span = label.querySelector("span:last-of-type");
  console.log(span);
  if (validation) {
    label.classList.remove("not-valid", "error-border");
    label.classList.add("valid");

    span.style.display = "none";
  } else {
    e.preventDefault();
    label.classList.add("not-valid", "error-border");
    span.style.display = "inline";
  }
}

//hide de divs that are not the ones of the selected option

selectPayment.addEventListener("change", (e) => {
  if (e.target.value === "credit-card") {
    creditCard.style.display = "block";
    paypal.style.display = "none";
    bitcoin.style.display = "none";
  } else if (e.target.value === "paypal") {
    paypal.style.display = "block";
    bitcoin.style.display = "none";
    creditCard.style.display = "none";
  } else if (e.target.value === "bitcoin") {
    creditCard.style.display = "none";
    paypal.style.display = "none";
    bitcoin.style.display = "block";
  }
});

//sum or substract price from depending on the selected activities
//the sum is made to a global variable
Activities.addEventListener("change", (e) => {
  const checkbox = e.target;
  const checkboxprice = parseInt(checkbox.dataset.cost);
  const checked = checkbox.checked; //returns a boolean

  if (checked) {
    cost += checkboxprice;
    activitiescost.textContent = `Total: $${cost}`;
  } else {
    cost -= checkboxprice;
    activitiescost.textContent = `Total: $${cost}`;
  }
});

function showColors(colorarr, colortype) {
  //iteration over each color option available in our div
  for (let i = 0; i < colorarr.length; i++) {
    dropboxColor.value = ColorDefault.value; //reseteamos el valor del dropdown
    colorarr[i].style.display = "inline"; //display every option
    const unavailable = colorarr[i].dataset.theme; //colors that will be hidden, we target the dataset theme because all the options have the same data set,
    //this way the function iterates the option and compares his data set theme value to the one we sent when calling the func
    if (
      //if unvailable is === to the theme value sent  or if its the option thats shows as default will be hidden
      unavailable === colortype ||
      colorarr[i].text === "Select a design theme above"
    ) {
      console.log(`${colortype} will hide`);
      colorarr[i].style.display = "none"; //target each option that its value is the same as the theme value we sent
    }
  }
}

//add eventlistener to our design dropdown
DesignSelect.addEventListener("change", (e) => {
  ColorSelect.style.display = "inline"; //show the color dropdown once we
  if (e.target.value === "js puns") {
    //if the value of the option we selected is js puns it will do the following
    console.log(ColorDefault.value);
    console.log(ColorSelect.value);

    console.log(`puns selected`);
    //my logic was to hide all the options different to the one i selected with the func
    showColors(colorOptions, "heart js");
  } else {
    showColors(colorOptions, "js puns");
  }
});

//for the jobroledropdown
JobroledropDown.addEventListener("change", (e) => {
  if (e.target.value === "other") {
    OptionsOther.style.display = "inline";
  } else {
    console.log(
      `no seleccionaste la opcion other, el testfield permanecera oculto`,
    );
    //hide the dropdown if it isnt selected
    OptionsOther.style.display = "none";
  }
});
