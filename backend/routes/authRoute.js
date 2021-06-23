const router = require("express").Router();
const authService = require("../services/authService");
router.post("/login", async (req, res) => {
  if (Object.keys(req.body).length) {
    const response = await authService.loginAPI(req.body);
    if (Array.isArray(response)) {
      if (response.length) {
        res.status(200).send();
      }
    } else {
      res.status(401).send();
    }
  } else {
    res.status(401).send();
  }
});
module.exports = router;
