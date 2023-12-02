document.addEventListener('DOMContentLoaded', function () {
    axios.get('https://crudcrud.com/api/9e3ec5db431c44a68fd6cb3319e4ffdd/mentdata')
        .then(function (response) {
            const existingData = response.data;
            displayData(existingData);
        })
        .catch(function (error) {
            console.error('Error fetching existing data:', error);
        });
});

const submit = document.getElementById('submit');
const name = document.getElementById('name');
const phone = document.getElementById('phone');
const address = document.getElementById('address');
const div = document.getElementById('div');

submit.addEventListener('click', function () {
    const data = {
        name: name.value,
        phone: phone.value,
        address: address.value
    };

    const list = document.createElement('li');
    list.textContent = `${data.name}, ${data.phone}, ${data.address}`;

    const editIcon = document.createElement('span');
    editIcon.innerHTML = '&#9998;'; // Edit icon (pencil)

    const remove = document.createElement('button');
    remove.textContent = 'remove';
    remove.addEventListener('click', function () {
        const userId = data._id;
        deleteUserData(userId, list);
    });

    const edit = document.createElement('button');
    edit.textContent = 'edit';
    edit.addEventListener('click', function () {
        // Populate the form with user details for editing
        populateFormForEdit(data);
    });

    list.appendChild(editIcon);
    list.appendChild(remove);
    list.appendChild(edit);
    div.appendChild(list);

    axios.post('https://crudcrud.com/api/9e3ec5db431c44a68fd6cb3319e4ffdd/mentdata', data)
        .then(function (response) {
            console.log('Data submitted successfully:', response.data);
            data._id = response.data._id;
        })
        .catch(function (error) {
            console.error('Error submitting data:', error);
        });
});

function displayData(data) {
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const list = document.createElement('li');
        list.textContent = `${item.name}, ${item.phone}, ${item.address}`;

        const editIcon = document.createElement('span');
        editIcon.innerHTML = '&#9998;'; // Edit icon (pencil)

        const remove = document.createElement('button');
        remove.textContent = 'remove';
        remove.addEventListener('click', function () {
            deleteUserData(item._id, list);
        });

        const edit = document.createElement('button');
        edit.textContent = 'edit';
        edit.addEventListener('click', function () {
            populateFormForEdit(item);
        });

        list.appendChild(editIcon);
        list.appendChild(remove);
        list.appendChild(edit);
        div.appendChild(list);
    }
}

function deleteUserData(userId, listItem) {
    axios.delete(`https://crudcrud.com/api/9e3ec5db431c44a68fd6cb3319e4ffdd/mentdata/${userId}`)
        .then(function (response) {
            console.log('Data deleted successfully:', response.data);
            div.removeChild(listItem);
        })
        .catch(function (error) {
            console.error('Error deleting data:', error);
        });
}

function populateFormForEdit(userData) {
    // Populate the form with user details for editing
    name.value = userData.name;
    phone.value = userData.phone;
    address.value = userData.address;
}
