const user = JSON.parse(localStorage.getItem("users")) || [];

const tableBody =  document.getElementById("user_table");

user.forEach(user => {
    const row = document.createElement("tr")

    const userCell = document.createElement("td");
    userCell.textContent = user.username;
    const passCell = document.createElement("td");
    passCell.textContent = user.password;

    row.appendChild(userCell);
    row.appendChild(passCell);

    tableBody.appendChild(row);
});