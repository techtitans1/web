// ✅ 1) Your Firebase config
// Replace these values with your actual Firebase project settings!
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

// ✅ 3) Get reference to your form
const matrimonyForm = document.getElementById('matrimonyForm');

// ✅ 4) Listen for form submit
matrimonyForm.addEventListener('submit', submitForm);

// ✅ 5) Handle form submit
function submitForm(e) {
  e.preventDefault();

  // ✅ 6) Get all form values
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

  // ✅ 7) Save data to Firebase
  saveMatrimonyForm(fullName, dateOfBirth, gender, phone, email, education, occupation, salary, companyName, place, experience, fatherName, motherName);

  // ✅ 8) Show success message
  alert('Your details have been submitted successfully!');

  // ✅ 9) Reset form
  matrimonyForm.reset();
}

// ✅ 10) Save function
function saveMatrimonyForm(fullName, dateOfBirth, gender, phone, email, education, occupation, salary, companyName, place, experience, fatherName, motherName) {
  // Create a new entry under 'matrimonyForms'
  const newFormRef = firebase.database().ref('matrimonyForms').push();

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
    motherName: motherName
  });
}
