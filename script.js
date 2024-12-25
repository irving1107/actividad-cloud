// Referencias al DOM
const form = document.getElementById("dataForm");
const tableBody = document.getElementById("tableBody");
const clearTableButton = document.getElementById("clearTable");

// Cargar datos almacenados al iniciar
document.addEventListener("DOMContentLoaded", () => {
    const storedData = JSON.parse(localStorage.getItem("tableData")) || [];
    storedData.forEach(addRowToTable);
});

// Manejar el formulario para agregar una nueva fila
form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Obtener los valores del formulario
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const idNumber = document.getElementById("idNumber").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    const data = { firstName, lastName, idNumber, email, phone, address };

    // Agregar la fila a la tabla
    addRowToTable(data);

    // Guardar los datos en el almacenamiento local
    saveToLocalStorage(data);

    // Limpiar el formulario
    form.reset();
});

// Agregar fila a la tabla
function addRowToTable(data) {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${data.firstName}</td>
        <td>${data.lastName}</td>
        <td>${data.idNumber}</td>
        <td>${data.email}</td>
        <td>${data.phone}</td>
        <td>${data.address}</td>
        <td><button class="deleteBtn">Eliminar</button></td>
    `;

    tableBody.appendChild(row);

    // Manejar el botón de eliminar para una fila
    row.querySelector(".deleteBtn").addEventListener("click", () => {
        row.remove();
        removeFromLocalStorage(data);
    });
}

// Guardar datos en almacenamiento local
function saveToLocalStorage(data) {
    const storedData = JSON.parse(localStorage.getItem("tableData")) || [];
    storedData.push(data);
    localStorage.setItem("tableData", JSON.stringify(storedData));
}

// Eliminar datos del almacenamiento local
function removeFromLocalStorage(data) {
    let storedData = JSON.parse(localStorage.getItem("tableData")) || [];
    storedData = storedData.filter(
        (item) =>
            item.firstName !== data.firstName ||
            item.lastName !== data.lastName ||
            item.idNumber !== data.idNumber
    );
    localStorage.setItem("tableData", JSON.stringify(storedData));
}

// Manejar el botón de borrar toda la tabla
clearTableButton.addEventListener("click", () => {
    tableBody.innerHTML = "";
    localStorage.removeItem("tableData");
});

// Referencias al modal y sus elementos
const editModal = document.getElementById("editModal");
const editForm = document.getElementById("editForm");
const closeModal = document.querySelector(".close");

let currentRow = null; // Variable para rastrear la fila que se está editando

// Mostrar el modal de edición
function openEditModal(row, data) {
    currentRow = row;

    // Llenar el formulario con los datos actuales
    document.getElementById("editFirstName").value = data.firstName;
    document.getElementById("editLastName").value = data.lastName;
    document.getElementById("editIdNumber").value = data.idNumber;
    document.getElementById("editEmail").value = data.email;
    document.getElementById("editPhone").value = data.phone;
    document.getElementById("editAddress").value = data.address;

    // Mostrar el modal
    editModal.style.display = "flex";
}

// Cerrar el modal
closeModal.addEventListener("click", () => {
    editModal.style.display = "none";
});

// Guardar los cambios al editar
editForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Obtener los nuevos valores
    const updatedData = {
        firstName: document.getElementById("editFirstName").value,
        lastName: document.getElementById("editLastName").value,
        idNumber: document.getElementById("editIdNumber").value,
        email: document.getElementById("editEmail").value,
        phone: document.getElementById("editPhone").value,
        address: document.getElementById("editAddress").value,
    };

    // Actualizar la fila en la tabla
    currentRow.cells[0].textContent = updatedData.firstName;
    currentRow.cells[1].textContent = updatedData.lastName;
    currentRow.cells[2].textContent = updatedData.idNumber;
    currentRow.cells[3].textContent = updatedData.email;
    currentRow.cells[4].textContent = updatedData.phone;
    currentRow.cells[5].textContent = updatedData.address;

    // Actualizar en almacenamiento local
    updateLocalStorage(updatedData);

    // Cerrar el modal
    editModal.style.display = "none";
});

// Actualizar almacenamiento local
function updateLocalStorage(updatedData) {
    let storedData = JSON.parse(localStorage.getItem("tableData")) || [];
    storedData = storedData.map((item) => {
        if (item.idNumber === currentRow.cells[2].textContent) {
            return updatedData;
        }
        return item;
    });
    localStorage.setItem("tableData", JSON.stringify(storedData));
}

// Modificar la función addRowToTable para incluir el botón "Editar"
function addRowToTable(data) {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${data.firstName}</td>
        <td>${data.lastName}</td>
        <td>${data.idNumber}</td>
        <td>${data.email}</td>
        <td>${data.phone}</td>
        <td>${data.address}</td>
        <td>
            <button class="editBtn">Editar</button>
            <button class="deleteBtn">Eliminar</button>
        </td>
    `;

    tableBody.appendChild(row);

    // Botón "Editar"
    row.querySelector(".editBtn").addEventListener("click", () => {
        openEditModal(row, data);
    });

    // Botón "Eliminar"
    row.querySelector(".deleteBtn").addEventListener("click", () => {
        row.remove();
        removeFromLocalStorage(data);
    });
}
