import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'dva/router';
import IndexPage from './routes/IndexPage';
import DashBoard from './routes/DashBoard';

export default function({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/bashboard" component={DashBoard} />
    </Router>
  );
};
