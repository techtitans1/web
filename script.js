// ✅ 1) Your Firebase config — replace with YOUR actual config!
const firebaseConfig = {
  const firebaseConfig = {
      apiKey: "AIzaSyBBhefSKfFtEXO9CKtSfItmsIhQaXDMO8M",
      authDomain: "webcargo-983b3.firebaseapp.com",
      projectId: "webcargo-983b3",
      storageBucket: "webcargo-983b3.firebasestorage.app",
      messagingSenderId: "454040988501",
     appId: "1:454040988501:web:27fe72804580044a26dddc",
    databaseURL: "https://webcargo-983b3-default-rtdb.asia-southeast1.firebasedatabase.app"
 };

// ✅ 2) Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// ✅ 3) Get the form element
const matrimonyForm = document.getElementById('matrimonyForm');

// ✅ 4) Listen for submit event
matrimonyForm.addEventListener('submit', function (e) {
  e.preventDefault(); // Stop form from submitting normally

  // ✅ 5) Collect all input values
  const fullName = document.getElementById('fullName').value.trim();
  const dateOfBirth = document.getElementById('dateOfBirth').value.trim();
  const gender = document.getElementById('gender').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const education = document.getElementById('education').value.trim();
  const occupation = document.getElementById('occupation').value.trim();
  const salary = document.getElementById('salary').value.trim();
  const companyName = document.getElementById('companyName').value.trim();
  const place = document.getElementById('place').value.trim();
  const experience = document.getElementById('experience').value.trim();
  const fatherName = document.getElementById('fatherName').value.trim();
  const motherName = document.getElementById('motherName').value.trim();

  // ✅ 6) Save to Firebase Database
  const newFormRef = database.ref('matrimonyForms').push();
  newFormRef.set({
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
    timestamp: new Date().toISOString()
  })
  .then(() => {
    alert('Form submitted successfully!');
    matrimonyForm.reset(); // Clear the form
  })
  .catch((error) => {
    alert('Error saving form: ' + error.message);
    console.error(error);
  });
});
