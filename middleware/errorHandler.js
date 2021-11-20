const handleError=(err,req,res,next)=>{
     
    console.log(res.statusMessage)
   switch(res.statusCode){
       case 400:res.json({error:'Something went wrong'})
            break;
       case 401:res.json({error:'Not Authorized for action,pls login as authorized role'})
            break;
      case 403:res.json({error:'Not Authorized for action'})
           break;
      case 404:res.json({msg:'No resutls found'})
           break;
      case 500:res.json({error:'Internal Server Error'})
          break;                   
   }
   return next(res)
}

module.exports=handleError