
// 案例测试结果对比报告数据集合接口

import request from '../utils/request';
import qs from 'qs';

async function queryScenseReport(params){
  return request(`/api/scenseReports?${qs.stringify(params)}`);
}


export default queryScenseReport;

