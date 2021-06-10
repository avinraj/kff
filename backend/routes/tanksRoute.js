const router = require("express").Router();
const tankService = require("../services/tankService");
router.get("/", async (req, res) => {
  const response = await tankService.getTanks();
  if (response) {
    res.status(200).json(response);
  } else {
    res.status(204).send();
  }
});
router.post("/", async (req, res) => {
  if (req.body.tankNo && req.body.mmyy) {
    const response = await tankService.checkTank(req.body);
    if (response === false) {
      const resp = await tankService.addTank(req.body);
      if (resp.length) {
        res.status(200).json({ data: resp});
      } else {
        res.status(200).json({ data: false });
      }
    } else {
      res.status(200).json({ data: false });
    }
  } else {
    res.status(204).send();
  }
});
module.exports = router;
