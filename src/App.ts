import express from "express";
import createHttpError from "http-errors";
import globalErrorHandler from "./middlewares/globalErrorHandler";


const app = express();

app.get("/", (req, resp)=>{
    throw new Error("Somthing went wrong")
    const error = createHttpError(400, "something went wrong")
    throw error;
 resp.json({message: "Welcome to the get api"});
})

app.use(globalErrorHandler);
export default app;