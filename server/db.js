//imports
const pg = require("pg");
const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/the_acme_notes_db"
);
const uuid = require("uuid"); //generate unique code
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT = process.env.JWT || "shhh";

//createTable
const createTables = async () => {
  const SQL = `
    DROP TABLE IF EXISTS carted_products;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS products;
    CREATE TABLE users(
      id UUID DEFAULT gen_random_uuid(),
      first_name VARCHAR(20) UNIQUE NOT NULL,
      last_name VARCHAR(20) UNIQUE NOT NULL,
      email VARCHAR(25) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      address VARCHAR(255),
      payment_info VARCHAR(16),
      is_admin BOOLEAN,
      PRIMARY KEY (id)
    );
    CREATE TABLE products(
      id UUID DEFAULT gen_random_uuid(),
      name VARCHAR(30) UNIQUE NOT NULL,
      description TEXT,
      inventory NUMERIC,
      price NUMERIC(7,5),
      currency TEXT,
      imageUrl VARCHAR(255)
      PRIMARY KEY (id)
    );
    CREATE TABLE carted_products(
      id UUID DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES users(id) NOT NULL,
      product_id UUID REFERENCES products(id) NOT NULL,
      amount NUMERIC DEFAULT,
      CONSTRAINT unique_user_id_and_product_id UNIQUE (product_id, user_id)
      CONSTRAINT amount_less_than_inventory CHECK (amount <= products(inventory)),
      PRIMARY KEY (id)
    );
  `;
  await client.query(SQL);
};

//createUser
const createUser = async ({
  first_name,
  last_name,
  email,
  password,
  address,
  payment_info,
}) => {
  const SQL = `
  INSERT INTO users(id, first_name, last_name, email, password, address, payment_info) VALUES($1, $2, $3, $4, $5, $6) RETURNING *
  `;
  const response = await client.query(SQL, [
    uuid.v4(),
    first_name,
    last_name,
    email,
    await bcrypt.hash(password, 8),
    address,
    payment_info,
  ]);
  return response.rows[0];
};

//createProduct
const createProduct = async ({
  name,
  description,
  inventory,
  price,
  currency,
  imageUrl,
}) => {
  const SQL = `
    INSERT INTO products(id, name, description, inventory, price, currency, imageUrl) VALUES($1, $2, $3, $4, $5) RETURNING *
  `;
  const response = await client.query(SQL, [
    uuid.v4(),
    name,
    description,
    inventory,
    price,
    currency,
    imageUrl,
  ]);
  return response.rows[0];
};

//createCartedProduct
const createCartedProducts = async ({ user_id, product_id, amount }) => {
  const SQL = `
  INSERT INTO carted_products(id, user_id, product_id, amount) VALUES ($1, $2, $3, $4) RETURNING *
  `;
  const response = await client.query(SQL, [
    uuid.v4(),
    user_id,
    product_id,
    amount,
  ]);
  return response.rows[0];
};

//createOrder (optional) (good for capstone...but don't need now)
const createOrder = async () => {};

//readUser
const selectUser = async () => {
  const SQL = `
    SELECT * FROM users;
  `;
  const response = await client.query(SQL);
  return response.rows;
};

//readProduct --returns all products
const selectProducts = async () => {
  const SQL = `
    SELECT * FROM products;
  `;
  const response = await client.query(SQL);
  return response.rows;
};

//readCartedProduct
const selectCartedProducts = async () => {

};

//updateUser
const updateUser = async () => {};

//updateProduct
const updateProducts = async () => {};

//updateCartedProduct
const updateCartedProducts = async () => {};

//deleteUser
const deleteUser = async () => {};

//deleteProduct
const deleteProduct = async () => {};

//deleteProductFromCart
const deleteCartedProduct = async () => {};

//deleteCart
const deleteCart = async ({ user_id, id }) => {
  const SQL = `
  DELETE FROM cart WHERE user_id = $1 AND id = $2
  `;
  await client.query(SQL, [user_id, id]);
};

//exports
module.exports = {
  client,
  createTables,
  createUser,
  createProduct,
  createCartedProducts,
  createOrder,
  selectUser,
  selectProducts,
  selectCartedProducts,
  updateUser,
  updateProducts,
  updateCartedProducts,
  deleteUser,
  deleteProduct,
  deleteCartedProduct,
  deleteCart,
};
