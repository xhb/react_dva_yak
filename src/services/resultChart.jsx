
import request from '../utils/request';
import qs from 'qs';

async function querySvrResultChart(params) {
  return request(`/api/resultchart?${qs.stringify(params)}`);
}

export default querySvrResultChart;