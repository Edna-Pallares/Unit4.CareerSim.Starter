//imports
const pg = require("pg");
const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/e_commerce_db"
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
      email VARCHAR(30) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      address VARCHAR(255),
      payment_info VARCHAR(255),
      is_admin BOOLEAN DEFAULT false,
      PRIMARY KEY (id)
    );
    CREATE TABLE products(
      id UUID DEFAULT gen_random_uuid(),
      name VARCHAR(255) NOT NULL,
      description TEXT,
      category TEXT,
      price NUMERIC(10,2),
      status TEXT,
      imageUrl VARCHAR(255),
      PRIMARY KEY (id)
    );
    CREATE TABLE carted_products(
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      user_id UUID REFERENCES users(id) NOT NULL,
      product_id UUID REFERENCES products(id) NOT NULL,
      quantity INT,
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
  //address,
  //payment_info,
}) => {
  const SQL = `
  INSERT INTO users(id, first_name, last_name, email, password) VALUES($1, $2, $3, $4, $5) RETURNING *
  `;
  const response = await client.query(SQL, [
    uuid.v4(),
    first_name,
    last_name,
    email,
    await bcrypt.hash(password, 8),
    //address,
    //payment_info,
  ]);
  return response.rows[0];
};

//createProduct
const createProduct = async ({
  name,
  description,
  category,
  price,
  status,
  imageUrl,
}) => {
  const SQL = `
    INSERT INTO products(id, name, description, category, price, status, imageUrl) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *
  `;
  const response = await client.query(SQL, [
    uuid.v4(),
    name,
    description,
    category,
    price,
    status,
    imageUrl,
  ]);
  return response.rows[0];
};

//createCartedProduct
const createCartedProducts = async ({ user_id, product_id, quantity }) => {
  const SQL = `
  INSERT INTO carted_products(id, user_id, product_id, quantity) VALUES ($1, $2, $3, $4) RETURNING *
  `;
  const response = await client.query(SQL, [
    uuid.v4(),
    user_id,
    product_id,
    quantity,
  ]);
  return response.rows[0];
};

//readUser
const fetchUser = async () => {
  const SQL = `
    SELECT * FROM users;
  `;
  const response = await client.query(SQL);
  return response.rows;
};

//readProducts --returns all products
const fetchProducts = async () => {
  const SQL = `
    SELECT * FROM products;
  `;
  const response = await client.query(SQL);
  return response.rows;
};

// readSingleProduct by ID
const fetchProductByID = async (id) => {
  const SQL = `
    SELECT * FROM products
    WHERE id=$1
    `;
  const response = await client.query(SQL, [id]);
  return response.rows[0];
};

//readCartedProduct
const fetchCartedProducts = async () => {
  const SQL = `
  SELECT * FROM carted_products;
  `;
  const response = await client.query(SQL);
  return response.rows;
};

// readCart
const fetchCart = async (user_id) => {
  const SQL = `
    SELECT cp.id, p.name, p.description, p.price, cp.quantity
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
  category,
  price,
  status,
  imageUrl,
}) => {
  const SQL = `
  UPDATE products 
  SET name = $2, description = $3, category = $4, price = $5, status = $6, imageUrl = $7
  WHERE id = $1
  RETURNING *;
`;
  const response = await client.query(SQL, [
    id,
    name,
    description,
    category,
    price,
    status,
    imageUrl,
  ]);
  return response.rows[0];
};

//updateCartedProduct
const updateCartedProducts = async ({ id, user_id, product_id, quantity }) => {
  const SQL = `
    UPDATE carted_products 
    SET user_id = $2, product_id = $3, quantity = $4
    WHERE id = $1
    RETURNING *;
  `;
  const response = await client.query(SQL, [id, user_id, product_id, quantity]);
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
  console.log(token)
  try {
    const payload = await jwt.verify(token, JWT);
    id = payload.id;
  } catch (err) {
    const error = Error("not authorized");
    error.status = 401;
    throw error;
  }
  const SQL = `
    SELECT id, email FROM users WHERE id=$1;
  `;
  const response = await client.query(SQL, [id]);
  console.log(response, id)
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
  fetchUser,
  fetchProducts,
  fetchCartedProducts,
  fetchCart,
  updateUser,
  updateProducts,
  updateCartedProducts,
  deleteUser,
  deleteProduct,
  deleteCartedProduct,
  authenticate,
  findUserWithToken,
};
