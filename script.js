// ✅ 1. Initialize Firebase with your config
const firebaseConfig = {
  apiKey: "AIzaSyBBhefSKfFtEXO9CKtSfItmsIhQaXDMO8M",
  authDomain: "webcargo-983b3.firebaseapp.com",
  projectId: "webcargo-983b3",
  storageBucket: "webcargo-983b3.appspot.com",  // ✅ Correct
  messagingSenderId: "454040988501",
  appId: "1:454040988501:web:27fe72804580044a26dddc",
  databaseURL: "https://webcargo-983b3-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the Realtime Database
const database = firebase.database();

// ✅ 2. Add form submit listener
document.getElementById('matrimonyForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent page refresh

  // ✅ 3. Get form values
  const fullName = document.getElementById('fullName').value;
  const dateOfBirth = document.getElementById('dateOfBirth').value;
  const gender = document.getElementById('gender').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const education = document.getElementById('education').value;
  const occupation = document.getElementById('occupation').value;
  const salary = document.getElementById('salary').value;
  const companyName = document.getElementById('companyName').value;
  const place = document.getElementById('place').value;
  const experience = document.getElementById('experience').value;
  const fatherName = document.getElementById('fatherName').value;
  const motherName = document.getElementById('motherName').value;

  // ✅ 4. Save to Firebase under 'matrimonyForms'
  database.ref('matrimonyForms').push({
    fullName: fullName,
    dateOfBirth: dateOfBirth,
    gender: gender,
    phone: phone,
    email: email,
    education: education,
    occupation: occupation,
    salary: salary,
    companyName: companyName,
    place: place,
    experience: experience,
    fatherName: fatherName,
    motherName: motherName,
    submittedAt: new Date().toISOString() // optional: timestamp
  })
  .then(() => {
    alert('Form submitted successfully!');
    document.getElementById('matrimonyForm').reset(); // Clear the form
  })
  .catch((error) => {
    console.error('Error saving form data:', error);
    alert('Something went wrong. Please try again.');
  });
});
