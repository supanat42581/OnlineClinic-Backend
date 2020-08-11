const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const db = require("../models");

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
};

const jwtStrategy = new Strategy(options, async (payload /*payloadมาจากtoken ที่ส่งมา*/, done) => {
    const targetUser = await db.User.findOne({ where: { id: payload.id } });

    if (targetUser) {
        done(null, targetUser);
    } else {
        done(null, false);
    }
});

passport.use("jwt", jwtStrategy);