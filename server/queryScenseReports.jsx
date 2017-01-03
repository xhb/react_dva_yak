const qs = require('qs');
const db = require("../server_lib/ymongodb");

module.exports = {

  //查询某个具体的场景下有多少个已经生成的测试报告
  "GET /api/scenseReports" (req, res){
    const query = qs.parse(req.query);
    db.find("report", {scensName: query.scense}, {}, (err, data)=>{
      data.reverse();
      res.json({
        success: true,
        data: data
      });
    })
  },

  //添加场景数据到数据库之中
  "POST /api/scenseReports" (req, res){
    const newReport = qs.parse(req.body);
    db.save("report", newReport, (err, data)=>{
      res.json({
        success: true,
        data: data
      });
    });
  },

  //在数据库中删除场景报告
  "DELETE /api/scenseReports" (req, res){
    const report = qs.parse(req.body);
    db.remove("report", {_id: report.id}, (err, data)=>{
      if(data){
        res.json({
          success: true
        });
      }else{
        res.json({
          success: false
        });
      }
    });
  },

  //在数据库中更新场景报告
  "PUT /api/scenseReports" (req, res){
    const report = qs.parse(req.body);
    db.update("report", {_id: report._id}, report, (err, data)=>{
      if(data){
        res.json({
          success: true
        });
      }else{
        res.json({
          success: false
        });
      }
    });
  },


}