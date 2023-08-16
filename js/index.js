const session = localStorage.getItem("session");
if (!session) {
    window.location.href = "login.html";
}
