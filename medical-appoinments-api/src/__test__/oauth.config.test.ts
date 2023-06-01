import { passportMiddleware } from '../config/auth.config';
import passport from 'passport';
import dotenv from 'dotenv';
import passportGoogle from 'passport-google-oauth20';

dotenv.config();

describe('passportMiddleware', () => {
  it('should configure passport with GoogleStrategy', () => {
    const serializeUserMock = jest.fn();
    const deserializeUserMock = jest.fn();
    const useMock = jest.fn();

    passport.serializeUser = serializeUserMock;
    passport.deserializeUser = deserializeUserMock;
    passport.use = useMock;

    passportMiddleware();

    expect(serializeUserMock).toHaveBeenCalledTimes(1);
    expect(deserializeUserMock).toHaveBeenCalledTimes(1);
    expect(useMock).toHaveBeenCalledTimes(1);
    expect(useMock).toHaveBeenCalledWith(
      new passportGoogle.Strategy(
        {
          clientID: process.env.CLIENT_ID as string,
          clientSecret: process.env.CLIENT_SECRET as string,
          callbackURL: process.env.CALLBACK_URL as string,
          userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
        },
        expect.any(Function)
      )
    );
  });
});

