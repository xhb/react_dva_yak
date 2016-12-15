const qs = require('qs');
const MongoDB = require("./ymongodb.js");

module.exports = {

  //查询某个具体的场景下有多少个已经生成的测试报告
  "GET /api/scenseReports" (req, res){
     const query = qs.parse(req.query);
     return( MongoDB.find("report", {scense: query.scensName}, {}, (err, data)=>{
        if(!err){
          res.json({
            success: true,
            data
          });
        }else{
          res.json({
            success: false,
            error: err
          });
        }
     }));
  }

}