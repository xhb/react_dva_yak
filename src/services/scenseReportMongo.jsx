
// 案例测试结果对比报告数据集合接口

import request from '../utils/request';
import qs from 'qs';

async function queryScenseReport(params){
  return request(`/api/scenseReports?${qs.stringify(params)}`);
}

async function createScenseReport(params) {
  return request('/api/scenseReports', {
    method: 'post',
    body: qs.stringify(params),
  });
}

async function deleteScenseReport(params){
  return request('/api/scenseReports', {
    method: 'delete',
    body: qs.stringify(params)
  });
}

async function updateScenseReport(params){
  return request('/api/scenseReports', {
    method: 'put',
    body: qs.stringify(params)
  });
}

export default { queryScenseReport, createScenseReport, deleteScenseReport, updateScenseReport };

