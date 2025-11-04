const express = require("express")
const dotenv = require("dotenv")
const morgan = require("morgan")
const colors = require("colors")
const bootcamps = require("./routes/bootcamps")
const connectDB = require("./config/db")

const app = express()

dotenv.config({ path: "./config/config.env" })
const { PORT, NODE_ENV } = process.env

connectDB()

app.use("/api/v1/bootcamps", bootcamps)

if (NODE_ENV === "development") {
  app.use(morgan("dev"))
}

const port = PORT || 5000

const server = app.listen(
  port,
  console.log(`server running in ${NODE_ENV} mode on port ${port}`.yellow.bold)
)

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red)
  // Close server & exit process
  // server.close(() => process.exit(1));
})
