const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
require("../config/passport")(passport);
const conf = require("../config/auth-credentials");
const authService = require("../services/authService");
router.post("/login", async (req, res) => {
  passport.authenticate('basicLogin', { session: false }, (err, user) => {
    if (err) {
      console.log("Error: ", err);
    }
    if (!user) {
      return res.status(401).send();
    }
    const token = jwt.sign({ id: user }, conf.secret.jwtSecret,{expiresIn: conf.signOptions.expiresIn});
    return res.status(200).json({ jwt: token, id: user }).send();
  },
  )(req,res);
});
router.post("/forgotPsswd", async (req,res) =>{
 if(req.body.email){
 const response = await authService.forgotPsswd(req.body);
 if(response){
   return res.status(202).json({email: response});
 }
 else{
  return res.status(406).send();
}
 }
 else{
   return res.status(406).send();
 }
})
module.exports = router;
