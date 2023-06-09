const express = require("express")
const router = express.Router()
const { getAllProductsStatics, getAllProducts} = require("../controller/products")

router.route("/").get(getAllProducts)
router.route("/statics").get(getAllProductsStatics)

module.exports = router