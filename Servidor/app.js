const express = require("express");
const mariadb = require("mariadb");
const jwt = require("jsonwebtoken");
const cors = require ("cors");
const SECRET_KEY = "clave";

let cart = require("./archivos_json/cart/buy.json");
let cats = require("./archivos_json/cats/cat.json");
let sell = require("./archivos_json/sell/publish.json");
let userCart = require("./archivos_json/user_cart/25801.json");
const cartRouter = require("./routes/cartRoutes");


const pool = mariadb.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "servidor",
    connectionLimit: 5,
});

const app = express();
const port = 3000;




//Probamos instalando fs? vi que es un modulo que capaz nos sirve para mostrar los JSON en el post, varios lo usaron.
app.use(express.json());


app.get("/", (req, res) => {
    res.send("<h1>Bienvenid@ al servidor</h1>");
});

// Endpoint /login y autenticacion.

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    
    if (username === "admin" && password === "admin") {
      const token = jwt.sign({ username }, SECRET_KEY);
      res.status(200).json({ token });
      
    } else {
      res.status(401).json({ message: "Usuario no autorizado" });
    }
  });
  

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });



app.use("/user_cart", (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers["access-token"], SECRET_KEY);
    next();
  } catch (err) {
    res.status(401).json({ message: "Usuario no autorizado" });
  }
});

app.use("/user_cart", cartRouter);

app.get("/cart", async (req, res) => {
  res.json(cart);
});