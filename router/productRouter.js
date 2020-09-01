const router=require('express').Router();
const db=require('./sqlHelper')

router.post('/shopcart',(req,res)=>{
    var rid=req.body.rid;
    if(req.session.user){
        let userId=req.session.info.id;
        let sql2='select * from shopcart where UserID=? AND ruleId=?';
        db.query(sql2,[userId,rid],(err2,data2)=>{
            if(err2){
                console.log(err2);
            }else{
                if(data2.length>0){
                    let sql='update shopcart set num=num+1 where UserID=? AND RuleId=?';
                    db.query(sql,[userId,rid],(err,data)=>{
                        if(err){
                                console.log(err);
                                res.send({code:500,msg:'数据库出错，联系管理员'})
                        }else{
                            if(data.affectedRows>0){
                                res.send({code:200,msg:'加入成功'})
                            }else{
                                res.send({code:203,msg:'加入失败'})
                            }
                        }
                    })
                }else{
                    let sql='insert into shopcart (UserId,RuleId) values(?,?)'
                            db.query(sql,[userId,rid],(err,data)=>{
                                if(err){
                                    
                                }else{
                                    if(data.affectedRows>0){
                                        res.send({code:200,msg:'加入成功'})
                                    }else{
                                        res.send({code:203,msg:'加入失败'})
                                    }
                                }
                            })
                }
            }
        })
       
    }else{
        res.send({code:201,msg:'请先登录'})
    }
})
//购物车生成订单
router.post('/buildOrder',(req,res)=>{
    let ridStr=req.body.ridstr;
    let total=req.body.total;
    /**
     * 1.生成订单
     *      订单两个表（订单表，订单详情表）
     *      先订单表，再生成订单详情表
     * 2.删除购物车     
     */
    if(req.session.user){
        let userid=req.session.info.id;
        //1.1生成订单表
        let sql='insert into `order` (userid,total) values(?,?)'
        db.query(sql,[userid,parseFloat(total)],function(err,data){
            if(err){
                res.send({code:500,message:'服务器出错'})
            }else{
                if(data.affectedRows>0){
                      let orderId=data.insertId;
                      //1.2插入订单详情  
                      let sql2='INSERT INTO orderdetail(OrderId,RuleId,num,price) SELECT ${orderId},s.RuleId,s.num,r.price FROM shopcart s JOIN productrule r ON s.RuleId=r.Id WHERE s.id IN (${sidstr})';
                      db.query(sql2,[],(err2,data2)=>{
                        if(err2){
                            console.log(err2);
                            res.send({code:500,msg:'服务器出错'})
                        }else{
                            //删除购物车信息
                            let sql3 =  'delete from shopcart where id in (${sidstr})'
                            db.query(sql3,[],(err3,data3)=>{
                                if(err3){
                                    console.log(err3)
                                    res.send({code:500,msg:'服务器出错'})
                                }else{
                                    res.send({code:200,msg:'订单生成成功'})
                                }
                            })
                        }
                    })
                    }else{
                    res.send({code:202,message:'插入失败'})
                }
            }
        });
    }else{
        res.send({code:200,message:'请先登录'})
    }
})

module.exports=router;