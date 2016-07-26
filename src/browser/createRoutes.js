import App from './app/App.react';
import ButtonSummary from './components/ButtonSummary.react';
import HomePage from './HomePage/HomePage.react';
import React from 'react';
import { IndexRoute, Route } from 'react-router';

export default function createRoutes() {
  return (
    <Route component={App} path="/">
      <IndexRoute component={HomePage} />
      <Route component={HomePage} path="*" />
      <Route component={ButtonSummary} path="button" />
    </Route>
  );
}
