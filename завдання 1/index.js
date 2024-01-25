const list = document.querySelector("ul")
const inputs = document.querySelectorAll("input")

inputs.forEach((input) => {
    input.addEventListener("input", () => {
  const info = {
    task1: inputs[0].checked,
    task2: inputs[1].checked,
    task3: inputs[2].checked,
  };
  const saveInfo = JSON.stringify(info);
  localStorage.setItem("userList", saveInfo);
});
});

function getFromLocalStorage() {
    const userList = localStorage.getItem("userList");
    if(userList){
    const parseData = JSON.parse(userList);
    inputs[0].checked = parseData?.task1 || false;
    inputs[1].checked = parseData?.task2 || false;
    inputs[2].checked = parseData?.task3 || false;
    }
}
getFromLocalStorage();
