var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser=require('body-parser');

const indexRouter = require('./routes/index');
const createUserRouter=require('./routes/admin');
const loginRouter=require('./routes/login');
const articlesRouter=require("./routes/article");
const articleCommentRouter=require("./routes/articleComment");
const gifRouter=require("./routes/gif");
const gifCommentRouter=require('./routes/gifComment');
const feedRouter=require('./routes/feed');




const database=require('./controllers/database');

const app = express();
//database.Pool.query("Select * from articles").then(result=>console.log(result)).catch(err=>console.log(err));
app.use((req,res,next)=>
{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader("Access-Control-Allow-Headers",'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(bodyParser.json());
app.use('/images',express.static(path.join(__dirname,'images')));
app.use('/', indexRouter);
app.use("/",createUserRouter);
app.use('/',loginRouter);
app.use("/api/v1/articles/",articlesRouter);
app.use("/",articleCommentRouter);
app.use("/api/v1/gifs/",gifRouter);
app.use('/',gifCommentRouter);
app.use('/',feedRouter);

module.exports = app;
