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

//App routes
app.use(express.json());
app.use(require("morgan")("dev"));

//For deployment only
const path = require("path");
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
  } catch (ex) {
    next(ex);
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
  } catch (ex) {
    next(ex);
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

/*app.post("/api/notes", async (req, res, next) => {});
app.get("/api/notes", async (req, res, next) => {
  try {
    const SQL = `SELECT * from notes ORDER BY created_at DESC;`;
    const response = await client.query(SQL);
    res.send(response.rows);
  } catch (error) {
    next(error);
  }
});
app.put("/api/notes/:id", async (req, res, next) => {});
app.delete("/api/notes/:id", async (req, res, next) => {});*/

const init = async () => {
  const PORT = process.env.PORT || 3000;
  await client.connect();
  console.log("connected to database");

  await createTables();
  console.log("tables created");

  app.listen(PORT, () => console.log(`listening on port ${PORT}`));
};

init();
