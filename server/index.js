//User
//Email PK (Pass Key) not null
//Password (string varchar) not null
//First Name (string varchar)
//Last Name (string varchar)
//Address (string varchar) not null
//Payment Info (string varchar)
//Phone Number (string varchar)
//Logged In (boolean)
//Admin? (boolean)

//SELECT * FROM users
//SELECT * FROM users WHERE admin = true;
//SELECT * FROM users WHERE email = 'bob@email.com';

const pg = require('pg')
const express = require('express')
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/the_acme_notes_db')
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