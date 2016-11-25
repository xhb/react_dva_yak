// ./src/mock/users.js
'use strict';

const qs = require('qs');
const fs = require('fs');
const path = require('path');

module.exports = {
  'GET /api/resultchart' (req, res) {

    const page = qs.parse(req.query);

    const yakResultDirBase = path.join(__dirname + '/../../yak_result');
    let data = { data: [], page: { total: null, current: 1} };

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

        data.data.push({name: item, counts: resultCount.length, lastresult: resultCount[resultCount.length - 1]});
      }
     });

    data.page.total = data.data.length;

    res.json({
      success: true,
      data: data.data,
      page: data.page
    });

  },
};
