import {SHOW_ALERT, HIDE_ALERT} from '../type/index';

//show alert
export function showAlertAction(alert){
    return (dispatch) => {
        dispatch(createAlert(alert));
    };
};
const createAlert = alert => ({
    type: SHOW_ALERT,
    payload: alert
});

//Hide Alert

export function hideAlertAction(){
    return (dispatch) => {
        dispatch(hideAlert());
    };
};
const hideAlert = () => ({
    type: HIDE_ALERT
});