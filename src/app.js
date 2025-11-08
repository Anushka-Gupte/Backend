import express from "express" 
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true,limit: "16kb"}))
app.use(express.static("public"))

app.use(cookieParser())


//import routes
import userRouter from './routes/user.routes.js'

//routes declaration
app.use("/api/v1/users",userRouter)

// Example Global Error Handler (near the end of your app.js/server file)
app.use((err, req, res, next) => {
    // Log the FULL error for debugging
    console.error("--- GLOBAL ERROR CAUGHT ---");
    console.error(err);
    console.error("---------------------------");

    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    
    // Respond with the actual error details
    res.status(statusCode).json({
        success: false,
        message: message,
        errors: err.errors || []
    });
});

export {app}