const express = require('express');
const app = express();
const databaseConnect = require('./config/database')
const authRouter = require('./routes/authRoute')
const messengerRouter = require('./routes/messengerRoute')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const cors = require('cors')
const path = require('path')

dotenv.config()
app.use(cors({
     origin :process.env.FRONTEND_URL,
     credentials:true,
}));

app.use('/images',express.static(path.join(__dirname,'./store/userImages')))
app.use('/pdfs',express.static(path.join(__dirname,'./store/msgPDFs')))
app.use('/videos',express.static(path.join(__dirname,'./store/msgVideos')))

app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/messenger',authRouter);
app.use('/api/messenger',messengerRouter);



const PORT = process.env.PORT
app.get('/', (req, res)=>{
     res.send('This is from backend Sever')
})

databaseConnect();

app.listen(PORT, ()=>{
     console.log(`Server is running on port ${PORT}`)
})