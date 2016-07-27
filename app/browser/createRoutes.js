import App from './app/App.react';
import Button from '../../src/Button/Button.react';
import HomePage from './HomePage/HomePage.react';
import React from 'react';
import { IndexRoute, Route } from 'react-router';

export default function createRoutes() {
  return (
    <Route component={App} path="/">
      <IndexRoute component={HomePage} />
      <Route component={HomePage} path="/" />
      <Route component={Button} path="button" />
      <Route component={HomePage} path="*" />
    </Route>
  );
}
