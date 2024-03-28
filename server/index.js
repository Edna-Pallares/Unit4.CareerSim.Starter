//imports
const { createTables } = require('../../../block36/Acme-auth-store/server/db');
const {  client,
    createTables,
    createUser,
    createProduct,
    createCartedProducts,
    createCart,
    selectUser,
    selectProducts,
    selectCartedProducts,
    selectCart,
    updateUser,
    updateProducts,
    updateCartedProducts,
    updateCart,
    deleteUser,
    deleteProduct,
    deleteCartedProduct,
    deleteCart,
    deleteCartItem,
    authenticate,
    findUserWithToken
} = require('./db');
//fetchUserInfo
//login
//logout
//createProduct //admins only
//updateProduct //admins only
//deleteProduct //admins only
//addToCart
//removeFromCart
//checkout (deletes cart and adds to order history) //maintaining order history is optional!

const express = require('express')
const app = express() 

//app routes
app.use(express.json());
app.use(require('morgan')('dev'));
app.post('/api/notes', async (req, res, next) => {});
app.get('/api/notes', async (req, res, next) => {
    try{
        const SQL = `SELECT * from notes ORDER BY created_at DESC;`
        const response = await client.query(SQL)
        res.send(response.rows)


    }catch(error){
        next(error)
    }
});
app.put('/api/notes/:id', async (req, res, next) => {});
app.delete('/api/notes/:id', async (req, res, next) => {});

const init = async () => {
    await client.connect ();
    console.log('connected to database')
    
    await createTables();
    console.log('tables created');
    
}
