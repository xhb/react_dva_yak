
import request from '../utils/request';
import qs from 'qs';

//查询服务端存在的场景测试报告
async function querySvrResultChart(params) {
  return request(`/api/resultchart?${qs.stringify(params)}`);
}

//查询预览窗口所需要的预览数据
async function queryChartsOnPreview(params) {
  return request(`/api/csvpreviewdata?${qs.stringify(params)}`)
}

export default { querySvrResultChart, queryChartsOnPreview };
