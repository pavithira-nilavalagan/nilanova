/* ==========================================
   PASSWORD SHOW / HIDE
========================================== */

function togglePassword(id, icon) {

    const input = document.getElementById(id);

    if (input.type === "password") {

        input.type = "text";

        icon.classList.remove("ri-eye-line");
        icon.classList.add("ri-eye-off-line");

    } else {

        input.type = "password";

        icon.classList.remove("ri-eye-off-line");
        icon.classList.add("ri-eye-line");

    }

}


/* ==========================================
   GET USERS
========================================== */

function getUsers() {

    return JSON.parse(localStorage.getItem("users")) || [];

}


/* ==========================================
   SAVE USERS
========================================== */

function saveUsers(users) {

    localStorage.setItem("users", JSON.stringify(users));

}


/* ==========================================
   SIGN UP
========================================== */

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("name").value.trim();

        const email = document.getElementById("email").value.trim().toLowerCase();

        const password = document.getElementById("password").value;

        const confirmPassword = document.getElementById("confirmPassword").value;


        if (password.length < 6) {

            alert("Password should contain at least 6 characters.");

            return;

        }

        if (password !== confirmPassword) {

            alert("Passwords do not match.");

            return;

        }


        let users = getUsers();

        const alreadyExists = users.find(user => user.email === email);

        if (alreadyExists) {

            alert("Email already registered.");

            return;

        }


        const newUser = {

            id: Date.now(),

            name: name,

            email: email,

            password: password

        };


        users.push(newUser);

        saveUsers(users);

        alert("Account created successfully.");

        window.location.href = "signin.html";

    });

}


/* ==========================================
   SIGN IN
========================================== */

const signinForm = document.getElementById("signinForm");

if (signinForm) {

    signinForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = document.getElementById("loginEmail").value.trim().toLowerCase();

        const password = document.getElementById("loginPassword").value;

        const remember = document.getElementById("remember").checked;


        const users = getUsers();

        const user = users.find(u =>
            u.email === email &&
            u.password === password
        );


        if (!user) {

            alert("Invalid email or password.");

            return;

        }


        localStorage.setItem("currentUser", JSON.stringify(user));


        if (remember) {

            localStorage.setItem("rememberLogin", "true");

        } else {

            localStorage.removeItem("rememberLogin");

        }


        alert("Welcome " + user.name);

        window.location.href = "index.html";

    });

}


/* ==========================================
   LOGOUT
========================================== */

function logout() {

    localStorage.removeItem("currentUser");

    localStorage.removeItem("rememberLogin");

    window.location.href = "signin.html";

}


/*======================================
HEADER LOGIN
======================================*/

const accountArea = document.getElementById("accountArea");

if (accountArea) {

    const currentUser =
        JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {

        accountArea.innerHTML = `
<div id="accountArea" class="account-menu">

    <div class="account-trigger">
        <div class="hello">Hello, ${currentUser.name}</div>

        <div class="account-title">
            Account & Lists
            <i class="ri-arrow-down-s-line"></i>
        </div>
    </div>

    <div class="dropdown-menu">
        <a href="profile.html">👤 My Profile</a>
        <a href="address.html">📍 Update Address</a>
        <a href="order.html">📦 My Orders</a>
        <a href="#" id="logoutLink">🚪 Logout</a>
    </div>

</div>
`;

        document
            .getElementById("logoutLink")
            .addEventListener("click", function (e) {

                e.preventDefault();

                logout();

            });


        const accountMenu = document.querySelector(".account-menu");
        const dropdown = document.querySelector(".dropdown-menu");

        if (accountMenu && dropdown) {

            let hideTimer;

            accountMenu.addEventListener("mouseenter", () => {
                clearTimeout(hideTimer);
                dropdown.classList.add("show");
            });

            accountMenu.addEventListener("mouseleave", () => {
                hideTimer = setTimeout(() => {
                    if (!dropdown.matches(":hover")) {
                        dropdown.classList.remove("show");
                    }
                }, 300); // wait 300ms
            });

            dropdown.addEventListener("mouseenter", () => {
                clearTimeout(hideTimer);
                dropdown.classList.add("show");
            });

            dropdown.addEventListener("mouseleave", () => {
                dropdown.classList.remove("show");
            });

        }

    }

    else {

        accountArea.innerHTML = `

<a href="signin.html">

Hello, Sign In

</a>

`;

    }

}




/*=====================================
LOGIN REQUIRED
=====================================*/

function requireLogin() {

    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {

        alert("Please sign in first.");

        window.location.href = "signin.html";

    }

}

/*=========================================
    SHOW DELIVERY ADDRESS
=========================================*/

const deliveryLocation = document.getElementById("deliveryLocation");

if (deliveryLocation) {

    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (user) {

        const address = JSON.parse(
            localStorage.getItem("address_" + user.email)
        );

        if (address) {

            deliveryLocation.innerHTML = `
Deliver to ${address.city} ${address.pincode}
<br>
<a href="address.html" style="text-decoration:none;"><small>Update Location</small></a>
`;

        } else {

            deliveryLocation.innerHTML = `
Deliver to
<br>
Add Address
`;

        }

    } else {

        deliveryLocation.innerHTML = `
Hello,
<br>
Sign In
`;

    }

}