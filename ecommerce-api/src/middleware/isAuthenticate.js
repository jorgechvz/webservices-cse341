const isAuthenticated = (req, res, next) => {
  if (req.session.user === undefined) {
    return res.status(404).send("You don't have access");
  } 
  next();
};


module.exports = {
    isAuthenticated
}