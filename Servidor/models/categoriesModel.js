//Obtención de los json
const cats = require("../archivos_json/cats/cat.json");
//Obtención de categorias
const getCategories= async () =>{
    try{
        const categories = cats;
        return categories;
    } catch (err) {
        console.log(err);
    }
    return false;
};
//Obtención de categorias por id
const getCategoryById = async () => {
    const findcategorie = cats.find((cat) => cat.id === parseInt(req.params.id));

    if (findcategorie !== undefined) {
        res.status(200).json(findcategorie);
    } else {
        res.status(404).json({ message: "No se ha encontrado la categoría" });
    }
};

//Exportacion de modulos
module.exports = {
    getCategories,
    getCategoryById,
}
