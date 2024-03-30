//imports
const {
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
  findUserWithToken,
} = require("./db");

const express = require("express");
const app = express();
const cors = require("cors");

//Middleware
app.use(express.json());
app.use(require("morgan")("dev"));
app.use(cors());

//For deployment only
const path = require("path");
const { fakeInfo } = require("./info");
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../client/dist/index.html"))
);
app.use(
  "/assets",
  express.static(path.join(__dirname, "../client/dist/assets"))
);

//Function to check if a user is logged in
const isLoggedIn = async (req, res, next) => {
  try {
    req.user = await findUserWithToken(req.headers.authorization);
    next();
  } catch (err) {
    next(err);
  }
};

//Register a new user
app.post("/api/auth/register", async (req, res, next) => {
  try {
    res.send(await createUser(req.body));
  } catch (err) {
    next(err);
  }
});

//Login user
app.post("/api/auth/login", async (req, res, next) => {
  try {
    res.send(await authenticate(req.body));
  } catch (err) {
    next(err);
  }
});

//Get user info
app.get("/api/auth/me", isLoggedIn, async (req, res, next) => {
  try {
    res.send({ user: req.user, cart: req.cart });
  } catch (err) {
    next(err);
  }
});

//Get users
app.get("/api/users", async (req, res, next) => {
  try {
    res.send(await fetchUsers());
  } catch (err) {
    // error handling
    res.status(500).json({ error: "Failed to load users" });
    next(err);
  }
});

//Get products
app.get("/api/products", async (req, res, next) => {
  try {
    res.send(await fetchProducts());
  } catch (err) {
    // error handling
    res.status(500).json({ error: "Failed to load products" });
    next(err);
  }
});

const init = async () => {
  const PORT = process.env.PORT || 3000;
  await client.connect();
  console.log("connected to database");

  await createTables();
  console.log("tables created");

  await fakeInfo();

  app.listen(PORT, () => console.log(`listening on port ${PORT}`));
};

init();
