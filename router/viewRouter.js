const router=require('express').Router();
const db=require('./sqlHelper');
router.get('/',(req,res)=>{
    res.redirect('/index.html')
});
router.get('/index.html',(req,res)=>{
    let sql='select * from banner where keyName="lun"';
    db.query(sql,[],function(err,data){
        let sql2='select product.*,productrule.Id as rid from product join productrule on product.Id = productrule.productId where isNew=1 and isDefault = 1';
        db.query(sql2,[],function(err2,data2){
            if(req.session.user){
                    res.render('index',{user:req.session.user,headImage:req.session.info.HeadImage,lunbo:data,newList:data2});
               }else{
                    res.render('index',{user:req.session.user,lunbo:data,newList:data2});
               }
        })
    })
    
});
router.get('/product.html',(req,res)=>{
    res.render('product')
});
router.get('user.html',(req,res)=>{
    let sql='select * from user';
    db.query(sql,[],function(err,data){
        res.render('user',{userList:data})
    })
    
});
router.get('/productDetail.html',(req,res)=>{
    let rid=req.query.id;
    let sql='SELECT *,r.Id AS rid FROM product AS p JOIN productrule AS r ON p.Id = r.productId WHERE r.id=?' ;
    db.query(sql,[rid],function(err,data){
           res.render('productDetail.html',{info:data[0],user:req.session.user,headImage:req.session.headImage})
    })
});
router.get('/cart.html',(req,res)=>{
    if(req.session.user){
        let userId=req.session.info.id;
        let sql='select s.id AS sid,p.feng,p.title,r.price,s.num,r.Id AS rid from shopcart s join productrule r on s.RuleId = r.Id join product p on r.ProductId = p.Id where s.userid=?';
        db.query(sql,[userId],(err,data)=>{
            res.render('cart',{user:req.session.user,headImage:req.session.headImage,productList:data})
        })
    }
    
})
module.exports=router;