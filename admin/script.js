function getData(key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
}
function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
function addItem(key) {
  const name = prompt("Enter " + key.slice(0, -1) + " name:");
  if (!name) return;
  const data = getData(key);
  data.push({ id: Date.now(), name });
  saveData(key, data);
  renderList(key);
}
function deleteItem(key, id) {
  let data = getData(key).filter(item => item.id !== id);
  saveData(key, data);
  renderList(key);
}
function renderList(key) {
  const list = document.getElementById(key + "-list");
  if (!list) return;
  list.innerHTML = "";
  getData(key).forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.name;
    const btn = document.createElement("button");
    btn.textContent = "Delete";
    btn.onclick = () => deleteItem(key, item.id);
    li.appendChild(btn);
    list.appendChild(li);
  });
}
function bindListPage(key) {
  renderList(key);
}
// Authentication
function login(event) {
  event.preventDefault();
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  if (user === "admin" && pass === "admin123") {
    localStorage.setItem("admin_logged_in", "true");
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid credentials!");
  }
}
function checkLogin() {
  if (localStorage.getItem("admin_logged_in") !== "true") {
    window.location.href = "login.html";
  }
}
function logout() {
  localStorage.removeItem("admin_logged_in");
  window.location.href = "login.html";
}
