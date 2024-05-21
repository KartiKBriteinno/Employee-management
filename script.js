document.addEventListener('DOMContentLoaded', () => {
    const employeeForm = document.getElementById('employee-form');
    const nameInput = document.getElementById('name');
    const professionInput = document.getElementById('profession');
    const ageInput = document.getElementById('age');
    const addEmployeeButton = document.getElementById('add-employee');
    const message = document.getElementById('message');
    const employeeList = document.getElementById('employee-list');
    
    let employees = [];
    let idCounter = 1;

    addEmployeeButton.addEventListener('click', () => {
        const name = nameInput.value.trim();
        const profession = professionInput.value.trim();
        const age = ageInput.value.trim();

        if (!name || !profession || !age) {
            showMessage('Error : Please Make sure All the fields are filled before adding in an employee !', 'error');
            return;
        }

        const employee = {
            id: idCounter++,
            name,
            profession,
            age: parseInt(age)
        };
        employees.push(employee);
        showMessage('Success : Employee Added!', 'success');
        renderEmployees();
        clearForm();
    });

    function renderEmployees() {
        employeeList.innerHTML = '';
        if (employees.length === 0) {
            const noEmployeeMessage = document.createElement('div');
            noEmployeeMessage.textContent = 'You have 0 Employees.';
            noEmployeeMessage.style.color = 'white';
            employeeList.appendChild(noEmployeeMessage);
        } else {
            employees.forEach(employee => {
                const employeeDiv = document.createElement('div');
                employeeDiv.className = 'employee';
                employeeDiv.innerHTML = `
                    <span style="color:white;gap:20px; display:flex;"><div>Name : ${employee.name}</div><div>Profession : ${employee.profession}</div><div>Age : ${employee.age}</div></span> <button class="btn" onclick="deleteEmployee(${employee.id})">Delete</button>`;
                employeeList.appendChild(employeeDiv);
            });
        }
    }

    window.deleteEmployee = function (id) {
        employees = employees.filter(employee => employee.id !== id);
        renderEmployees();
    };

    function showMessage(msg, type) {
        message.textContent = msg;
        message.className = type;
    }

    function clearForm() {
        nameInput.value = '';
        professionInput.value = '';
        ageInput.value = '';
    }
});
