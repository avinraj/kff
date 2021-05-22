const router = require('express').Router();
router.post("/addSale",(req,res) =>{
    console.log(req.body)
    res.json(req.body)
})
module.exports = router;