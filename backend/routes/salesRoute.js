const router = require("express").Router();
const DBmanager = require("../manager/DBmanager");
const saleServie = require("../services/saleService");
router.post("/addSale", async (req, res) => {
  console.log(req.body);
  if (Object.keys(req.body).length) {
    const response = await saleServie.addSaleAPI(req.body);
    console.log(response);
    if (response === true) {
      res.json(201).send();
    } else {
      res.status(204).send();
    }
  } else {
    res.status(204).send();
  }
});
router.post("/currentSales", async (req, res) => {
  console.log(req.body);
  if (Object.keys(req.body).length) {
    const response = await saleServie.getCurrentSales(req.body);
    console.log(response);
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(204).send();
    }
  } else {
    res.status(204).send();
  }
  // res.status(200).send()
});
router.post("/filter", async (req, res) => {
  console.log(req.body);
  if (
    req.body.name ||
    req.body.fishType ||
    req.body.payComp ||
    req.body.payType
  ) {
    const response = await saleServie.getFilteredSales(req.body);
    if (response) {
      res.status(200).json({ response, status: true });
    } else {
      res.status(200).json({ response, status: false });
    }
  } else {
    if (req.body.tankID) {
      const response = await DBmanager.getById(req.body.tankID);
      res.status(201).json(response);
    } else {
      res.status(204).send();
    }
  }
});
module.exports = router;
