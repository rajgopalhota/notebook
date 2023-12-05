const express = require("express")
const mongo = require('./middlewares/mongod')
const cors = require('cors')
const app = express();

mongo();
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", require("./routes/auth"));

app.listen(5000, ()=>{
    console.log("Server running on port 5000");
})