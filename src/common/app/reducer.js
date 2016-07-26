import { combineReducers } from 'redux';
// import device from '../device/reducer';
import intl from '../intl/reducer';
import { routerReducer as routing } from 'react-router-redux';


const appReducer = combineReducers({
  intl,
  routing
});

export default appReducer;
