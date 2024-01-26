const markerList = document.getElementById("markerList");
const btnEl = document.querySelector(".btn");
const closeBtnEl = document.querySelector(".close");
const modal = document.getElementById("markerForm");
const saveBtn = document.querySelector(".save");
let markerData = [];

function openModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

function saveToLocalStorage() {
  const savedMarkerData = JSON.stringify(markerData);
  localStorage.setItem("markers", savedMarkerData);
}

btnEl.addEventListener("click", openModal);
closeBtnEl.addEventListener("click", closeModal);
saveBtn.addEventListener("click", saveMarker);

function saveMarker() {
  const markerInput = document.getElementById("marker");
  const marker = markerInput.value;

  if (!marker) {
    alert("Помилка. Заповніть поля.");
    return;
  }

  const newMarker = {
    marker: marker,
  };
  markerData.push(newMarker);

  const jsonData = JSON.stringify(markerData);

  saveToLocalStorage();
  updateMarkerList();
  closeModal();
}

function updateMarkerList() {
  markerList.innerHTML = "";
  markerData.forEach((marker, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${marker.marker}`;

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => openEditModal(index));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteMarker(index));

    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    markerList.appendChild(listItem);
  });
}

function deleteMarker(index) {
  alert("delete?");
  markerData.splice(index, 1);
  saveToLocalStorage();
  updateMarkerList();
}

function openEditModal(index) {
  const markerInput = document.getElementById("marker");
  markerInput.value = markerData[index].marker;
  openModal();

  saveBtn.removeEventListener("click", saveMarker);

  saveBtn.addEventListener("click", () => {
    const updatedMarker = markerInput.value;

    if (!updatedMarker) {
      alert("Помилка. Заповніть поля.");
      return;
    }

    markerData[index].marker = updatedMarker;

    saveToLocalStorage();
    updateMarkerList();
    closeModal();
  });
}
