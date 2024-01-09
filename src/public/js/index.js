const socket = io();//configuración para poder usar socket del lado del cliente
console.log('Cliente conectado al servidor de socket')

socket.emit('message', 'Me estoy comunicando desde un websocket!!')
// socket.emit('message', 'Esta bueno, parece complicado al principio')
// socket.emit('message', 'Pero se va haciendo adictivo')

function addProduct() {

    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let price = document.getElementById("price").value;
    let thumbnail = document.getElementById("thumbnail").value;
    let code = document.getElementById("code").value;
    let stock = document.getElementById("stock").value;
    let status = document.getElementById("status").value;
    let category = document.getElementById("category").value;

    socket.emit("addProduct", { title, description, price, thumbnail, code, stock, status, category });

    socket.on('productsListAdd', data => {
        console.log('Recibido productList del servidor: ', data)
    })
}


function deleteProduct(productId) {
    socket.emit("deleteProduct", { id: productId });

    socket.on('productsList', data => {
        console.log('Recibido productList del servidor: ', data)
    })
}

// socket.on('otro-mensaje', data => {
//     console.log(data)
// })


/* Swal.fire({
    title: "Autentificación requerida para poder ingresar",
    input: "text",
    text: "Ingresa tu nombre de usuario",
    inputValidator: value => {
        return !value && "Necesitas ingresar el nombre de usuario para continuar"
    },
    allowOutsideClick: false
}).then(result => {
    user = result.value
    console.log(user)
}) */