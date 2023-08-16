document.getElementById("button-login").onclick = function(){
    localStorage.setItem("session", "user123");
    window.location.href = "index.html";
};

