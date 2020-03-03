import { combineReducers } from 'redux';
import MachinesReducer from './machinesreducer';


export default combineReducers({
	machines: MachinesReducer
});
