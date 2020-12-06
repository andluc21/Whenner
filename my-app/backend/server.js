const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const googleStrategy = require("passport-google-oauth2").Strategy;
const connectDB = require("./config/db");
const moment = require("moment");
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session');


app.use(cookieSession({

  name: 'test-session',
  keys: ['123']

}));

app.use(cookieParser());

const User = require("./models/userModel.js");
const Event = require("./models/events.js");

const eventsRouter = require("./routes/events");

passport.use(
  new googleStrategy(
    {
      clientID:
        "595886705037-j5ege0ds1g75a9jmpa1c3v5gl8ti6pcp.apps.googleusercontent.com",
      clientSecret: "N8EiMoY-67sDC5KPHwVamdjm",
      callbackURL: "http://localhost:8080/auth/google/callback",
      passReqToCallback: true,
    },
    async (req, currentToken, refreshToken, profile, done) => {
      //console.log(profile);
      // do something create or login?
      User.findOne(
        {
          googleId: profile.id,
          email: profile.email,
        },
        function (error, user) {
          //console.log(done);
          if (!user) {
            User.create(
              {
                googleId: profile.id,
                email: profile.email,
              },
              (user) => {
                done(false, user);
              }
            );
          } else {
            console.log("user exists")
            return done(false, {
              profile: user,
              refreshToken: refreshToken,
              currentToken: currentToken
            });
          }

          // return done(error, profile);
        }
      );

      // const user = {test:'yes'} // mongo-user
      // console.log(profile);
    }
  )
);

//http://localhost:8080/auth/example

passport.serializeUser((user, done) => {
  done(false, user);
});
passport.deserializeUser((user, done) => {
  done(false, user);
});

require("dotenv").config();

const port = process.env.PORT || 8080;

connectDB();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

app.use("/events", eventsRouter);

app.get("/failed", (req, res) => res.send("Youfail"));
app.get("/good", isLoggedIn, (req, res) =>
  res.send(`Welcome ${req.user.displayName}!`)
);

app.get(
  "/auth/example",
  passport.authenticate("google", { scope: ["profile", "email"] }, (req, res) => {
    console.log(res)
    res.send("TEST")
  })
);

/*
{
    failureRedirect: "/failed",
    successRedirect: "http://localhost:3000/calendar",
  }
*/
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failed",}), (req, res) => {
      console.log("Manual redirect")
      console.log(req.user)
    req.session.token = req.user.currentToken;
    res.cookie('token', req.session.token);
    res.redirect('http://localhost:3000/calendar');
}
);

app.post("/api/login", (req, res) => {
  // check if user exists => create or not
  User.find({ email: req.body });

  // create session

  // return usermodel
  res.json({ token: "test" });
});

app.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  req.redirect("/");
});

app.post("/updateEvent", (req, res) => {
  // fake user
  //console.log(req.cookies)
  console.log(req.session.token)
  let testDate = moment(req.body.StartTime);
  // console.log(testDate)
  //console.log(testDate.toDate());
  let { Subject, Location, StartTime, EndTime } = req.body;
  Event.create(
    {
      Subject: Subject,
      Location: Location,
      StartTime: moment(StartTime).toDate(),
      EndTime: moment(EndTime).toDate(),
    }
    // { userName: 'anonymous' }
  ).then((event) => {
    //console.log(event);
    event.update(req.body);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
