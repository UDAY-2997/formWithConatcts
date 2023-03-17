"use strict";

const form = document.querySelector("#contact-form");
const contactDetails = document.querySelector("#contact-details");
const contacts = document.querySelector("#contacts");
const contactsInfo = [];
const errorMessage = document.querySelector("#error-message");

// class created for the inputs
class Contact {
  constructor(name, city, email) {
    this._name = name;
    this._city = city;
    this._email = email;
  }

  get name() {
    return this._name;
  }

  get city() {
    return this._city;
  }

  get email() {
    return this._email;
  }
}

// function for validate the input in the form
function validateInput(input) {
  const values = input.split(", ").map((value) => value.trim());
  if (values.length !== 3) {
    return "Please enter all three values separated by commas";
  }
  const nameRegex = /^[a-zA-Z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const name = values[0];
  const city = values[1];
  const email = values[2];
  if (!nameRegex.test(name)) {
    return "Please enter a valid name (only letters and spaces)";
  }
  if (!nameRegex.test(city)) {
    return "Please enter a valid city (only letters and spaces)";
  }
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address (e.g. example@email.com)";
  }
  return "";
}

// funtion for adding and picking the inputs seperated at comma
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputValue = contactDetails.value;
  const errorMessageText = validateInput(inputValue);
  if (errorMessageText !== "") {
    errorMessage.textContent = errorMessageText;
    return;
  }
  errorMessage.textContent = "";
  const values = inputValue.split(",").map((value) => value.trim());
  const name = values[0];
  const city = values[1];
  const email = values[2];
  const contact = new Contact(name, city, email);
  contactsInfo.unshift(contact);
  listContacts();
  form.reset();
});

// function for pushing the inputs to a new storing div
function listContacts() {
  contacts.innerHTML = "";
  const count = document.createElement("button");
  count.innerHTML = `<strong>Number of contacts:</strong> ${contactsInfo.length}`;
  contacts.appendChild(count);
  contactsInfo.forEach((contact) => {
    const div = document.createElement("div");
    const name = document.createElement("p");
    name.innerHTML = `<strong>Name:</strong> ${contact.name}`;
    const city = document.createElement("p");
    city.innerHTML = `<strong>City:</strong> ${contact.city}`;
    const email = document.createElement("p");
    email.innerHTML = `<strong>Email:</strong> ${contact.email}`;
    div.appendChild(name);
    div.appendChild(city);
    div.appendChild(email);
    div.onclick = function () {
      const index = contactsInfo.indexOf(contact);
      if (index !== -1) {
        contactsInfo.splice(index, 1);
        listContacts();
      }
    };
    contacts.appendChild(div);
  });
}
