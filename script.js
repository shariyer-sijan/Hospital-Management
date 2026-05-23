
// CHANGE TEXT
document.getElementById("changeTextBtn").onclick = function () {
  document.getElementById("title").innerText =
    "Welcome to CareSync System";
};

// SHOW HIDE
document.getElementById("showBtn").onclick = function () {

  let info = document.getElementById("extraInfo");

  if (info.style.display === "none") {
    info.style.display = "block";
  } else {
    info.style.display = "none";
  }
};

// COUNTER
let count = 0;

function increaseCounter() {
  count++;
  document.getElementById("counter").innerText = count;
}

// DARK MODE
document.getElementById("modeBtn").onclick = function () {
  document.body.classList.toggle("dark");
};

// FORM VALIDATION
let form = document.getElementById("loginForm");

form.addEventListener("submit", function (e) {

  e.preventDefault();

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let agree = document.getElementById("agree").checked;

  let message = document.getElementById("message");

  // EMPTY CHECK
  if (email === "" || password === "") {
    message.innerText = "Fields cannot be empty";
    message.style.color = "red";
    return;
  }

  // EMAIL VALIDATION
  if (!email.includes("@")) {
    message.innerText = "Invalid Email";
    message.style.color = "red";
    return;
  }

  // CHECKBOX VALIDATION
  if (!agree) {
    message.innerText = "Accept terms first";
    message.style.color = "red";
    return;
  }

  // SUCCESS
  message.innerText = "Login Successful";
  message.style.color = "green";

  alert("Welcome to CareSync!");

  // STORE DATA
  let user = {
    email: email,
    password: password
  };

  localStorage.setItem("user", JSON.stringify(user));

  showUser();
});

// SHOW STORED DATA
function showUser() {

  let data = JSON.parse(localStorage.getItem("user"));

  if (data) {

    document.getElementById("userList").innerHTML = `
    
      <div class="user-card">
      
        <h3>${data.email}</h3>

        <button onclick="updateUser()">Update</button>

        <button onclick="deleteUser()">Delete</button>

      </div>
    
    `;
  }
}

showUser();

// DELETE
function deleteUser() {

  localStorage.removeItem("user");

  document.getElementById("userList").innerHTML = "";

  alert("User Deleted");
}

// UPDATE
function updateUser() {

  let newEmail = prompt("Enter New Email");

  let data = JSON.parse(localStorage.getItem("user"));

  data.email = newEmail;

  localStorage.setItem("user", JSON.stringify(data));

  showUser();

  alert("Updated Successfully");
}

// LOGOUT
document.getElementById("logoutBtn").onclick = function () {

  alert("Logged Out");

  document.getElementById("email").value = "";
  document.getElementById("password").value = "";

};

const lat = 22.3569;
const lon = 91.7832;

// Open-Meteo API URL (এতে বর্তমান তাপমাত্রা ও ওয়েদার কোড চাওয়া হয়েছে)
const apiURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`;

// API থেকে ডাটা আনার ফাংশন
async function getWeatherData() {
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        
        // API থেকে পাওয়া তাপমাত্রা
        const currentTemp = data.current.temperature_2m;
        const weatherCode = data.current.weather_code;
        
        // HTML এর লেখা পরিবর্তন করা
        document.getElementById('temperature').innerText = `${currentTemp}°C`;
        document.getElementById('description').innerText = getWeatherStatus(weatherCode);
        
    } catch (error) {
        console.error("ডাটা আনতে সমস্যা হয়েছে:", error);
        document.getElementById('description').innerText = "Failed to load data";
    }
}

// ওয়েদার কোড দেখে আবহাওয়া কেমন তা বোঝার জন্য একটি সাধারণ হেল্পার ফাংশন
function getWeatherStatus(code) {
    // Open-Meteo নির্দিষ্ট কিছু কোড দেয় (যেমন: ০ মানে পরিষ্কার আকাশ)
    if (code === 0) return "Clear Sky";
    if (code >= 1 && code <= 3) return "Mainly Clear / Partly Cloudy";
    if (code >= 51 && code <= 67) return "Drizzle or Rain";
    if (code >= 71 && code <= 77) return "Snow Fall";
    if (code >= 95) return "Thunderstorm";
    return "Cloudy";
}

// পেজ লোড হলেই ফাংশনটি রান করবে
getWeatherData();

// DOCTOR AVAILABILITY

function checkDoctor(){

  let doctor =
  document.getElementById("doctorSelect").value;

  let result =
  document.getElementById("doctorResult");

  if(doctor === "Dr. Sijan"){

    result.innerText =
    "Dr. Sijan is Available Today";
  }

  else if(doctor === "Dr. Towfiq"){

    result.innerText =
    "Dr. Towfiq is Busy";
  }
  else if(doctor === "Dr. Awal"){

    result.innerText =
    "Dr. Awal is Busy";
  }
  else{

    result.innerText =
    "Dr. Zisan Available After 5 PM";
  }

}
// SERIAL BOOKING

let serial = 1;

function getSerial(){

  let name =
  document.getElementById("patientName").value;

  let result =
  document.getElementById("serialResult");

  if(name === ""){

    result.innerText =
    "Enter Patient Name";

    return;
  }

  result.innerText =
  name + ", Your Serial Number is: " + serial;

  serial++;
}
