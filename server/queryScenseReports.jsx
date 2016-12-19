const qs = require('qs');
const db = require("../server_lib/ymongodb");

module.exports = {

  //查询某个具体的场景下有多少个已经生成的测试报告
  "GET /api/scenseReports" (req, res){
    const query = qs.parse(req.query);
    db.find("report", {scensName: query.scense}, {}, (err, data)=>{
      res.json({
        success: true,
        data: data
      });
    })
  }

  //
}