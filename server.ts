import app from './src/App'
import { config } from "./src/config/config";
import connectDb from './src/config/db';

const startServer = async()=>{
    await connectDb();
    const port = config.port || 3000;

    app.listen(port, ()=>{
        console.log(`Listining on port: ${port}`);
    })
}

startServer();