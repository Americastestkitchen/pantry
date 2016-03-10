import App from './app/App.react';
import HomePage from './HomePage/HomePage.react';
import NotFoundPage from './NotFoundPage/NotFoundPage.react';
import React from 'react';
import { IndexRoute, Route } from 'react-router';

export default function createRoutes() {
  return (
    <Route component={App} path="/">
      <IndexRoute component={HomePage} />
      <Route component={NotFoundPage} path="*" />
      <Route component={HomePage} path="*" />
    </Route>
  );
}
