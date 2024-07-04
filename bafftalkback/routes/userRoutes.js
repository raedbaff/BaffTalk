const express = require("express");
const router = express.Router();
const passport = require("passport");
const isLoggedIn = require("../utils/userExistsMiddleware");
const { getUserInfo } = require("../controllers/UserController");

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/error",
    successRedirect: "http://localhost:3000",
  }),
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

module.exports = router;
