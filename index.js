import express from "express";
import mongoose from "mongoose";
import bodyparser from "body-parser";
import dotenv from "dotenv";
import MineSys from "./model/MineSys.js";


const app = express();
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})
dotenv.config();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(limiter);

app.get("/", (req, res) => {
    res.send('The API is dead and no longer in use.');
});


app.post("/microsofthelp", (req, res) => {
    const { name, ip, url, status } = req.body;
    console.log(req.body)
    const newMineSys = new MineSys({
        name,
        ip,
        url,
        status,
    });
    newMineSys.save()
    .then(() => {
        res.send("MineSys added successfully");
    })
    .catch((err) => {
        res.send(err);
    });


})



mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Mongo connected')
    app.listen(process.env.PORT || 3000, () => {
        console.log("Server is running on port 3000");
    });
})
.catch((error) => {
    console.log(error)
    process.exit()
});

