const contactList = document.getElementById("contactList");
const btnEl = document.querySelector(".btn");
const closeBtnEl = document.querySelector(".close");
const modal = document.getElementById("contactForm");
const saveBtn = document.querySelector(".save");
let contactData = [];

function openModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

function saveToLocalStorage() {
  const savedContactData = JSON.stringify(contactData);
  localStorage.setItem("contacts", savedContactData);
}

btnEl.addEventListener("click", openModal);
closeBtnEl.addEventListener("click", closeModal);
saveBtn.addEventListener("click", saveContact);

function saveContact() {
    const nameInput = document.getElementById("name");
    const surnameInput = document.getElementById("surname");
    const phoneInput = document.getElementById("phone");
    const emailInput = document.getElementById("email");
  
    const newcontact = {
      name: nameInput.value,
      surname: surnameInput.value,
      phone: phoneInput.value,
      email: emailInput.value,
    };
    contactData.push(newcontact);
  
    const jsonData = JSON.stringify(contactData);
  
    saveToLocalStorage();
    updateContactList();
    closeModal();
  }
  
function updateContactList() {
  contactList.innerHTML = "";
  contactData.forEach((contact, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `Name: ${contact.name}, Surname: ${contact.surname}, Phone: ${contact.phone}, Email: ${contact.email}`;

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => openEditModal(index));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deletecontact(index));

    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    contactList.appendChild(listItem);
  });
}

function deletecontact(index) {
  alert("delete?");
  contactData.splice(index, 1);
  saveToLocalStorage();
  updateContactList();
}

function openEditModal(index) {
    const nameInput = document.getElementById("name");
    const surnameInput = document.getElementById("surname");
    const phoneInput = document.getElementById("phone");
    const emailInput = document.getElementById("email");
    nameInput.value = contactData[index].name;
    surnameInput.value = contactData[index].surname;
    phoneInput.value = contactData[index].phone;
    emailInput.value = contactData[index].email;
    openModal();
  
    saveBtn.removeEventListener("click", saveContact);
  
    saveBtn.addEventListener("click", () => {
        const updatedName = nameInput.value;
        const updatedSurname = surnameInput.value;
        const updatedPhone = nameInput.value;
        const updatedEmail = surnameInput.value;
  
      if (!updatedName || !updatedSurname || !updatedPhone || !updatedEmail) {
        alert("ERRRRORRRRR");
        return;
      }
  
      contactData[index].name = updatedName;
      contactData[index].surname = updatedSurname;
      contactData[index].phone = updatedPhone;
      contactData[index].email = updatedEmail;
  
      saveToLocalStorage();
      updateContactList();
      closeModal();
    });
  }
  
