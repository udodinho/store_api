const Product = require("../models/products")

const getAllProductsStatics = (req, res) => {
    res.status(200).json({ msg: "static routes" })
}

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, fields, numericFilters } = req.query
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

    if (numericFilters) {
        const operatorMap = {
            ">": "$gt",
            ">=": "$gte",
            "=": "$eq",
            "<": "$lt",
            "<=": "$lte",
        }

        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let filters = numericFilters.replace(regEx,
            (match) => `-${operatorMap[match]}-`)

        const options = ['price', 'rating']
        filters = filters.split(",").forEach((item) => {
            const [fields, operator, value] = item.split("-")
            if (options.includes(fields)) {
                queryObject[fields] = { [operator]: Number(value) }
            }
        });
    }

    let result = Product.find(queryObject)

    const product = await result
    res.status(200).json({ product, nbHits: product.length })
}

module.exports = {
    getAllProductsStatics,
    getAllProducts,
}