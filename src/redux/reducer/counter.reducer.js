import * as ActionTypes from '../ActionTypes';

const initVal = {
    counter: 0
}

export const counterReducer = (state = initVal, action) => {
    switch (action.type) {
        case ActionTypes.INCREMENT_COUNTER:
            return {
                ...state,
                counter: state.counter + 1
            }
        case ActionTypes.DECREMENT_COUNTER:
            return {
                ...state,
                counter: state.counter - 1
            }
        default:
            return state

    }
}