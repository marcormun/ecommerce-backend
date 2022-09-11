# Z-SNKRS ecommerce

Backend para la tienda electrónica de sneakers Z-SNKRS, centrada en productos con "exclusividad".

BBDD hecha con MongoDB, lógica hecha con node, express y mongoose.

[Enlace](https://github.com/marcormun/videoclub-web) al github de la web.

# Tabla

- [Descripcion](#Descripción)
- [Endpoints](#endpoints)
    - [Usuario](#Usuario)
    - [Administrador](#Administrador)
- [BBDD](#BBDD)
- [Autor](#Autor)

# Descripción

Tenemos dos roles con diferentes permisos, el usuario que accederá a la página para realizar pedidos y el administrador que podrá gestionar tanto usuarios como pedidos de todos los clientes.
La idea es que el administrador actualize el estado de un pedido cuando se envie o lo cancele en caso de haber problemas.

# Endpoints

## Usuario

Los endpoints mostrados a continuación pueden ser usados tanto por un administrador como un usuario.

### Enpoints autenticación

POST /api/auth/register -> Registrar un usuario
POST /api/auth/login -> Logearse
GET /api/auth/profile -> Ver perfil

### Enpoints usuario

GET /api/users/:id -> Ver toda la información del usuario
PUT /api/users/:id -> Modificar dirección de entrega de pedidos
DELETE /api/users/:id -> Eliminar usuario

### Enpoints proveedores

GET /api/providers -> Ver todos los proveedores
GET /api/providers/id/:id -> Filtrar proveedor por id
GET /api/providers/name/:name -> Filtrar proveedor por nombre

### Enpoints productos

GET /api/products -> Listar todos los productos
GET /api/products/id/:id -> Buscar un producto por id
GET /api/products/name/:name -> Buscar un producto por nombre
GET /api/products/provider/:id -> Buscar todos los productos de un proveedor.
PUT /api/products/id/:id -> Modificar stock de un producto (reducirlo cuando se hace una compra)
PUT /api/products/id/:id -> Modificar stock de un producto (reducirlo cuando se hace una compra)

### Enpoints pedidos

GET /api/orders/user/:id -> Mostrar todos los pedidos del usuario
POST /api/orders -> Crear pedido
DELETE /api/orders -> Eliminar pedido (En el frontend se puede cancelar si se está procesando o eliminar de la lista si ya ha sido entregado)

## Administrador

Los endpoints mostrados a continuación pueden ser usados solamente por el administrador.

### Enpoints usuario

GET /api/users -> Listar todos los usuarios

### Enpoints proveedores

POST /api/providers -> Añadir un proveedor
PUT /api/providers/id/:id -> Modificar datos del proveedor
DELETE /api/providers/id/:id -> Eliminar un proveedor

### Enpoints productos

POST /api/products -> Añadir un producto
DELETE /api/products/id/:id -> Eliminar un producto

### Enpoints pedidos

GET /api/orders -> Listar los pedidos de todos los usuarios

### BBDD

Este es el modelo relacional de la base de datos.
<img width="689" alt="image" src="https://user-images.githubusercontent.com/102702041/189542206-1194cc49-cbf8-47a0-9b06-ec58d13fc440.png">



## Autor

#### [Marc Cordón Muñoz](https://github.com/marcormun)
