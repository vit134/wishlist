export const IS_LOGIN_REQUEST = 'IS_LOGIN_REQUEST';
export const IS_LOGIN_SUCCESS = 'IS_LOGIN_SUCCESS';
export const IS_LOGIN_FAIL = 'IS_LOGIN_FAIL';

export const REG_REQUEST = 'REG_REQUEST';
export const REG_SUCCESS = 'REG_SUCCESS';
export const REG_FAIL = 'REG_FAIL';

export const LOGIN_REQUEST = 'IS_LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'IS_LOGIN_SUCCESS';
export const LOGIN_FAIL = 'IS_LOGIN_FAIL';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'LOGOUT_FAIL';

export function checkLogin() {
    return function(dispatch) {
        dispatch({
            type: IS_LOGIN_REQUEST
        });

        return fetch(`http://localhost:8888/login`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
		.then(res => {
			//console.log('res', res)
			return res.json()
		})
		.then(data => {
            //console.log('success', data);
            dispatch({
                type: IS_LOGIN_SUCCESS,
                payload: data
            });

            return data;
		})
		.catch(e => {
            //console.log('error', e);
            return dispatch({
                type: IS_LOGIN_FAIL,
                error: true,
                payload: new Error('Ошибка авторизации')
            });
		});
    };
}

export function registration(data) {
    return function(dispatch) {
        dispatch({
            type: REG_REQUEST
        });

        return fetch(`http://localhost:8888/register`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
		.then(res => {
			return res.json()
		})
		.then(data => {
            //console.log('success', data);
            return dispatch({
                type: REG_SUCCESS,
                payload: data
            });
		})
		.catch(e => {
            //console.log('error', e);
            dispatch({
                type: REG_FAIL,
                error: true,
                payload: new Error('Ошибка авторизации')
            });
		});
    }
};

export function login(data) {
    return function(dispatch) {
        dispatch({
            type: REG_REQUEST
        });

        return fetch(`http://localhost:8888/login`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
				'Content-Type': 'application/json'
			},
            credentials: 'include'
        })
		.then(res => {
			//console.log('res', res)
			return res.json()
		})
		.then(data => {
            //console.log('success', data);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: data
            });

            return data;
		})
		.catch(e => {
            //console.log('error', e);
            dispatch({
                type: LOGIN_FAIL,
                error: true,
                payload: new Error('Ошибка авторизации')
            });
		});
    }
};

export function logout() {
    return function(dispatch) {
        dispatch({
            type: LOGOUT_REQUEST
        });

        return fetch(`http://localhost:8888/logout`, {
            method: 'GET',
            headers: {
				'Content-Type': 'application/json'
			},
            credentials: 'include'
        })
		.then(res => {
			//console.log('res', res)
			return res.json()
		})
		.then(data => {
            //console.log('success', data);
            dispatch({
                type: LOGOUT_SUCCESS,
                payload: data
            });

            return data;
		})
		.catch(e => {
            //console.log('error', e);
            dispatch({
                type: LOGOUT_FAIL,
                error: true,
                payload: new Error('Ошибка авторизации')
            });
		});
    }
};