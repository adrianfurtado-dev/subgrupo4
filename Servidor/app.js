const cartRouter = require("./routes/cartRoutes");
const express = require("express");
const mariadb = require("mariadb");
const jwt = require("jsonwebtoken");
const cors = require ("cors");
const SECRET_KEY = "clave";
const categoriesRouter = require("./routes/cartRoutes");


let cart = require("./archivos_json/cart/buy.json");
let cats = require("./archivos_json/cats/cat.json");
let sell = require("./archivos_json/sell/publish.json");
let userCart = require("./archivos_json/user_cart/25801.json");


const pool = mariadb.createPool({
    host: "localhost",
    user: "root",
    password: "5231troy",
    database: "e-commerce-servidor",
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
  

  
  
//Decodificación del codigo 
app.use("/user_cart", (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers["access-token"], SECRET_KEY);
    next();
  } catch (err) {
    res.status(401).json({ message: "Usuario no autorizado" });
  }
});
//Asignación de Routers
app.use("/cats", categoriesRouter);

app.use("/user_cart", cartRouter);
//Obtención de cats_products por id
app.get("/cats_products/:id", async (req, res) =>{
  try {
    const catProducts = await require(`./archivos_json/cats_products/${parseInt(req.params.id)}.json`);
    res.json(catProducts);
  } catch (error){
    res.status(404).json({ message: "No se ha podido encontrar la categoria"});
  }
});
//Obtención de products por id
app.get("/products/:id", async (req, res) => {
  try {
    const producto = await require(`./archivos_json/products/${parseInt(req.params.id)}.json`);
    res.status(200).json(producto);
  } catch (error) {
    res.status(404).json({ message: "Producto no encontrado" });
  }
});
//Obtención de comentarios por id
app.get("/products_comments/:id", async (req, res) =>{
  try {
    const productcomment = await require(`./archivos_json/products_comments/${parseInt(req.params.id)}.json`);
    res.json(productcomment);
  } catch (error){
    res.status(404).json({ message: "No se ha podido encontrar el producto"});
  }
})
//Obtencion de mensaje cart compra
app.get("/cart", async (req, res) => {
  res.json(cart);
});
//Obtención de mensaje ventas
app.get("/sell", async (req, res) =>{
  res.json(sell)
})
//Escucha el port del hostlocal
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });