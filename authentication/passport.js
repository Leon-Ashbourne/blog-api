const passport = require('passport');
const { getUserLogin } = require('../models/script');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
require('dotenv/config');

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretKey = process.env.SECRET_KEY;

passport.use(new JwtStrategy(
    options,
    async (payload, done) => {
        const { data, error } = await getUserLogin(payload);

        if(error) return done(error, false)
        else if(data) return done(null, data)
        else return done(null, flase);

    }
))

module.exports = passport;