import { getDatabase, ref, set, update, remove } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
const database = getDatabase();
const validateForm = () => {
    const id = document.querySelector("#form-id").value;
    const username = document.querySelector("#form-username").value;
    const name = document.querySelector("#form-name").value;
    const email = document.querySelector("#form-email").value;
    const profilePic = document.querySelector("#form-profilePic").value;
    const classYear = document.querySelector("#form-classYear").value;

    if (id.trim() == "" || username.trim() == "" || name == "" || email.trim() == "" || profilePic == ""
    || classYear == "") {
        alert("form not completely filled");
    } else {
        writeToDatabase(id, username, name, email, profilePic, classYear);
    }
};

// This method writes data to a specified path in the database. It replaces any existing data at that path.
const writeToDatabase = (id, username, name, email, profilePic, classYear) => {
    console.log("here")
    set(ref(database, 'users/' + id), {
        id: id,
        username: username,
        name: name,
        email: email,
        profilePic: profilePic,
        classYear: classYear
    });
    console.log("here")
}

// This method updates specific fields of data in the database.
const updateData = (id, username) => {
    update(ref(database, 'users/' + id), {
        username: username
    })
    console.log("here")
}

// This method deletes data from the database.
const deleteData = (id) => {
    remove(ref(database, 'users/' + id))
}

document.querySelector('#register').addEventListener("click", () => {
    validateForm();
})
document.querySelector('#update').addEventListener("click", () => {
    updateData(1, "Ostrich");
})
document.querySelector('#delete').addEventListener("click", () => {
    deleteData(4);
})