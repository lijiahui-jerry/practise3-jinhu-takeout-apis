let dbConfig=require('../util/dbConfig')
const validatedPhoneAndCode=[]

//methods
//模拟验证码
function rand(min,max){
  return Math.floor(Math.random()*(max-min))+min
}

//验证某手机号是否发送过验证码
function ifSentCode(phone){
  for(var i of validatedPhoneAndCode){
    if(i.phone==phone) return true
  }
  return false
}

//判断手机号与验证码是否匹配
function ifPhoneAndCodeMatch(phone,code){
  for(var i of validatedPhoneAndCode){
    if(i.phone==phone && i.code==code) return 'logged'
  }
  return 'error'
}

//通过phone获取用户信息
async function getUser(phone){
  let sql='select * from user where id=? or phone=? or username=?'
  let sqlArr=[phone,phone,phone]
  let result=await dbConfig.asyncSqlConnect(sql,sqlArr)

  return result
}

//通过token获取用户信息
async function getUserWithToken(token){
  let sql='select * from user where uuid=?'
  let sqlArr=[token]
  let result=await dbConfig.asyncSqlConnect(sql,sqlArr)

  return result
}

//用户注册
async function regUser(phone){
  let sql='insert into user(username,phone) value(?,?);'
  let sqlArr=[phone,phone]
  let result=await dbConfig.asyncSqlConnect(sql,sqlArr)

  if(1==result.affectedRows){
    let user=await getUser(phone)

    if(user.length) return user
    else return false
  }else return false
}

//检测是否第一次登录
async function ifFirstTimeLogin(phone){
  let sql='select * from user where username=? or phone=?'
  //let sql='SELECT user_tools.name,link,iconfont,user.* FROM user_tools,user WHERE user.id=user_tools.id AND user.phone=?'
  let sqlArr=[phone,phone]
  let result=await dbConfig.asyncSqlConnect(sql,sqlArr)

  if(result.length) return result
  else{
    //没有该用户，自动注册
    return await regUser(phone)
  }
}

//apis
//验证码发送接口
sendCode=(req,res)=>{
  let phone=req.query.phone
  let code=rand(100000,999999)

  //如果已经发送过验证码
  if(ifSentCode(phone)){
    console.log(validatedPhoneAndCode)
    res.send({
      'code':400,
      'msg':'已经发送过验证码，请稍候再试！',
      'data':code,
    })
  }
  validatedPhoneAndCode.push({phone,code})
  //返回验证码
  res.send({
    'code':200,
    'msg':'发送成功',
    'data':code,
  })
  console.log(validatedPhoneAndCode)
}

//验证码登录接口
loginWithPhoneAndCode=async(req,res)=>{
  let {phone,code}=req.query
  if(ifSentCode(phone)){
    //验证码已发送
    let status=ifPhoneAndCodeMatch(phone,code)
    if('logged'==status){
      //登录成功
      let user=await ifFirstTimeLogin(phone)
      res.send({
        'code':200,
        'msg':'登录成功',
        'data':user[0],
      })
    }else if('error'==status){
      //登录失败
      res.send({
        'code':400,
        'msg':'登录失败',
      })
    }
  }else{
    //验证码未发送
    res.send({
      'code':400,
      'msg':'未发送验证码',
    })
  }
}

//已登录获取用户信息
getUserInfo=async(req,res)=>{
  let token=req.query.token
  let userInfo=await getUserWithToken(token)
  res.send({
    'code':200,
    'data':userInfo,
  })
}
module.exports={sendCode,loginWithPhoneAndCode,getUserInfo}
