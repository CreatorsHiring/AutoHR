const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const bcrypt = require("bcrypt");

const User = require("./models/User");
const jobsRouter = require("./routes/jobs");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(
    session({
        secret: process.env.SESSION_SECRET || "dev_secret_change_me",
        resave: false,
        saveUninitialized: false,
        cookie: { httpOnly: true },
    })
);
app.use(jobsRouter);

main().then(() =>{
    console.log("Connected to MongoDB");
}).catch((err) =>{
    console.log(err);
})

const Resume = require("./models/Resume");

app.get("/confirm", async (req, res) => {
  try {
    const { resumeId, slot } = req.query;

    if (!resumeId || !slot) {
      return res.send("Invalid confirmation link");
    }

    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.send("Resume not found");
    }

    const slotIndex = parseInt(slot) - 1;

    if (!resume.availableSlots || !resume.availableSlots[slotIndex]) {
    return res.render("confirm-error", {
        message: "Selected time slot is invalid or expired.",
    });
    }

    const selectedSlot = resume.availableSlots[slotIndex];

    if (!selectedSlot) {
      return res.send("Invalid slot");
    }

    resume.selectedSlot = selectedSlot;
    await resume.save();

    res.send(`Interview confirmed for ${selectedSlot}`);

  } catch (err) {
    console.log(err);
    res.send("Something went wrong");
  }
});

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/AutoHR");
}

function isLoggedIn(req, res, next) {
    if (!req.session.userId) {
        return res.redirect("/login");
    }
    next();
}

app.get("/", (req, res)=> {
    res.redirect("/landing");
});

app.get("/landing", (req, res)=> {
    res.render("landing");
});

app.get("/register", async (req, res) => {
    res.render("register", { error: null, form: { name: "", email: "" } });
});

app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).render("register", {
                error: "All fields are required.",
                form: { name: name || "", email: email || "" },
            });
        }

        const normalizedEmail = String(email).toLowerCase().trim();
        const existing = await User.findOne({ email: normalizedEmail });
        if (existing) {
            return res.status(409).render("register", {
                error: "An account with that email already exists. Please log in.",
                form: { name: String(name || "").trim(), email: normalizedEmail },
            });
        }

        const hashedPassword = await bcrypt.hash(String(password), 12);

        const user = new User({
            name: String(name).trim(),
            email: normalizedEmail,
            password: hashedPassword,
        });

        await user.save();
        return res.redirect("/login");
    } catch (err) {
        return res.status(500).render("register", {
            error: "Something went wrong. Please try again.",
            form: { name: req.body?.name || "", email: req.body?.email || "" },
        });
    }
});

app.get("/login", async (req, res) => {
    res.render("login", { error: null, form: { email: "" } });
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).render("login", {
                error: "Email and password are required.",
                form: { email: email || "" },
            });
        }

        const normalizedEmail = String(email).toLowerCase().trim();
        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            return res.status(401).render("login", {
                error: "Invalid email or password.",
                form: { email: normalizedEmail },
            });
        }

        const ok = await bcrypt.compare(String(password), user.password);
        if (!ok) {
            return res.status(401).render("login", {
                error: "Invalid email or password.",
                form: { email: normalizedEmail },
            });
        }

        req.session.userId = user._id.toString();
        return res.redirect("/jobs");
    } catch (err) {
        return res.status(500).render("login", {
            error: "Something went wrong. Please try again.",
            form: { email: req.body?.email || "" },
        });
    }
});

app.get("/logout", async (req, res, next) => {
    try {
        req.session.destroy((err) => {
            if (err) return next(err);
            return res.redirect("/landing");
        });
    } catch (err) {
        return next(err);
    }
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
}); 