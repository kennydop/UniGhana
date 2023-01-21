const firebaseConfig = {
  apiKey: "AIzaSyDvJsa0VT7dLQKp3VGxJ2b09YD11-FFtKc",
  authDomain: "tests-3b6d4.firebaseapp.com",
  projectId: "tests-3b6d4",
  storageBucket: "tests-3b6d4.appspot.com",
  messagingSenderId: "481009001977",
  appId: "1:481009001977:web:20345c0a823ced52270928",
  measurementId: "G-0FVZJ8X53G",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebaseApp.auth();

const errorMessages = {
  "auth/invalid-email": "Invalid email address",
  "auth/user-disabled": "User disabled",
  "auth/user-not-found": "User not found",
  "auth/wrong-password": "Wrong password",
  "auth/email-already-in-use": "Email already in use",
};

const login = document.getElementById("login-btn");
const signup = document.getElementById("signup-btn");
const login_form = document.getElementById("login-form");
const signup_form = document.getElementById("signup-form");

login_form?.addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("l-error").innerHTML = "";
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      login_form.reset();
    })
    .catch((error) => {
      document.getElementById("l-error").innerHTML =
        errorMessages[error.code] === undefined
          ? error.message
          : errorMessages[error.code];
    });
});

signup_form?.addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("r-error").innerHTML = "";
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let confirm_password = document.getElementById("confirm-password").value;
  if (password !== confirm_password) {
    document.getElementById("r-error").innerHTML = "Passwords do not match";
    return;
  }

  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      signup_form.reset();
    })
    .catch((error) => {
      document.getElementById("r-error").innerHTML =
        errorMessages[error.code] === undefined
          ? error.message
          : errorMessages[error.code];
    });
});

auth.onAuthStateChanged(async (user) => {
  if (user) {
    if (!window.location.pathname.includes("/home")) {
      window.location.href = "home.html";
    }
    document.title = `Home - ${user.email}`;
    document.getElementById("logged-in-as").innerHTML = "Logged in as";
    document.getElementById("user-email").innerText = user.email;
    document.getElementById("logout").classList.remove("hidden");
  } else {
    if (
      window.location.pathname.includes("/login") ||
      window.location.pathname.includes("/register")
    ) {
      return;
    }
    window.location.href = "login.html";
  }
});

document.getElementById("logout").addEventListener("click", () => {
  auth.signOut();
});
