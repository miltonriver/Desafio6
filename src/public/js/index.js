const socket = io();
socket.emit('message', 'Me estoy comunicando desde un websocket!!')
socket.emit('message', 'Esta bueno, parece complicado al principio')
socket.emit('message', 'Pero se va haciendo adictivo')
