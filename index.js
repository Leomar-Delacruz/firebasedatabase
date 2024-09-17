import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";

// Paste your Firebase config here:
const firebaseConfig = {
    apiKey: "AIzaSyCgbxt9HOVeZSwOx7tiYjjCMM4CkF6MZRg",
    authDomain: "database-datahtml.firebaseapp.com",
    databaseURL: "https://database-datahtml-default-rtdb.firebaseio.com",
    projectId: "database-datahtml",
    storageBucket: "database-datahtml.appspot.com",
    messagingSenderId: "607702908743",
    appId: "1:607702908743:web:48fa97ac75aa67f36a1662"
  };

  document.addEventListener('DOMContentLoaded', () => {

    // Initialize Firebase app
    const app = initializeApp(firebaseConfig);

    // Log to check if Firebase app is correctly initialized
    console.log('Firebase app initialized:', app);
  
    // Initialize Firebase database
    const database = getDatabase(app);
  
    // Log to check if Firebase database is correctly initialized
    console.log('Firebase database initialized:', database);
  
    // Get the 'cart' node reference
    const cartRef = ref(database, 'cart');
  
    // Get DOM elements
    const inputfieldEl = document.getElementById('input-field');
    const addbuttonEl = document.getElementById('add-button');
  
    // Debug: Check if DOM elements are loaded
    if (!inputfieldEl || !addbuttonEl) {
        console.error('DOM elements not found. Check your HTML IDs.');
        return;
    }
  
    console.log('Input Field:', inputfieldEl);
    console.log('Add Button:', addbuttonEl);
  
    // Add event listener to the button
    addbuttonEl.addEventListener('click', function() {
        let inputValue = inputfieldEl.value;
  
        // Log the click event and input value
        console.log('Button clicked! Input value:', inputValue);
  
        // Check if input field is not empty
        if (inputValue) {
            console.log('Adding to cart:', inputValue);
  
            // Try pushing the data to Firebase
            push(cartRef, inputValue)
            .then(() => {
                console.log(`${inputValue} successfully added to cart in the database`);
  
                // Clear the input field after successful submission
                inputfieldEl.value = "";
            })
            .catch((error) => {
                // Log any errors that occur during the push operation
                console.error('Error while adding item to cart:', error);
            });
        } else {
            console.log("Input field is empty");
        }
    });
});