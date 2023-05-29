const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");

require("./db/conn.js");
const User = require("./models/User.js");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.post("/signup", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const confirmPassword = req.body.confirmpassword;

        if (password === confirmPassword) {

            const userData = new User({
                email: email,
                password: password,
                confirmPassword: confirmPassword
            })

            const signedUp = await userData.save();
            // res.status(201).render(index);

            // Perform signup logic here
            res.send("Signup successful!");
        } else {
            res.send("Passwords do not match.");
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get("/login", (req, res) => {
    res.render("login");
});

// app.post("/login", async (req, res) => {
//     try {
//         const email = req.body.email;
//         const password = req.body.password;

//         // Perform login logic here
//         res.send("Login successful!");
//     } catch (error) {
//         res.status(400).send(error);
//     }
// });

app.post('/login', async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password

        const user_email = await User.findOne({ email: email });
        if (user_email.password === password) {
            res.send("login successful")
            // res.status(201).render("dashboard")
        }
        else {
            res.send("password is not matching with database")
        }
    }
    catch (err) {
        res.status(400).send("invalid email")
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
