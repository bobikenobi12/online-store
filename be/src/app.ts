import express from "express";
import path from "path";
import ejs from "ejs";

const ROOT_DIR = path.join(__dirname, "..");
const app = express();
const port =  3000;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use("/css", express.static(path.join(ROOT_DIR, "/public/css")));
app.use("/images", express.static(path.join(ROOT_DIR, "/public/images")));
app.use('/js', express.static(path.join(ROOT_DIR, "/public/js")));

app.get("/", (req, res) => {
  res.render("pages/home");
});

app.get('/product', (req, res) => {
  res.render('pages/product');
});

app.get('/review', (req, res) => {
  res.render('pages/review');
});

app.get("/sign-in", (req, res) => {
  res.render('sign-in');
});

app.post("/sign-in", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password);
  res.redirect("/");
});

app.get("/forgot-password", (req, res) => {
  res.render('forgot-password');
});

app.get("/sign-up", (req, res) => {
  res.render('sign-up');
});

app.post("/sign-up", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  // if(password!=confirmPassword) {

  // }
  console.log(email, password);
  res.redirect("/");
  }
});

app.get('/shopping-cart', (req, res) => {
  res.render('pages/cart');
})

app.get('/product-category', (req, res) => {
  res.render('pages/product-category');
})
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('pages/404', { error: err });
});

app.listen(port, () => {
  console.log(`Running server on port: ${port}.`);
});
