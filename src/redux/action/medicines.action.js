import { BASE_URL } from '../../shared/baseUrl';
import * as ActionTypes from '../ActionTypes';

export const getMedicines = () => (dispatch) => {
    try {
        dispatch(loadingMedicines())

        setTimeout(function () {
            fetch(BASE_URL + 'medicines')
                .then(response => {
                    if (response.ok) {
                        return response;
                    } else {
                        var error = new Error('Something went wrong:  ' + response.status + ': ' + response.statusText);
                        error.response = response;
                        throw error;
                    }
                },
                    error => {
                        var errmess = new Error(error.message);
                        throw errmess;
                    })
                .then((response) => response.json())
                .then((data) => dispatch({ type: ActionTypes.GET_MEDICINES, payload: data }))
                .catch((error) => dispatch(errorMedicines(error.message)))
        }, 2000);

    } catch (error) {
        dispatch(errorMedicines(error.message))
    }
}

export const addMedicine = (data) => (dispatch) => {
    try {
        fetch(BASE_URL + 'medicines', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Something went wrong:  ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
                error => {
                    var errmess = new Error(error.message);
                    throw errmess;
                })
            .then((response) => response.json())
            .then((data) => dispatch({ type: ActionTypes.ADD_MEDICINES, payload: data }))
            .catch((error) => dispatch(errorMedicines(error.message)))
    } catch (error) {
        dispatch(errorMedicines(error.message))
    }
}

export const loadingMedicines = () => (dispatch) => {
    dispatch({ type: ActionTypes.LOADING_MEDICINES })
}

export const errorMedicines = (error) => (dispatch) => {
    dispatch({ type: ActionTypes.ERROR_MEDICINES, payload: error })
}