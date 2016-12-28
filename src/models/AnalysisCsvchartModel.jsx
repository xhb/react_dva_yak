import { querySvrResultChart, queryChartsOnPreview } from '../services/resultChart';
import { parse } from 'qs';

export default {

  namespace: 'analysisCsvChart',

  state: {
    list: [],
    total: null,
    loading: false,            // 控制加载状态
    current: null,             // 当前分页信息
    currentItem: {},           // 当前操作的对象
    previewModalVisible: false, // 最近结果预览弹出窗的显示状态
    field: '',                 // 勾选搜索的领域
    keyword: '',               // 搜索框关键字
    previewModalTital: '',      // 预览框标题名字
    previewModalLoading: false, // 最近结果预览弹窗加载状态
    previewModalChartList: [],  // 存放画图数据，以下数据为例，表示两个图表数据，time或Time做x轴，其他做y轴
                               // [
                               //   { node: 1, data: [ [], [] ] },
                               //   { node: 2, data: [ [], [] ] }
                               // ]
  },

  subscriptions: {

    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/analysis') {
          dispatch({
            type: 'query',
            payload: location.query,
          });
        }
      });
    },

  },

  effects: {

    //加载测试结果列表的数据流程

    *query( {payload}, {put, call, select} ){
      yield put({ type: 'showLoading' });

      yield put({
        type: 'updateQueryKey',
        payload: { page: 1, field: '', keyword: '', ...payload },
      });

      const { data } = yield call(querySvrResultChart, parse(payload));
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            total: data.page.total,
            current: data.page.current
          }
        });
      }
    },

    //查询对应的测试案例结果预览时序图

    *queryChartsOnPreviewModal({payload}, {put, call, select}){
      yield put({type: 'showModal'});
      yield put({type: 'showModalLoading'});
      yield put({
        type: 'updateModalTital',
        payload: payload
      });
      const { data } = yield call(queryChartsOnPreview, parse(payload));
      if(data){
        yield put({
          type: 'queryPreviewDataSuccess',
          payload: data.data
        });
      }
    },


  },

  reducers: {

    // 控制列表加载状态的 reducer

    showLoading(state, action){
      return ({...state, loading: true})
    },


    showModal(state){
      return ({ ...state, previewModalVisible: true});
    },   // 控制 Modal 显示状态的 reducer

    showModalLoading(state){
      return({...state, previewModalLoading: true});
    },

    updateModalTital(state, action){
      return({...state, previewModalTital: (action.payload.name+'->'+action.payload.lastresult)});
    },

    queryPreviewDataSuccess(state, action){
      return({...state, previewModalChartList: action.payload, previewModalLoading: false});
    },


    hideModal(state){
      return({ ...state, previewModalVisible: false});
    },

    querySuccess(state, action){
      return({ ...state, ...action.payload, loading: false});
    },

    updateQueryKey(state, action) {
      return({ ...state, ...action.payload });
    },

  },

}
