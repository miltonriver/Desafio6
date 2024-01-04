const socket = io();//configuración para poder usar socket del lado del cliente
socket.emit('message', 'Me estoy comunicando desde un websocket!!')
socket.emit('message', 'Esta bueno, parece complicado al principio')
socket.emit('message', 'Pero se va haciendo adictivo')
socket.on('otro-mensaje', data => {
    console.log(data)
})

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