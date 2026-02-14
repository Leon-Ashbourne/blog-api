const passport = require('passport');
const { getUserLogin } = require('../models/script');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
require('dotenv/config');

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.SECRET_KEY;

passport.use(new JwtStrategy(
    options,
    async (payload, done) => {
        const credentials = { id: payload.id, username: payload.username };
        const { data, error } = await getUserLogin(credentials);

        if(error) return done(error, false)
        else if(data) return done(null, data)
        else return done(null, flase);

    }
))

module.exports = passport;