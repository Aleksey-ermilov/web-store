require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const path = require('path')

const router = require('./routes')
const errorHandler = require('./middleware/ErrorHandlerMiddleware')

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname,'static')))
app.use(fileUpload({}))

app.use('/api', router)


app.use(errorHandler)

async function startApp() {
    try{
        await mongoose.connect(process.env.dbUrl, { useUnifiedTopology: true,  useNewUrlParser: true})
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    }catch (e)
    {
        console.log(e)
    }
}

startApp()