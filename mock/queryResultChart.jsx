// ./src/mock/users.js
'use strict';

const qs = require('qs');
const fs = require('fs');
const path = require('path');

function getYakCaseInfo(){
  let yakCaseInfo = {};
  const yakResultDirBase = path.join(__dirname + '/../../yak_result');
  yakCaseInfo = { data: [], page: { total: null, current: 1} };
  fs.readdirSync(yakResultDirBase).forEach(function (item) {
    let info = fs.statSync(yakResultDirBase + "/" + item);
    if (info.isDirectory()) {
      let caseResultsDir = yakResultDirBase + "/" + item + "/test_result";
      let resultCount = [];

      fs.readdirSync(caseResultsDir).forEach(function (rDir) {
        let info = fs.statSync(caseResultsDir + "/" + rDir);
        if (info.isDirectory()) {
          resultCount.push(rDir);
        }
      });

      yakCaseInfo.data.push({
        id: item,
        name: item,
        counts: resultCount.length,
        lastresult: resultCount[resultCount.length - 1]
      });

    }
  });

  yakCaseInfo.page.total = yakCaseInfo.data.length;
  return yakCaseInfo;
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

  //

};
