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
// ✅ Initialize Firebase App
firebase.initializeApp(firebaseConfig);

// ✅ Get a reference to your Realtime Database
const database = firebase.database();

// ✅ Listen for form submission
document.getElementById('matrimonyForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // ✅ Collect form values
  const fullName = document.getElementById('fullName').value;
  const dateOfBirth = document.getElementById('dateOfBirth').value;
  const gender = document.getElementById('gender').value;
  const phone = document.getElementById('phone').value;
  //const email = document.getElementById('email').value;
  const education = document.getElementById('education').value;
  const occupation = document.getElementById('occupation').value;
  const salary = document.getElementById('salary').value;
  const companyName = document.getElementById('companyName').value;
  const workingPlace = document.getElementById('workingPlace').value; // ✅ updated name
  const experience = document.getElementById('experience').value;
  const fatherName = document.getElementById('fatherName').value;
  const motherName = document.getElementById('motherName').value;

  // ✅ New added fields
  const birthPlace = document.getElementById('birthPlace').value;
  const height = document.getElementById('height').value;
  const siblings = document.getElementById('siblings').value;
  const nativePlace = document.getElementById('nativePlace').value;
  const gothram = document.getElementById('gothram').value;

  // ✅ Push to "matrimonyForms" node
  const newFormRef = database.ref('matrimonyForms').push();
  newFormRef.set({
    fullName: fullName,
    dateOfBirth: dateOfBirth,
    gender: gender,
    phone: phone,
    //email: email,
    education: education,
    occupation: occupation,
    salary: salary,
    companyName: companyName,
    workingPlace: workingPlace, // ✅ updated key
    experience: experience,
    fatherName: fatherName,
    motherName: motherName,
    birthPlace: birthPlace,
    height: height,
    siblings: siblings,
    nativePlace: nativePlace,
    gothram: gothram
  })
  .then(() => {
    alert('✅ Your form has been submitted successfully!');
    document.getElementById('matrimonyForm').reset();
  })
  .catch((error) => {
    console.error('❌ Error storing data:', error);
    alert('❌ Something went wrong! Please try again.');
  });
});
