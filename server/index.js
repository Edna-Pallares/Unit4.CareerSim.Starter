//imports
const {
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
} = require("./db");

const { dummyData } = require("./info");
const express = require("express");
const app = express();
const cors = require("cors");


app.use(express.json());
app.use(require("morgan")("dev"));
app.use(cors());

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
    const { user, cartedProducts } = await findUserWithToken(req.headers.authorization);
    req.user = user;
    req.cartedProducts = cartedProducts;
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
    res.send({ user: req.user, cartedProducts: req.cartedProducts });
  } catch (err) {
    next(err);
  }
});

//Get users
app.get("/api/users", async (req, res, next) => {
  try {
    res.send(await fetchUser());
  } catch (err) {
    // error handling
    res.status(500).json({ error: "Failed to load users" });
    next(err);
  }
});

//Get all products
app.get("/api/products", async (req, res, next) => {
  try {
    res.send(await fetchProducts());
  } catch (err) {
    // error handling
    res.status(500).json({ error: "Failed to load products" });
    next(err);
  }
});

//Get single product
app.get("/api/products/:id", async (req, res, next) => {
    try {
        const SQL =`
        SELECT * from products
        WHERE id=$1;
        `;
        const result = await client.query(SQL, [req.params.id]);
        res.send(result.rows);
    } catch (err) {
        res.status(500).json({ error: "Failed to load product" });
        next(err);
    }
});

//Get carted_products
app.get("/api/users/:id/carted_products", isLoggedIn, async (req, res, next) => {
    try {
      if (req.params.id !== req.user.id) {
        const error = Error("not authorized");
        error.status = 401;
        throw error;
      }
      const cartItems = await fetchCartedProducts(req.params.id);
      res.send(cartItems);
    } catch (err) {
      next(err);
    }
  });

//Update carted_products
app.post("/api/users/:id/carted_products", isLoggedIn, async (req, res, next) => {
    try {
      if (req.params.id !== req.user.id) {
        const error = Error("not authorized");
        error.status = 401;
        throw error;
      }
      res.status(201).send(
        await createCartedProducts({
          user_id: req.params.id,
          product_id: req.body.product_id,
          quantity: req.body.quantity,
        })
      );
    } catch (err) {
      next(err);
    }
  });

//Delete single carted product
app.delete(
    "/api/users/:user_id/carted_products/:id",
    isLoggedIn,
    async (req,res, next) => {
        try {
            if (req.params.user_id !== req.user.id) {
                const error = Error("unable to proceed");
                error.status = 401;
                throw error;
            }
            await deleteCartedProduct({ user_id: req.params.user_id, id: req.params.id });
            res.sendStatus(204);
        } catch (err) {
            next (err);
        }
    }
);

//Delete all carted_products
app.delete(
    "/api/users/:user_id/carted_products",
    isLoggedIn,
    async (req,res, next) => {
        try {
            if (req.params.user_id !== req.user.id) {
                const error = Error("unable to proceed");
                error.status = 401;
                throw error;
            }
            await deleteCart({ user_id: req.params.user_id, id: req.params.id });
            res.sendStatus(204);
        } catch (err) {
            next (err);
        }
    }
);

const init = async () => {
  const PORT = process.env.PORT || 3000;
  await client.connect();
  console.log("connected to database");

  await createTables();
  console.log("tables created");

  await dummyData();

  app.listen(PORT, () => console.log(`listening on port ${PORT}`));
};

init();
