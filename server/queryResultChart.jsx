// ./src/mock/users.js
'use strict';

const qs = require('qs');
const fs = require('fs');
const path = require('path');
const csvParse = require('csv-parse/lib/sync');;

function getYakCaseInfo(){
  let yakCaseInfo = {};
  const yakResultDirBase = path.join(__dirname + '/../../yak_result');
  yakCaseInfo = { data: [], page: { total: null, current: 1} };

  //dir: yak_result
  fs.readdirSync(yakResultDirBase).forEach(function (item) {
    //dir: yak_result/case_name
    let info = fs.statSync(yakResultDirBase + "/" + item);
    if (info.isDirectory()) {
      let caseResultsDir = yakResultDirBase + "/" + item + "/test_result";
      let resultCount = [];
      //dir: yak_result/case_name/test_result
      fs.readdirSync(caseResultsDir).forEach(function (rDir) {
        //dir: yak_result/case_name/test_result/timestamp
        let info = fs.statSync(caseResultsDir + "/" + rDir);
        if (info.isDirectory()) {
          resultCount.push(rDir);
        }
      });

      yakCaseInfo.data.push({
        id: item,
        name: item,
        counts: resultCount.length,
        lastresult: resultCount[resultCount.length - 1],
        allresult: resultCount
      });

    }
  });

  yakCaseInfo.page.total = yakCaseInfo.data.length;
  return yakCaseInfo;
};

function readCsvFile(file){
  try{
    let content = fs.readFileSync(file);
    let obj = csvParse(content, {columns: true});
    let objData = {filename: path.basename(file), data: obj};
    return objData;
  }catch(e){
    console.log(e);
    return {filename: path.basename(file), data: []};
  }
};

module.exports = {

  //获取整个场景测试结果的列表
  'GET /api/resultchart' (req, res) {
    const page = qs.parse(req.query);
    const pageSize = page.pageSize || 10;
    const currentPage = page.page || 1;

    let data;
    let newPage;
    let YakCaseInfo = getYakCaseInfo();
    let newData = YakCaseInfo.data.concat();

    if (page.field) {
      const d = newData.filter(function (item) {
        return item[page.field].indexOf(page.keyword) > -1;
      });

      data = d.slice((currentPage - 1) * pageSize, currentPage * pageSize);

      newPage = {
        current: currentPage * 1,
        total: d.length
      };
    } else {
      data = YakCaseInfo.data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
      YakCaseInfo.page.current = currentPage * 1;
      newPage = {
        current: YakCaseInfo.page.current,
        total: YakCaseInfo.page.total
      };
    }

    res.json({
      success: true,
      data,
      page: newPage
    });

  },

  // 功能：获取csv时序图表的数据
  // req  object :
  //              req.name       场景名称
  //              req.lastresult 场景测试结果日期
  //
  // res  object :
  // [
  //  {
  //    node: "1",   //节点号
  //    data: [
  //      {
  //        filename: "yak_result.csv",  //数据结果文件名
  //        data: [
  //          {AverageTPM : "0", CurrentTPM: "0", Time: "13:04:50"}, //csv的1行数据
  //          {AverageTPM : "0", CurrentTPM: "0", Time: "13:04:51"},
  //        ]
  //      },
  //      {
  //        filename: "yak_result2.csv",
  //        data: [
  //          {AverageTPM : "0", CurrentTPM: "0", Time: "13:04:50"},
  //          {AverageTPM : "0", CurrentTPM: "0", Time: "13:04:51"},
  //        ]
  //      }
  //    ]
  //  },
  //  {
  //    node: "2"
  //    data: []
  //  }
  // ]
  'GET /api/csvpreviewdata' (req, res) {
    const caseResult = qs.parse(req.query);
    const name = caseResult.name;
    const lastresult = caseResult.lastresult;
    const yakResultDirBase = path.join(__dirname + '/../../yak_result');
    const resultData = [];
    //dir: yak_result
    fs.readdirSync(yakResultDirBase).forEach(function (item) {
      //dir: yak_result/case_name
      if (item == name) {
        let caseResultsDir = yakResultDirBase + "/" + item + "/test_result";
        //dir: yak_result/case_name/test_result
        fs.readdirSync(caseResultsDir).forEach(function (rDir) {
          //dir: yak_result/case_name/test_result/timestamp
          if (rDir == lastresult) {
            let dirLastResult = caseResultsDir + "/" + lastresult;
            fs.readdirSync(dirLastResult).forEach( function (node) {
              //dir: yak_result/case_name/test_result/timestamp/node
              let tempNodeData = { node: node, data: [] }
              let nodeDir = dirLastResult + "/" + node;
              let info = fs.statSync(nodeDir);
              if (info.isDirectory()) {
                fs.readdirSync(nodeDir).forEach( function (rfile) {
                  if(rfile.indexOf(".csv") > -1){
                    let csvfile = nodeDir + "/" + rfile;
                    tempNodeData.data.push(readCsvFile(csvfile));
                  }
                });
              };
             resultData.push(tempNodeData);
            });
          }
        });
      }
    });

    res.json({
      success: true,
      data: resultData
    });

  }


};
