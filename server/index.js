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
}
