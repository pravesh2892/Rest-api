import  express  from "express";

const app = express();

app.get("/", (req, resp)=>{
 resp.json({message: "Welcome to the get api"});
})

export default app;