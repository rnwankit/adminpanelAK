import { combineReducers } from "redux";
import { counterReducer } from "./counter.reducer";
import { medicineReducer } from "./medicines.reducer";

export const rootReducer = combineReducers({
    counter: counterReducer,
    medicines: medicineReducer
})