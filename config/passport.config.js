import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import mongoose from "mongoose";
import { keys } from "./keys.config.js";

const Teacher = mongoose.model("teacher");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

const passportFun = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      Teacher.findById(jwt_payload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => console.log(err));
    })
  );
};

export default passportFun;
