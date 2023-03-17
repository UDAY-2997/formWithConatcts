"use strict";

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

const form = document.querySelector("#contact-form");
const contactDetails = document.querySelector("#contact-details");
const contacts = document.querySelector("#contacts");
const contactsInfo = [];
const errorMessage = document.querySelector("#error-message");

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
  if (contactsInfo.length >= 9) {
    return "You have reached the maximum number of contacts";
  }
  return "";
}

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

function listContacts() {
  contacts.innerHTML = "";
  const count = document.createElement("button");
  count.textContent = `Number of contacts: ${contactsInfo.length}`;
  contacts.appendChild(count);
  contactsInfo.forEach((contact) => {
    const div = document.createElement("div");
    const name = document.createElement("p");
    name.textContent = `Name: ${contact.name}`;
    const city = document.createElement("p");
    city.textContent = `City: ${contact.city}`;
    const email = document.createElement("p");
    email.textContent = `Email: ${contact.email}`;
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
