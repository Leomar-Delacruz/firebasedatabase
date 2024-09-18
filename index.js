import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, ref, child, get, set, update, remove } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDR4OcZjXWx8N0fxGsXo2GbpNqpM1abwzg",
  authDomain: "demodatabase-53316.firebaseapp.com",
  projectId: "demodatabase-53316",
  storageBucket: "demodatabase-53316.appspot.com",
  messagingSenderId: "76423877688",
  appId: "1:76423877688:web:4ee548af95ea19ec1742cd"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();

// Get input elements
let FnameInp = document.getElementById('FnameInp');
let LnameInp = document.getElementById('LnameInp');
let CnicInp = document.getElementById('CnicInp');

// Get button elements
let AddBtn = document.getElementById('AddBtn');
let RetrieveBtn = document.getElementById('RetrieveBtn');
let UpdateBtn = document.getElementById('UpdateBtn');
let DeleteBtn = document.getElementById('DeleteBtn');

// Add data to Firebase
function AddData() {
  set(ref(db, 'EmployeeSet/' + CnicInp.value), {
    nameofemployee: {
      firstname: FnameInp.value,
      lastname: LnameInp.value
    },
    cnic: Number(CnicInp.value)
  }).then(() => {
    alert("Data Added Successfully");
  }).catch((error) => {
    alert("Unsuccessful");
    console.log(error);
  });
}

// Retrieve data from Firebase
function RetData() {
  const dbRef = ref(db);

  get(child(dbRef, 'EmployeeSet/' + CnicInp.value)).then((snapshot) => {
    if (snapshot.exists()) {
      FnameInp.value = snapshot.val().nameofemployee.firstname;
      LnameInp.value = snapshot.val().nameofemployee.lastname;
    } else {
      alert("Employee does not exist");
    }
  }).catch((error) => {
    alert("Unsuccessful");
    console.log(error);
  });
}

// Update data in Firebase
function UpdateData() {
  update(ref(db, 'EmployeeSet/' + CnicInp.value), {
    nameofemployee: {
      firstname: FnameInp.value,
      lastname: LnameInp.value
    }
  }).then(() => {
    alert("Data Updated Successfully");
  }).catch((error) => {
    alert("Unsuccessful");
    console.log(error);
  });
}

// Delete data from Firebase
function DeleteData() {
  remove(ref(db, 'EmployeeSet/' + CnicInp.value)).then(() => {
    alert("Data Deleted Successfully");
  }).catch((error) => {
    alert("Unsuccessful");
    console.log(error);
  });
}

// Event listeners for buttons
AddBtn.addEventListener('click', AddData);
RetrieveBtn.addEventListener('click', RetData);
UpdateBtn.addEventListener('click', UpdateData);
DeleteBtn.addEventListener('click', DeleteData);