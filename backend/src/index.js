import dotenv from 'dotenv'
import {app} from './app.js'
import connectDB from './db/index.js'



dotenv.config()

connectDB()
.then(() => {
    app.on("error", (error) => {
        console.log("connection error",error)
    })

    const PORT = process.env.PORT || 8000

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
})
.catch((error) => {
    console.log("Mongo db connection error!!!" , error)
})