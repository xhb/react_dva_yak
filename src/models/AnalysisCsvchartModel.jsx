import querySvrResultChart from '../services/resultChart';
import { parse } from 'qs';

export default {

  namespace: 'analysisCsvChart',

  state: {
    list: [],
    total: null,
    loading: false,            // 控制加载状态
    current: null,             // 当前分页信息
    currentItem: {},           // 当前操作的对象
    previwModalVisible: false, // 最近结果预览弹出窗的显示状态
    previwModalLoading: false, // 最近结果预览弹窗加载状态
    field: '',                 // 勾选搜索的领域
    keyword: '',               // 搜索框关键字
  },

  subscriptions: {

    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/analysis/csvchart') {
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

  },

  reducers: {

    // 控制列表加载状态的 reducer

    showLoading(state, action){
      return ({...state, loading: true})
    },


    showModal(state){
      return ({ ...state, previwModalVisible: true});
    },   // 控制 Modal 显示状态的 reducer

    hideModal(state){
      return({ ...state, previwModalVisible: false});
    },

    querySuccess(state, action){
      return({ ...state, ...action.payload, loading: false});
    },

    updateQueryKey(state, action) {
      return({ ...state, ...action.payload });
    },

  },

}
