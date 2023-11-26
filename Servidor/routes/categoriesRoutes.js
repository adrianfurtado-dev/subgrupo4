//Importación, fijación y exportación de rutas
const express = require("express")
const categoriesController = require("../controllers/categories.controller");
const categoriesRouter = express.Router();

categoriesRouter.get("/", categoriesController.getCategories);
categoriesRouter.get("/:id", categoriesController.getCategoryById);

module.exports = categoriesRouter;