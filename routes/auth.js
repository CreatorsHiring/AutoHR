const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();

router.get("/register", async (req, res) => {
  res.render("register", { error: null, form: { name: "", email: "" } });
});

router.post("/register", async (req, res) => {
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
        form: { name: name || "", email: normalizedEmail },
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

router.get("/login", async (req, res) => {
  res.render("login", { error: null, form: { email: "" } });
});

router.post("/login", async (req, res) => {
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

router.get("/logout", async (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) return next(err);
      return res.redirect("/");
    });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
