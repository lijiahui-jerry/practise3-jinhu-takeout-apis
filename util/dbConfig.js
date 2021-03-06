const mysql=require('mysql')

module.exports={
  //配置数据库
  config:{
    host:'118.195.201.157',
    port:'3306',
    user:'ljh',
    password:'Dx4mjFSr8mLD5EEF',
    database:'jinhu-takeout',
  },
  //通过连接池连接数据库
  sqlConnect:function(sql,sqlArr,callBack){
    var pool=mysql.createPool(this.config)
    pool.getConnection((err,conn)=>{
      if(err){
        console.log(err,'\ndbConfig连接失败')
        return
      }
      //事件驱动回调
      conn.query(sql,sqlArr,callBack)
      //释放连接
      conn.release()
    })
  },
//promise回调
  asyncSqlConnect:function(asyncSql,sqlArr){
    return new Promise((resolve,reject)=>{
      var pool=mysql.createPool(this.config)
      pool.getConnection((err,conn)=>{
        if(err) reject(err)
        else{
          //事件驱动回调
          conn.query(asyncSql,sqlArr,(err,data)=>{
            if(err) reject(err)
            else resolve(data)
          })
          //释放连接
          conn.release()
        }
      })
    }).catch((err)=>{
      console.log(err)
    })
  },
}
