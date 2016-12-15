import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'dva/router';
import NotFound from './routes/NotFound';
import DashBoard from './routes/DashBoard';
import Analysis from './routes/Analysis';
import AnalysisScenseReport from './routes/AnalysisScenseReport';

export default function({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={DashBoard} />
      <Route path="/dashboard" component={DashBoard} />
      <Route path="/analysis" component={Analysis} />
      <Route path="/analysis/scense_report" component={AnalysisScenseReport} />
      <Route path="*" component={NotFound} />
    </Router>
  );
};
