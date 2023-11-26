//Obtención de Model de cart
const cartModel = require("../models/cartModel");
//Funcion para obtener el cart GET
const getCart = async (req, res) => {
    const cart = await cartModel.getCart(req.params.id);
    if (cart) {
        res.status(201).json(cart);
    } else {
        res.status(500).json({ message: "error interno"});
    }
};
//Funcion para agregar al cart POST
const addToCart = async (req, res) =>{
    const product = await cartModel.addToCart(req.body);
    if (product) {
        res.status(201).json(product);
    } else {
        res.status(500).json({ message:"error interno"})
    }
};
//Funcion para actualizar el cart PUT
const updateCart = async (req, res) => {
    const response = await cartModel. updateCart(req.body.count, req.params.id);
    if (response) {
        res.status(201).json({ message: "Modificado"});
    } else{
        res.status(500).json({ message:"error interno"});
    }
};
//Funcion para eliminar producto del cart DELETE
const deleteCartProduct = async (req, res) => {
    const response = await cartModel.deleteCartProduct(req.params.id);
    if (response){
        res.status(204).json({ message: "Elemento eliminado"})
    } else {
        res.status(500).json({ message: "error interno"})
    }
};
//Exportación de modulos
module.exports = {
    getCart,
    addToCart,
    updateCart,
    deleteCartProduct,
}