//Implementación de base de datos
const mariadb = require("mariadb")

const pool = mariadb.createPool({
    host: "localhost",
    user: "root",
    password: "5231troy",
    database: "e-commerce-servidor",
    connectionLimit: 5,
});
//Función para el Get
const getCart = async () => {
    let conn;
    try {
        conn = await pool.getConnection();
        const response = await conn.query("SELECRT * FROM cart");
        return response
    } catch (error){
        console.log(error);
    } finally {
        if (conn) conn.release();
    }
    return false;
};
//Funcion para el Post
const addToCart = async (product) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const response = await conn.query(
            "INSERT INTO cart(id, unitCost, currency, Name, count, image) VALUE(?, ?, ?, ?, ?, ?)",
            [product.id, product.unitCost, product.currency, product.name, product.count, product.image]
        );
        return { id: parseInt(response.insertId), ...product};
    } catch (error){
        console.log(error);
    } finally {
        if (conn) conn.release();
    }
    return false;
}
//Función para el Put
const updateCart = async (count, id) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const response = await conn.query("UPDATE cart SET count=? WHERE id=?", [count, id,])
        return response;
    } catch (error){
        console.log(error);
    } finally {
        if (conn) conn.release();
    }
    return false;
};
//Función para el delete
const deleteCartProduct = async (id) =>{
    let conn;
    try{
        conn = await pool.getConnection();
        const response = await conn.query("DELETE FROM cart WHERE id=?", [id]);
        return response;
    } catch (error){
        console.log(error);
    } finally {
        if (conn) conn.release();
    }
    return false;
};
//Exportación de modulos
module.exports = {
    getCart,
    addToCart,
    updateCart,
    deleteCartProduct,
};