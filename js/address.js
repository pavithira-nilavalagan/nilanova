/*=========================================*
 * NilaNova Address Manager
 *=========================================*/

// User must be logged in
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
    alert("Please sign in first.");
    window.location.href = "signin.html";
}

/*=========================================*
 * Elements
 *=========================================*/

const form = document.getElementById("addressForm");

const fullName = document.getElementById("fullName");
const mobile = document.getElementById("mobile");
const house = document.getElementById("house");
const area = document.getElementById("area");
const landmark = document.getElementById("landmark");
const city = document.getElementById("city");
const state = document.getElementById("state");
const pincode = document.getElementById("pincode");

/*=========================================*
 * LocalStorage Key
 *=========================================*/

const addressKey = "address_" + currentUser.email;

/*=========================================*
 * Load Saved Address
 *=========================================*/

const savedAddress = JSON.parse(localStorage.getItem(addressKey));

if (savedAddress) {
    fullName.value = savedAddress.fullName || "";
    mobile.value = savedAddress.mobile || "";
    house.value = savedAddress.house || "";
    area.value = savedAddress.area || "";
    landmark.value = savedAddress.landmark || "";
    city.value = savedAddress.city || "";
    state.value = savedAddress.state || "";
    pincode.value = savedAddress.pincode || "";
}

/*=========================================*
 * Save Address
 *=========================================*/

form.addEventListener("submit", function (e) {

    e.preventDefault();

    if (mobile.value.trim().length !== 10) {
        alert("Enter a valid mobile number.");
        return;
    }

    if (pincode.value.trim().length !== 6) {
        alert("Enter a valid pincode.");
        return;
    }

    const address = {
        fullName: fullName.value.trim(),
        mobile: mobile.value.trim(),
        house: house.value.trim(),
        area: area.value.trim(),
        landmark: landmark.value.trim(),
        city: city.value.trim(),
        state: state.value,
        pincode: pincode.value.trim()
    };

    // Save address
    localStorage.setItem(addressKey, JSON.stringify(address));

    // Update current user
    currentUser.name = fullName.value.trim();
    currentUser.phone = mobile.value.trim();

    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    // Update users array
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const index = users.findIndex(user => user.email === currentUser.email);

    if (index !== -1) {
        users[index].name = fullName.value.trim();
        users[index].phone = mobile.value.trim();

        localStorage.setItem("users", JSON.stringify(users));
    }

    alert("Address saved successfully.");

    window.location.href = "index.html";
});