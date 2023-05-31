import passport from 'passport';
import dotenv from 'dotenv';
import passportGoogle from "passport-google-oauth20";
const GoogleStrategy = passportGoogle.Strategy;

dotenv.config()
const GOOGLE_CLIENT_ID = process.env.CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.CLIENT_SECRET;
const CALLBACK_URL = process.env.CALLBACK_URL;
export const passportMiddleware = () =>{
  passport.serializeUser(function(user, done){
    done(null, user.id);
  });
  
  passport.deserializeUser((user: any, done) => {
    done(null, user);
  });
  
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID || '',
        clientSecret: GOOGLE_CLIENT_SECRET || '',
        callbackURL: CALLBACK_URL,
        userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
      },
      (accessToken, refreshToken, profile, done) => { 
        return done(null, profile);
      }
    )
  );
}
