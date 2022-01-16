import express from "express";
import path from "path";
import ejs from "ejs";
import multer from "multer";
const upload = multer({ dest: "public/uploads" });
import { Pool, Client } from "pg";
import { fileURLToPath } from "url";

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "20070712",
  database: "postgres",
  port: 5432,
  max: 20,
  // connectionTimeoutMillis: 0,
  // idleTimeoutMillis: 0
});

const ROOT_DIR = path.join(__dirname, "..");
const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use("/css", express.static(path.join(ROOT_DIR, "/public/css")));
app.use("/images", express.static(path.join(ROOT_DIR, "/public/images")));
app.use("/js", express.static(path.join(ROOT_DIR, "/public/js")));
app.use("/uploads", express.static(path.join(ROOT_DIR, "/public/uploads")));

app.get("/", (req, res) => {
  pool
    .query(`SELECT * FROM products`)
    .then((results) => res.render("pages/home", { products: results.rows }))
    .catch((err) => {
      throw err;
    });
});

app.get("/product/:productId", (req, res) => {
  const id = req.params.productId;
  pool
    .query(`SELECT * FROM products WHERE id=${id};`)
    .then((results) =>
      res.render("pages/product", {
        id: results.rows[0].id,
        name: results.rows[0].name,
        description: results.rows[0].description,
        price: results.rows[0].price,
        rating: results.rows[0].rating,
        images: results.rows[0].images,
      })
    )
    .catch((err) => {
      throw err;
    });
});
app.get("/review/:productId", (req, res) => {
  const id = req.params.productId;
  pool
    .query(`SELECT * FROM products WHERE id=${id};`)
    .then((results) =>
      res.render("pages/review", {
        id: results.rows[0].id,
        name: results.rows[0].name,
        images: results.rows[0].images
      })
    )
    .catch((err) => {
      throw err;
    });
});

app.post("/review/:productId", upload.array('photos', 5), (req, res) => {
  const { rating,description, title, id } = req.body;
  const photos = req.files as any[];
  const filenames = [];
  photos.forEach(photo => filenames.push(photo.filename));
  if (!rating) {
    res.render("pages/review", {
      reviewDescription: description,
      reviewTitle: title,
    });
  }
  else {
    pool
      .query(
        `INSERT INTO reviews (rating, review, title, images, product_id) VALUES(${rating}, '${description}', '${title}, '{${filenames}}, ${id}');`
      )
      .then((results) => res.redirect("/"))
      .catch((err) => res.render("pages/sign-up"));
  }
})

app.get("/sign-in", (req, res) => {
  res.render("pages/sign-in");
});

app.post("/sign-in", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password);
  res.redirect("/");
});

app.get("/forgot-password", (req, res) => {
  res.render("pages/forgot-password");
});

app.get("/sign-up", (req, res) => {
  res.render("pages/sign-up");
});

app.post("/sign-up", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  console.log(email, password);
  if (password !== confirmPassword) {
    res.render("pages/sign-up");
    console.log("INVALID PASSWORD!");
  } else {
    pool
      .query(`INSERT INTO users VALUES('${email}', '${password}')`)
      .then((results) => res.redirect("/"))
      .catch((err) => res.render("pages/sign-up"));
  }
});
app.get("/shopping-cart", (req, res) => {
  res.render("pages/cart");
});

app.get("/product-category", (req, res) => {
  res.render("pages/product-category");
});
app.get("/create-product", (req, res) => {
  res.render("pages/create-product", {
    name: "",
    description: "",
    price: "",
    showAlert: false,
  });
});
app.post(
  "/create-product",
  upload.fields([
    { name: "main-image", maxCount: 1 },
    { name: "secondary-images", maxCount: 5 },
  ]),

  (req, res) => {
    const { name, description, price } = req.body;
    const photos = req.files as any[];
    const mainImage = photos["main-image"].map((photo) => photo.filename);
    const secondaryImages = photos["secondary-images"].map(
      (photo) => photo.filename
    );
    console.log({ mainImage, secondaryImages });
    if (!name || !description || !price || !photos) {
      res.render("pages/create-product", {
        name: name || "",
        description: description || "",
        price: price || "",
        showAlert: true,
      });
    } else {
      pool
        .query(
          `INSERT INTO products(name, description, price, images) VALUES('${name}', '${description}', ${price}, '{${mainImage}}');`
        )
        .then((results) => res.redirect("/"))
        .catch((err) => console.error(err));
    }
  }
);
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render("pages/404", { error: err });
});

app.listen(port, () => {
  console.log(`Running server on port: ${port}.`);
});
