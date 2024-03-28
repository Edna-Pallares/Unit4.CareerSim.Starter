//imports
const pg = require('pg')
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/the_acme_notes_db')
const uuid = require('uuid'); //generate unique code
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT = process.env.JWT || 'shhh';

//createTable
const createTables = async()=> {
  const SQL = `
    DROP TABLE IF EXISTS carted_products;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS products;
    CREATE TABLE users(
      id UUID DEFAULT gen_random_uuid(),
      username VARCHAR(20) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      address VARCHAR(255),
      payment_info VARCHAR(16),
      is_admin BOOLEAN,
      PRIMARY KEY (id)
    );
    CREATE TABLE products(
      id UUID DEFAULT gen_random_uuid(),
      name VARCHAR(30) UNIQUE NOT NULL,
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
      CONSTRAINT unique_user_id_and_product_id UNIQUE (product_id, user_id)
      CONSTRAINT amount_less_than_inventory CHECK (amount <= products(inventory)),
      PRIMARY KEY (id)
    );
  `;
  await client.query(SQL);

};
//CRUD

//createUser
const createUser = async({username, password, address, payment_info, }) =>{

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
const updateCartedProducts = async() =>{

};
//updateUser
const updateUser = async() =>{
    
};
//updateProduct
const updateProducts = async() =>{
    
};
//deleteUser
const deleteUser = async() =>{
    
};
//deleteProduct
const deleteProduct = async() =>{
    
};
//deleteProductFromCart
const deleteCartProduct = async() =>{
    
};
//deleteCart
const deleteCart = async() =>{
    
};

//exports
module.exports = {
  client,
  createTables,
  createUser,
  createCart,
  createProduct,
  createOrder,
  selectUser,
  selectProduct,
  selectCartedProduct,
  updateCartedProducts,
  updateUser,
  updateProducts,
  deleteUser,
  deleteProduct,
  deleteCartProduct,
  deleteCart
}