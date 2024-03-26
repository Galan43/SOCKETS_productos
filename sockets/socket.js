const Usuario = require("../models/usuario");
const Producto = require("../models/productos");

function socket(io) {
    io.on("connection", (socket) => {
        // Mostrar Usuarios
        mostrarUsuarios();
        async function mostrarUsuarios() {
            try {
                const usuarios = await Usuario.find();
                io.emit("servidorEnviarUsuarios", usuarios);
            } catch (error) {
                console.log(error);
            }
        }
        
        // Guardar Usuario
        socket.on("clienteGuardarUsuario", async (usuario) => {
            try {
                if (usuario.id && usuario.id !== "") {
                    await Usuario.findByIdAndUpdate(usuario.id, usuario);
                    io.emit("servidorUsuarioGuardado", "Usuario actualizado");
                } else {
                    await new Usuario(usuario).save();
                    io.emit("servidorUsuarioGuardado", "Usuario guardado");
                }
                mostrarUsuarios();
            } catch (error) {
                console.log(error);
            }
        });

         //OBTENER USUARIO POR ID
         socket.on("clienteObtenerUsuarioPorID",async(id)=>{
            const usuario=await Usuario.findById(id);
            io.emit("servidorObtenerUsuarioPorID",usuario);
        });

        //BORRAR USUARIO POR ID
        socket.on("clienteBorrarUsuario",async(id)=>{
            await Usuario.findByIdAndDelete(id);
            io.emit("servidorUsuarioGuardado","Usuario borrado");
            mostrarUsuarios();
        });

        // Mostrar Productos
        mostrarProductos();
        async function mostrarProductos() {
            try {
                const productos = await Producto.find();
                io.emit("servidorEnviarProductos", productos);
            } catch (error) {
                console.log(error);
            }
        }

        // Guardar Productos
        socket.on("clienteGuardarPro", async (producto) => {
            try {
                if (producto.id && producto.id !== "") {
                    await Producto.findByIdAndUpdate(producto.id, producto);
                    io.emit("servidorProductoGuardado", "Producto actualizado");
                    console.log("Producto actualizado");
                } else {
                    await new Producto(producto).save();
                    io.emit("servidorProductoGuardado", "Producto guardado");
                    console.log("Producto guardado");
                }
                mostrarProductos();
            } catch (error) {
                console.log(error);
            }
        });

         //OBTENER Productos POR ID DE 
         socket.on("clienteObtenerProductoPorID", async (id) => {
            const producto = await Producto.findById(id);
            io.emit("servidorObtenerProductoPorID", producto);
        });

        //BORRAR Productos POR ID DE 
        socket.on("clienteBorrarProducto",async(id)=>{
            await Producto.findByIdAndDelete(id);
            io.emit("servidorProductoGuardado","Producto borrado");
            mostrarProductos();
        });

    });
}

module.exports = socket;