
import queryScenseReport from '../services/scenseReportMongo';

import { parse } from 'qs';

export default {

  namespace: 'AnalysisReportMaker',

  state: {
    reportList: [],            // 多个报告的结果列表
    item: {},             // 一份报告的数据结构描述，在steps中需要缓存数据
    loading: false,            // 控制加载状态
    modalVisible: false,       // 添加报告的浮动层是否可见

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
        if (location.pathname === '/analysis/scense_report') {
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
    *query({payload}, {put, call, select}){
      yield put({type: "showLoading"});
      let { data } = yield call(queryScenseReport, parse(payload));
      if(data.success){
        yield put({
          type: "querySuccess",
          payload: { data: data.data }
        });
      }else{
        //todo: 出错怎么显示
      }
      yield put({type: "hideLoading"});
    },

    //

  },

  reducers: {

    //显示正在加载报告列表
    showLoading(state){
      return ({...state, loading: true})
    },

    //隐藏正在加载的状态
    hideLoading(state){
      return({...state, loading: false});
    },

    //查询报告成功时的状态
    querySuccess(state, action){
      console.log(action);
      return({...state, reportList: action.payload.data});
    },

    //显示添加报告的浮动层
    showGenModal(state){
      return({...state, modalVisible: true});
    },

    //隐藏添加报告的浮动层
    hideGenModal(state){
      return({...state, modalVisible: false});
    }


  },

}
