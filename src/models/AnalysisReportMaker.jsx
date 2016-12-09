
import  from '../services/caseReportMongo';

import { parse } from 'qs';

export default {

  namespace: 'AnalysisReportMaker',

  state: {
    reportList: [],            // 多个报告的结果列表
    total: null,               // 总共有多个报告
    loading: false,            // 控制加载状态
    current: null,             // 当前分页信息
    currentItem: {},           // 当前操作的对象


    previewModalVisible: false, // 最近结果预览弹出窗的显示状态
    previewModalTital: '',      // 预览框标题名字

    originData: [],            // 存放画图数据，以下数据为例，表示两个图表数据，time或Time做x轴，其他做y轴
                               // [
                               //   { node: 1, data: [ [], [] ] },
                               //   { node: 2, data: [ [], [] ] }
                               // ]

  },

  subscriptions: {

    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/analysis/report') {
          dispatch({
            type: 'query',
            payload: location.query,
          });
        }
      });
    },

  },

  effects: {

    //查询某个场景测试的已有报告列表
    *query({ payload }, { call, put }){

    },

  },

  reducers: {

  },

}
