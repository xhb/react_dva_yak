import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'dva/router';
import NotFound from './routes/NotFound';
import IndexPage from './routes/IndexPage';
import DashBoard from './routes/DashBoard';
import CSVChart from './routes/CSVChart';

export default function({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={DashBoard} />
      <Route path="/dashboard" component={DashBoard} />
      <Route path="/analysis/csvchart" component={CSVChart} />
      <Route path="*" component={NotFound} />
    </Router>
  );
};
