import {combineReducers} from 'redux';
import populationsReducer from "./populationReducer"

// state.templateReducer.count
let rootReducer = combineReducers({
    populationRDC: populationsReducer,
})

export default rootReducer;