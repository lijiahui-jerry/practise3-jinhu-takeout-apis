let dbConfig=require('../util/dbConfig')

getNavigation=(req,res)=>{
  let sql='select * from navigation'
  let sqlArr=[]
  let callBack=(err,data)=>{
    if(err){
      console.log('连接出错了')
    }else{
      res.send({
        'code':200,
        'data':data,
      })
    }
  }
  dbConfig.sqlConnect(sql,sqlArr,callBack)
}

module.exports={getNavigation}
