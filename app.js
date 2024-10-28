require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
require("./db/conn");
const router = require("./Routes/router");


app.use(cors());
app.use(express.json());

app.use(router)


app.listen(process.env.PORT,()=>{
    console.log('server started ');
});