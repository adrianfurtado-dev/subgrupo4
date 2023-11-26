//Obtención de model de Categories
const categoriesModel = require("../models/categoriesModel");
//Obtencion de categorias 
const getCategories = async (req, res) =>{
    const categories = await categoriesModel.getCategories();
    if (categories){
        res.status(200).json(categories);
    } else{
        res.status(500).json({ message: "error interno"})
    }
}
//Obtencion de categorias por id
const getCategoryById = async (req, res) => {
    const category = categoriesModel.getCategoryById(req.params.id);
    res.status(200).json(category);
    if (category) {
        res.status(200).json(category);
    } else {
        res.status(404).json({ message: "No se ha podido encontrar la categoria"})
    }
};
//Exportación de Modulos
module.exports = {
    getCategories,
    getCategoryById,
}