const router = require("express").Router();
const assignCart = require("../utils/assignCart");
module.exports = function(passport) {
  // auth with google+
  router.get(
    "/google",
    passport.authenticate("google", {
      scope: [
        "https://www.googleapis.com/auth/plus.login",
        "https://www.googleapis.com/auth/userinfo.email"
      ],
      display: "popup"
    })
  );

  // callback route for google to redirect to
  // hand control to passport to use code to grab profile info
  router.get(
    "/google/redirect",
    passport.authenticate("google", {
      failureRedirect: "/login"
    }),
    function(req, res) {
      // Successful authentication, redirect home.
      assignCart(req.user, req.session);
      return res.redirect("/");
    }
  );

  //facebook login
  router.get(
    "/facebook",
    passport.authenticate("facebook", {
      scope: ["email"]
    })
  );

  router.get(
    "/facebook/redirect",
    passport.authenticate("facebook"),
    (req, res) => {
      // Successful authentication, redirect home.
      //assignCart(req.user, req.session);
      res.redirect("/");
    }
  );
  // router.get(
  //   "/local",
  //   passport.authenticate("local", {
  //     successRedirect: "/profile",
  //     failureRedirect: "/login"
  //   })
  // );

  router.get("/local", function(req, res, next) {
    passport.authenticate("local", function(err, user, info) {
      if (err) {
        return res.send({ message: `${err.message}` });
      }
      // Generate a JSON response reflecting authentication status
      if (info) {
        return res.send(info);
      }
      req.login(user, (loginErr) => {
        if (loginErr) {
          return next(loginErr);
        }
        assignCart(req.user, req.session);
        //  return res.redirect("/profile");
        return res.send(req.user);
      });
    })(req, res, next);
  });

  // auth logout
  router.get("/logout", (req, res) => {
    req.logout();
    req.session = null; //with unset:"destroy this resets the cart from the session"
    //res.redirect("http://localhost:3000/");
    res.sendStatus(200);
  });
  return router;
};
