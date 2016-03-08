import {combineReducers} from 'redux';
import device from '../device/reducer';
import intl from '../intl/reducer';
import {routerReducer as routing} from 'react-router-redux';


const appReducer = combineReducers({
  device,
  intl,
  routing
});

export default appReducer;
