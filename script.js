function show(id) {
  document.querySelectorAll(".section").forEach(sec => {
    sec.style.display = "none";
  });
  document.getElementById(id).style.display = "block";
}
function logger(req) {
  return "Logging request: " + req;
}

function auth(req) {
  if (req.token === "valid") {
    return "Auth success";
  } else {
    throw "Unauthorized";
  }
}

function runMiddleware() {
  let logs = document.getElementById("logs");
  logs.innerHTML = "";

  let req = { url: "/api", token: "valid" };

  try {
    logs.innerHTML += "<p>" + logger(req.url) + "</p>";
    logs.innerHTML += "<p>" + auth(req) + "</p>";
    logs.innerHTML += "<p>Request processed</p>";
  } catch (err) {
    logs.innerHTML += "<p style='color:red'>" + err + "</p>";
  }
}
let token = null;

function login() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  if (user === "admin" && pass === "1234") {
    token = "valid-token"; // simulate JWT
    document.getElementById("authStatus").innerText = "Login success";
  } else {
    document.getElementById("authStatus").innerText = "Invalid credentials";
  }
}

function accessProtected() {
  if (token) {
    document.getElementById("authStatus").innerText = "Access granted";
  } else {
    document.getElementById("authStatus").innerText = "401 Unauthorized";
  }
}
let balance = 1000;

function transfer() {
  let amt = parseInt(document.getElementById("amount").value);
  let status = document.getElementById("txStatus");

  let tempBalance = balance;

  if (amt > balance) {
    status.innerText = "Transaction failed! Rollback.";
    return;
  }

  tempBalance -= amt;

  // simulate error
  if (amt > 500) {
    status.innerText = "Error occurred! Rolling back...";
  } else {
    balance = tempBalance;
    document.getElementById("balance").innerText = balance;
    status.innerText = "Transaction successful";
  }
}