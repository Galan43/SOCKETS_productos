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
                await new Usuario(usuario).save();
                io.emit("servidorUsuarioGuardado", "Usuario guardado");
                console.log("Usuario guardado");
            } catch (error) {
                console.log(error);
            }
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
                await new Producto(producto).save();
                io.emit("servidorProductoGuardado", "Producto guardado");
                console.log("Producto guardado");
            } catch (error) {
                console.log(error);
            }
        });
    });
}

module.exports = socket;