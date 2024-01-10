import { Router } from "express";
import ProductsManager from "../ProductManager.js";


const router = Router();
const products = new ProductsManager()
// console.log("Aca esta lo que tiene al inicio el array de productos:", products);
/* const products = [
    { title: "producto 1", description: "Este es el primer producto de prueba", price: 1590, thumbnail: "Sin imagen", code: "abc123", stock: 25, status: true, category: "products" },
    { title: "producto 2", description: "Este es otro producto de prueba", price: 2560, thumbnail: "Sin imagen", code: "abc1234", stock: 188,status: true, category: "products" },
    { title: "producto 3", description: "Este es otro producto más de prueba", price: 400, thumbnail: "Sin imagen", code: "abc12345", stock: 20, status: true, category: "products" },
    { title: "producto 4", description: "Este es el cuarto producto de prueba", price: 800, thumbnail: "Sin imagen", code: "abc123456", stock: 100, status: true, category: "products" }
] */

router.get('/', async (req, res) => {
    res.render('home', {
        productos: await products.products,
        style: 'index.css'
    });
})

router.get('/realtimeproducts', async (req, res) => {

    try {
        res.render('realTimeProducts', {
            productos: products.products,
            style: 'index.css'
        })
    } catch (error) {
        console.log(error);
        res.render("Error al intentar obtener la lista de productos!");
        return;
    }

})

router.post('/', (req, res) => {
    try {
        res.render('realTimeProducts', {
            productos: products.products,
            style: 'index.css'
        })
    } catch (error) {
        console.log(error);
        res.render("Error al intentar obtener la lista de productos!");
        return;
    }
})

export default router;