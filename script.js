// Firebase App (the core Firebase SDK) is always required
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

import {
  getDatabase,
  ref,
  set,
  get,
  child
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// Your Firebase config
const firebaseConfig = {
      apiKey: "AIzaSyBBhefSKfFtEXO9CKtSfItmsIhQaXDMO8M",
      authDomain: "webcargo-983b3.firebaseapp.com",
      projectId: "webcargo-983b3",
      storageBucket: "webcargo-983b3.firebasestorage.app",
      messagingSenderId: "454040988501",
     appId: "1:454040988501:web:27fe72804580044a26dddc",
    databaseURL: "https://webcargo-983b3-default-rtdb.asia-southeast1.firebasedatabase.app"
 };

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase(app);

// Sign Up Logic
window.signupUser = function () {
  const username = document.getElementById("signupUsername").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  if (!username || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  get(ref(db, "users")).then(snapshot => {
    let usernameTaken = false;
    snapshot.forEach(child => {
      if (child.val().name === username) {
        usernameTaken = true;
      }
    });

    if (usernameTaken) {
      alert("Username is already taken. Try another one.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        set(ref(db, "users/" + user.uid), {
          uid: user.uid,
          email: user.email,
          provider: "password",
          name: username,
          createdAt: new Date().toISOString()
        });

        sendEmailVerification(user)
          .then(() => {
            alert("Welcome to WebCargo! We've sent you a verification email.");
          });
        

        document.getElementById("signupModal").style.display = "none";
        document.getElementById("loginModal").style.display = "flex";
      })
      .catch((error) => {
        alert(error.message);
      });
  });
};

// Login Logic
window.loginUser = function () {
  const id = document.getElementById("loginId").value;
  const password = document.getElementById("loginPassword").value;

  if (!id || !password) {
    alert("Please enter email/username and password");
    return;
  }

  get(ref(db, "users")).then(snapshot => {
    let foundUser = null;
    let userId = null;
    snapshot.forEach(child => {
      const data = child.val();
      if (data.name === id || data.email === id) {
        foundUser = data.email;
        userId = child.key;
      }
    });

    if (!foundUser) {
      alert("Incorrect username or email.");
      return;
    }

    signInWithEmailAndPassword(auth, foundUser, password)
      .then((userCredential) => {
        document.getElementById("loginModal").style.display = "none";
        document.getElementById("auth-buttons").style.display = "none";
        document.getElementById("profile-dropdown").style.display = "flex";

        get(ref(db, "users/" + userCredential.user.uid)).then(snapshot => {
          document.getElementById("welcome-text").innerText = "Welcome " + snapshot.val().name;
        });
      })
      .catch((error) => {
        alert("Login failed: Incorrect password or account error.");
      });
  });
};

// Google Login
window.googleLogin = function () {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;

      // Save user to Realtime DB
      set(ref(db, "users/" + user.uid), {
        username: user.displayName || "GoogleUser",
        email: user.email
      });

      // 🎉 Send Welcome Email (only on first sign-in)
      if (user.metadata.creationTime === user.metadata.lastSignInTime) {
        emailjs.send("service_ix61biu", "template_87ducb5", {
  to_name: user.displayName || "WebCargo User",
  to_email: user.email,
  website_link: "https://techtitans1.github.io/web/",
  company_email: "webcargo.2025@gmail.com"

        }).then(() => {
          console.log("✅ Welcome email sent.");
        }).catch(err => {
          console.error("❌ Email error:", err);
        });
      }

      // Update UI
      document.getElementById("loginModal").style.display = "none";
      document.getElementById("auth-buttons").style.display = "none";
      document.getElementById("profile-dropdown").style.display = "flex";
      document.getElementById("welcome-text").innerText = "Welcome " + (user.displayName || "User");
    })
    .catch((error) => alert(error.message));
};


// Facebook Login
window.facebookLogin = function () {
  const provider = new FacebookAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      set(ref(db, "users/" + user.uid), {
        uid: user.uid,
        email: user.email,
        provider: user.providerData[0].providerId || "facebook",
        name: user.displayName || "Facebook User",
        createdAt: new Date().toISOString()
      });
      document.getElementById("loginModal").style.display = "none";
      document.getElementById("auth-buttons").style.display = "none";
      document.getElementById("profile-dropdown").style.display = "flex";
      document.getElementById("welcome-text").innerText = "Welcome " + (user.displayName || "User");
    })
    .catch((error) => alert(error.message));
};

// Reset Password
window.resetPassword = function () {
  const email = document.getElementById("forgotEmail").value;
  if (!email) return alert("Please enter your email");

  sendPasswordResetEmail(auth, email)
    .then(() => document.getElementById("resetMsg").innerText = "Reset email sent!")
    .catch(err => alert(err.message));
};

// Logout
window.logout = function () {
  signOut(auth).then(() => {
    document.getElementById("profile-dropdown").style.display = "none";
    document.getElementById("auth-buttons").style.display = "flex";
    document.getElementById("welcome-text").innerText = "Buy Your Dream Project";
  });
};
