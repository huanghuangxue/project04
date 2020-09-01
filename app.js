const myexpress= require ('express');
const favicon=require('serve-favicon');
const logger=require('morgan');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const session=require('express-session');
const userRouter=require("./router/userRouter");
const viewRouter=require('./router/viewRouter');
const productRouter=require('./router/productRouter');
var ejs=require('ejs');
const app=myexpress();
//配置
app.use(logger('dev'));
//定义ejs模板引擎和模板文件位置，也可以使用jade或其他模型引擎
app.set('views',__dirname+'/view');
app.engine('html',ejs.__express);
app.set('view engine','html');
//bodyparser的配置
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
//定义cookie解析器
app.use(cookieParser());
app.use(session({
    secret:'12345',
    name:'testapp',
    cookie:{maxAge:800000},
    rolling:true, //更新生效时间
    resave:true
}));
// app.use('/index.html',(req,res)=>{
//     if(req.session.user){
//         res.render('index',{user:req.session.user,headImage:req.session.info.HeadImage});
//     }else{
//         res.render('index',{user:req.session.user})
//     }
    
// });

app.use(userRouter);
app.use(viewRouter);
app.use(productRouter)
app.use(myexpress.static(__dirname+'/public'));
app.use(favicon(__dirname+'/public/favicon.ico'));

app.listen(9876);
console.log('服务启动');