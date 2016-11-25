import querySvrResultChart from '../services/resultChart';

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
  },

  subscriptions: {

  },

  effects: {

    //加载测试结果列表的数据流程

    *query( {payload}, {put, call, select} ){
      yield put({ type: 'showLoading' });
      const { data } = yield call(querySvrResultChart);
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


    showModal(){},   // 控制 Modal 显示状态的 reducer
    hideModal(){},

    querySuccess(state, action){
      //mock
      // const AnalysisResultListProps={
      //   total: 3,
      //   current: 1,
      //   loading: false,
      //   list: [
      //     {
      //       name: 'sqlserver_2X8',
      //       counts: 6,
      //       lastresult: '201612301230',
      //     },
      //     {
      //       name: 'sqlserver_4X16',
      //       counts: 5,
      //       lastresult: '201612301230',
      //     },
      //     {
      //       name: 'sqlserver_8X24',
      //       counts: 2,
      //       lastresult: '201612301230',
      //     },
      //   ],
      // };

      return({ ...state, ...action.payload, loading: false});
    },

  },

}
