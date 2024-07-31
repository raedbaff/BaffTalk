const express = require("express");
const router = express.Router();
const passport = require("passport");
const isLoggedIn = require("../utils/userExistsMiddleware");
const {
  getUserInfo,
  getAllUsers,
  RegisterUser,
  RegisterAdmin,
} = require("../controllers/UserController");

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get("/users", getAllUsers);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/error",
    successRedirect: "http://localhost:3000",
  })
);
router.get("/user/:id", getUserInfo);
router.get("/error", (req, res) => {
  res.status(500).json({ error: "something went wrong" });
});
router.get("/user", isLoggedIn, (req, res) => {
  res.status(200).json({ session: req.session, user: req.user });
});
router.get("/success", isLoggedIn, (req, res) => {
  res.status(200).json({ session: req.session });
});

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("http://localhost:3000");
  });
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(404).json(info);
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ user: req.user, session: req.session });
    });
  })(req, res, next);
});

router.post("/register", RegisterUser);
router.post("/admin/register", RegisterAdmin);

module.exports = router;
