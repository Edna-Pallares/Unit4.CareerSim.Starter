//imports
const pg = require("pg");
const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/the_acme_notes_db"
);
const uuid = require("uuid"); //generates unique code
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT = process.env.JWT || "shhh";

//createTables
const createTables = async () => {
  const SQL = `
    DROP TABLE IF EXISTS carted_products;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS products;
    CREATE TABLE users(
      id UUID DEFAULT gen_random_uuid(),
      first_name VARCHAR(20) NOT NULL,
      last_name VARCHAR(20) NOT NULL,
      email VARCHAR(25) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      address VARCHAR(255),
      payment_info VARCHAR(255),
      is_admin BOOLEAN DEFAULT false,
      PRIMARY KEY (id)
    );
    CREATE TABLE products(
      id UUID DEFAULT gen_random_uuid(),
      name VARCHAR(30) NOT NULL,
      description TEXT,
      inventory INT,
      price NUMERIC(10,2),
      currency VARCHAR(10),
      imageUrl VARCHAR(255),
      PRIMARY KEY (id)
    );
    CREATE TABLE carted_products(
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      user_id UUID REFERENCES users(id) NOT NULL,
      product_id UUID REFERENCES products(id) NOT NULL,
      amount INT,
      CONSTRAINT unique_user_id_and_product_id UNIQUE (product_id, user_id)
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

// createCart
const createCart = async (user_id) => {
  const SQL = `
    INSERT INTO carted_products (user_id, product_id, amount)
    SELECT $1, id, 0 FROM products;
  `;
  await client.query(SQL, [user_id]);
};

//readUser
const selectUser = async () => {
  const SQL = `
    SELECT * FROM users;
  `;
  const response = await client.query(SQL);
  return response.rows;
};

//readProducts --returns all products
const selectProducts = async () => {
  const SQL = `
    SELECT * FROM products;
  `;
  const response = await client.query(SQL);
  return response.rows;
};

//readCartedProduct
const selectCartedProducts = async () => {
  const SQL = `
  SELECT * FROM carted_products;
  `;
  const response = await client.query(SQL);
  return response.rows;
};

// readCart
const selectCart = async (user_id) => {
  const SQL = `
    SELECT cp.id, p.name, p.description, p.price, p.currency, cp.amount
    FROM carted_products cp
    JOIN products p ON cp.product_id = p.id
    WHERE cp.user_id = $1;
  `;
  const response = await client.query(SQL, [user_id]);
  return response.rows;
};

//updateUser
const updateUser = async ({
  id,
  first_name,
  last_name,
  email,
  password,
  address,
  payment_info,
}) => {
  const SQL = `
  UPDATE users
  SET first_name = $2, last_name = $3, email = $4, password = $5, address = $6, payment_info = $7 
  WHERE id = $1
  RETURNING *;
  `;
  const response = await client.query(SQL, [
    id,
    first_name,
    last_name,
    email,
    password,
    address,
    payment_info,
  ]);
  return response.rows[0];
};

//updateProduct
const updateProducts = async ({
  id,
  name,
  description,
  inventory,
  price,
  currency,
  imageUrl,
}) => {
  const SQL = `
  UPDATE products 
  SET name = $2, description = $3, inventory = $4, price = $5, currency = $6, imageUrl = $7
  WHERE id = $1
  RETURNING *;
`;
  const response = await client.query(SQL, [
    id,
    name,
    description,
    inventory,
    price,
    currency,
    imageUrl,
  ]);
  return response.rows[0];
};

//updateCartedProduct
const updateCartedProducts = async ({ id, user_id, product_id, amount }) => {
  const SQL = `
    UPDATE carted_products 
    SET user_id = $2, product_id = $3, amount = $4
    WHERE id = $1
    RETURNING *;
  `;
  const response = await client.query(SQL, [id, user_id, product_id, amount]);
  return response.rows[0];
};

// updateCart
const updateCart = async ({ id, amount }) => {
  const SQL = `
    UPDATE carted_products
    SET amount = $2
    WHERE id = $1
    RETURNING *;
  `;
  const response = await client.query(SQL, [id, amount]);
  return response.rows[0];
};

//deleteUser
const deleteUser = async (id) => {
  const SQL = `
    DELETE FROM users WHERE id = $1 RETURNING *;
  `;
  const response = await client.query(SQL, [id]);
  return response.rows[0];
};

//deleteProduct
const deleteProduct = async (id) => {
  const SQL = `
      DELETE FROM products WHERE id = $1 RETURNING *;
    `;
    const response = await client.query(SQL, [id]);
    return response.rows[0];
};

//deleteCartedProduct
const deleteCartedProduct = async (id) => {
  const SQL = `
    DELETE FROM carted_products 
    WHERE id = $1
    RETURNING *;
  `;
  const response = await client.query(SQL, [id]);
  return response.rows[0];
};

//deleteCart
const deleteCart = async (user_id) => {
  const SQL = `
  DELETE FROM carted_products WHERE user_id = $1;
  `;
  await client.query(SQL, [user_id]);
};

//authenticate
const authenticate = async ({ email, password }) => {
  const SQL = `
  SELECT id, password, email FROM users WHERE email = $1
  `;
  const response = await client.query(SQL, [email]);
  if (
    !response.rows.length ||
    (await bcrypt.compare(password, response.rows[0].password)) === false
  ) {
    const error = Error("not authorized");
    error.status = 401;
    throw error;
  }
  const token = await jwt.sign({ id: response.rows[0].id }, JWT);
  console.log(token);
  return { token: token };
};

//findUserWithToken
const findUserWithToken = async (token) => {
  let id;
  try {
    const payload = await jwt.verify(token, JWT);
    id = payload.id;
  } catch (ex) {
    const error = Error("not authorized");
    error.status = 401;
    throw error;
  }
  const SQL = `
    SELECT id, username FROM users WHERE id=$1;
  `;
  const response = await client.query(SQL, [id]);
  if (!response.rows.length) {
    const error = Error("not authorized");
    error.status = 401;
    throw error;
  }
  return response.rows[0];
};

//exports
module.exports = {
  client,
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
  authenticate,
  findUserWithToken
};
