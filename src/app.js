import express from "express";
import __dirname from "./utils.js";
import ProductsManager from "./ProductManager.js";
import handlebars from "express-handlebars";
import productsRouter from "./routers/products.router.js";
import cartsRouter from "./routers/carts.router.js";
import viewsRouter from "./routers/views.router.js"
import { Server } from "socket.io";

const app = express();
const PORT = 8080
const httpServer = app.listen(PORT, () => {
    console.log(`escuchando en el puerto ${PORT}`)
})

//socket del lado del servidor
const socketServer = new Server(httpServer);//por convención este servidor lleva el nombre de io solamente
const products = new ProductsManager();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname+'/public'));
app.use('/', viewsRouter);
app.use('/realTimeProducts', viewsRouter);

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

//conexión socket del lado del server
socketServer.on('connection', socket => {
    console.log("El cliente está conectado")

    /* socket.on("message", data => {
        console.log(data)
    }) */

    socket.on("addProduct", async (productData) => {
        try {
            await products.addProduct(productData);
            console.log(productData)
    
            socket.emit("productsList", await products.products);
            console.log('Evento addProduct emitido desde el cliente');
            
        } catch (error) {
            console.error('Error en addProduct:', error);
        }
    });

    socket.on("deleteProduct", async (productData) => {
        try {
            await products.deleteProduct(productData.id);
            console.log(productData)
    
            socket.emit("productsList", await products.products)
            console.log('Evento deleteProduct emitido desde el cliente');
            
        } catch (error) {
            console.error('Error en deleteProduct:', error);
        }
    })
})


