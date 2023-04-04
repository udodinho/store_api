require('dotenv').config()
require("express-async-errors")
const express = require("express")
const app = express()
const notFound = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")
const connectDB = require("./db/connectdb")
const productRouter = require("./routes/product")

// Middleware
app.use(express.json())

app.get('/', (req, res) => {
    return res.send('<h1>Store API</h1><a href="/api/vi/products">products route</a>')
})

app.use("/api/v1/products", productRouter)
app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.port || 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port: ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start()
