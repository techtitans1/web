// ✅ Initialize Firebase (make sure to replace with YOUR config!)
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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// ✅ Handle form submit
document.getElementById('matrimonyForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Grab all your form fields
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

  // ✅ Save to /matrimonyForms root section
  database.ref('matrimonyForms').push().set({
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
    motherName: motherName
  })
  .then(() => {
    alert('✅ Form submitted successfully!');
    document.getElementById('matrimonyForm').reset();
  })
  .catch((error) => {
    console.error('❌ Error saving data:', error);
    alert('Error saving data. Check console.');
  });
});
