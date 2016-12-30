import { querySvrResultChart, queryChartsOnPreview } from '../services/resultChart';
import { parse } from 'qs';
import { queryScenseReport, createScenseReport, deleteScenseReport} from '../services/scenseReportMongo';


export default {

  namespace: 'AnalysisReportMaker',

  state: {
    reportList: [],            // 多个报告的结果列表
    item: {},                  // 一份报告的数据结构描述，在steps中需要缓存数据
    loading: false,            // 控制加载状态
    modalVisible: false,       // 添加报告的浮动层是否可见

    previewModalVisible: false, // 最近结果预览弹出窗的显示状态
    previewModalTital: '',      // 预览框标题名字

    scensName: '',          // 当前选择的场景名称
    resultDate: '',         // 当前选择的数据日期
    resultDateList: [],     // 存放该场景总共存放的结果日期
    tmpData: [],            // 存放画图数据，以下数据为例，表示两个图表数据，time或Time做x轴，其他做y轴
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

      //获取结果列表中已经存在的结果日期列表
      let resultDateList = yield select(state => state.analysisCsvChart.list);
      let dateList = resultDateList.filter((e)=>{return e.name==payload.scense});

      yield put({
        type: "loadResultList",
        payload: dateList[0]
      });

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

    //提供查询图标数据的接口, 查询完成把数据填充进state
    *queryChartData({payload}, {put, call, select}){
      let scensName = yield select(state => state.AnalysisReportMaker.scensName);
      let queryStr = {lastresult: payload, name: scensName};
      const { data } = yield call(queryChartsOnPreview, parse(queryStr));
      if(data){
        yield put({
          type: 'queryChartDataSuccess',
          payload: data.data
        });
      }
    },

    //提交数据
    *commitStepData({}, {put, call, select}){
      let payload = yield select(state => state.AnalysisReportMaker.item);
      const { data } = yield call(createScenseReport, payload);
      if (data && data.success) {
        yield put({
          type: 'createSuccess',
          payload: {
            newReport: data.data,
          }
        });
      }
    },

    //删除数据
    *'delete'({payload}, {put, call, select}){
      let deleteId = payload;
      let { data } = yield call(deleteScenseReport, parse({id: deleteId}));
      if(data.success){
        yield put({
          type: 'deleteSuccess',
          payload: {deleteReport: deleteId}
        });
      }
    }


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
      return({...state, reportList: action.payload.data});
    },

    //显示添加报告的浮动层
    showGenModal(state){
      return({...state, modalVisible: true});
    },

    //隐藏添加报告的浮动层
    hideGenModal(state){
      return({...state, modalVisible: false});
    },

    //在切换到报告制作页面的时候，填充场景名称和存在日期的列表
    loadResultList(state, action){
      let scense = action.payload;
      return({...state, scensName: scense.name, resultDateList: scense.allresult});
    },

    //图标数据查询成功填充state
    queryChartDataSuccess(state, action){
      return({...state, tmpData: action.payload});
    },

    //加载每一步提交的数据
    loadStepData(state, action){
      return({
        ...state,
        item: {
          ...state.item,
          ...action.payload,
          scensName: state.scensName
        }
      });
    },

    //提交一份数据报告到数据库成功
    createSuccess(state, action){
      let newReport = action.payload.newReport;
      let newReportList = state.reportList.concat();
      newReportList.unshift(newReport);
      return({...state, reportList: newReportList});
    },

    //数据库数据删除成功，页面数据更新
    deleteSuccess(state, action){
      let deleteReportId = action.payload.deleteReport;
      let newReportList = state.reportList.concat();
      newReportList = newReportList.filter((e)=>{
        return(e._id != deleteReportId);
      });
      return({...state, reportList: newReportList});
    },

  },

}
