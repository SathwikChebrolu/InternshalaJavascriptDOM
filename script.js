let students = JSON.parse(localStorage.getItem("students")) || [];

document.getElementById("studentForm").addEventListener("submit", function (e) {
    e.preventDefault();
    let student = {
        name: document.getElementById("name").value,
        studentId: document.getElementById("studentId").value,
        email: document.getElementById("email").value,
        contactNo: document.getElementById("contactNo").value
    };
    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
    this.reset(); // Clear form after submission
});

// Dynamically display the student record
function displayStudents() {
    let studentTable = document.querySelector("#studentTable tbody");
    studentTable.innerHTML = "";  
    
    students.forEach((student, index) => {
        // Creates a new row for each student
        let row = studentTable.insertRow();
        
        let cellName = row.insertCell(0);
        let cellId = row.insertCell(1);
        let cellEmail = row.insertCell(2);
        let cellContact = row.insertCell(3);
        let cellActions = row.insertCell(4);
        
        cellName.innerText = student.name;
        cellId.innerText = student.studentId;
        cellEmail.innerText = student.email;
        cellContact.innerText = student.contactNo;

        cellActions.innerHTML = `
            <button onclick="editStudent(${index})">Edit</button>
            <button onclick="deleteStudent(${index})">Delete</button>
        `;
    });
}


window.onload = displayStudents;  
// Edit and delete records
function editStudent(index) {
    let student = students[index];
    document.getElementById("name").value = student.name;
    document.getElementById("studentId").value = student.studentId;
    document.getElementById("email").value = student.email;
    document.getElementById("contactNo").value = student.contactNo;
    students.splice(index, 1); 
}

function deleteStudent(index) {
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
}

// Ensure fields accept valid values
function validateForm() {
    let name = document.getElementById("name").value;
    let studentId = document.getElementById("studentId").value;
    let email = document.getElementById("email").value;
    let contactNo = document.getElementById("contactNo").value;

    if (!/^[a-zA-Z\s]+$/.test(name)) {
        alert("Student name must contain only letters.");
        return false;
    }
    if (!/^\d+$/.test(studentId)) {
        alert("Student ID must contain only numbers.");
        return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        alert("Invalid email format.");
        return false;
    }
    if (!/^\d+$/.test(contactNo)) {
        alert("Contact No. must contain only numbers.");
        return false;
    }
    return true;
}
