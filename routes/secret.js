const express = require("express");
const router = express.Router();
const Room = require("../models/Room");

const loginCheck = () => {
  return (req, res, next) => {
    if (req.isAuthenticated()) next();
    else res.redirect("/login");
  };
};

router.use(loginCheck());

router.get("/secret", loginCheck, (req, res) => {
  res.render("secret");
});

router.get("/profile", (req, res) => {
  Room.find({ owner: req.user._id }).then(rooms => {
    res.render("protected/profile", { user: req.user, rooms });
  });
});

router.get("/rooms", (req, res, next) => {
  Room.find()
    .then(rooms => {
      res.render("protected/rooms", { rooms });
    })
    .catch(err => {
      // console.log(err)
      next(err);
    });
});

router.get("/rooms/:roomId", (req, res, next) => {
  Room.findById(req.params.roomId)
    .then(room => {
      res.render("protected/room", { room });
    })
    .catch(err => {
      next(err);
    });
});

const checksRole = role => {
  return (req, res, next) => {
    if (req.user.role === role) {
      next();
    } else {
      res.redirect("/protected/rooms");
    }
  };
};

router.get(
  "/rooms/:roomId/delete",

  checksRole("moderator"),

  (req, res, next) => {
    const roomId = req.params.roomId;

    Room.deleteOne({ _id: roomId })
      .then(data => {
        res.redirect("/protected/rooms");
      })
      .catch(err => {
        next(err);
      });
  }
);

router.post("/rooms", (req, res, next) => {
  const { name, price, description } = req.body;

  console.log(req.user);

  Room.create({
    name,
    price,
    description,
    owner: req.user._id
  })
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      next(err);
    });
});

/*
  router.get("/secret", (req, res) => {
    if (req.session.user) {
      res.render("secret");
    } else {
      res.redirect("/login");
    }
  });
  */

module.exports = router;