//imports
const pg = require('pg')
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/the_acme_notes_db')
const uuid = require('uuid'); //generate unique code
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT = process.env.JWT || 'shhh';
const express = require('express')
const app = express() 

//CRUD


//createUser
const createUser = async() =>{

};
//createCart
const createCart = async() =>{
    
};
//createProduct
const createProduct = async() =>{

};
//createOrder (optional) (good for capstone...but don't need now)
const createOrder = async() =>{

};
//readUser
const selectUser = async() =>{

};
//readProduct
const selectProduct = async() =>{
    
};
//readCartedProduct
const selectCartedProduct = async() =>{
    
};
//updateCartedProduct
const updateCartedProducts = async( =>){

};
//updateUser
const updateUser = async( =>){
    
};
//updateProduct
const updateProducts = async( =>){
    
};
//deleteUser
const deleteUser = async( =>){
    
};
//deleteProduct
const deleteProduct = async( =>){
    
};
//deleteProductFromCart
const deleteCartProduct = async( =>){
    
};
//deleteCart
const deleteCart = async( =>){
    
};

//Table Design
/* ---Product---
id (UUID generated)
name
price
num_inventory


---User---
id (UUID generated)
name
address
credit_card_num
isAdmin BOOLEAN

---Carted_Products---
id (UUID generated)
user_id (foreign key)
product_id (foreign key)
amount
constraint one_product UNIQUE (user_id, product_id)
constraint valid_amount CHECK (amount <= product_inventory)

*/
const createTables = async()=> {
    const SQL = `
      DROP TABLE IF EXISTS carted_products;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS products;
      CREATE TABLE users(
        id UUID PRIMARY KEY,
        username VARCHAR(20) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
        address VARCHAR(255)
        payment_info VARCHAR (16)
        is_admin BOOLEAN,
        PRIMARY KEY (id)
      );
      CREATE TABLE products(
        id UUID DEFAULT gen_random_uuid(),
        name VARCHAR(100) UNIQUE NOT UNIQUE
        inventory NUMERIC(7,5),
        price NUMERIC(7,5),
        currency TEXT,
        PRIMARY KEY (id)
      );
      CREATE TABLE carted_products(
        id UUID DEFAULT gen_random_uuid(),
        product_id UUID REFERENCES products(id) NOT NULL,
        user_id UUID REFERENCES users(id) NOT NULL,
        amount NUMERIC DEFAULT,
        CONSTRAINT unique_user_id_and_product_id UNIQUE (products_id, user_id)
        CONSTRAINT amount_less_than_inventory CHECK (amount <= product(inventory)),
        PRIMARY KEY (id)
      );
    `;
    await client.query(SQL);
  
  };