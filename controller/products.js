const Product = require("../models/products")

const getAllProductsStatics = (req, res) => {
    res.status(200).json({ msg: "static routes" })
}

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, fields } = req.query
    const queryObject = {}

    if (featured) {
        queryObject.featured = featured === "true" ? true : false
    }

    if (company) {
        queryObject.company = company
    }

    if (name) {
        queryObject.name = { $regex: name, $options: 'i' }
    }

    let sortList
    if (sort) {
        sortList = sort.split(",").join(" ")
        result = result.sort(sortList)
    }

    let fieldsList

    if (fields) {
        fieldsList = fields.split(",").join(" ")
        result = result.select(fieldsList)
    }

    let result = Product.find(queryObject)

    const product = await result
    res.status(200).json({ product, nbHits: product.length })
}

module.exports = {
    getAllProductsStatics,
    getAllProducts,
}