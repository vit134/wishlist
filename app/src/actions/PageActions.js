import { SERVER_URL } from '../config/urls';

export const GET_WHISHES_REQUEST = 'GET_WHISHES_REQUEST';
export const GET_WHISHES_SUCCESS = 'GET_WHISHES_SUCCESS';
export const GET_WHISHES_ERROR = 'GET_WHISHES_ERROR';

export const ADD_WHISHES_REQUEST = 'ADD_WHISHES_REQUEST';
export const ADD_WHISHES_SUCCESS = 'ADD_WHISHES_SUCCESS';
export const ADD_WHISHES_ERROR = 'ADD_WHISHES_ERROR';

export const UPDATE_WHISHES_REQUEST = 'UPDATE_WHISHES_REQUEST';
export const UPDATE_WHISHES_SUCCESS = 'UPDATE_WHISHES_SUCCESS';
export const UPDATE_WHISHES_ERROR = 'UPDATE_WHISHES_ERROR';

export const DELETE_WHISHES_REQUEST = 'DELETE_WHISHES_REQUEST';
export const DELETE_WHISHES_SUCCESS = 'DELETE_WHISHES_SUCCESS';
export const DELETE_WHISHES_ERROR = 'DELETE_WHISHES_ERROR';

export function getWhishes(user) {
  return dispatch => {
    dispatch({
      type: GET_WHISHES_REQUEST
    });

    return fetch(`${SERVER_URL}/wishes${user ? `?user=${user}` : ''}`, {
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
        type: GET_WHISHES_SUCCESS,
        payload: data
      });

      return data;
		})
		.catch(e => {
      //console.log('error', e);
      dispatch({
        type: GET_WHISHES_ERROR,
        error: true,
        payload: new Error('Ошибка загрузки вишек')
      });
		});
  }
}

export function addWish(data) {
  return function(dispatch) {
    dispatch({
      type: ADD_WHISHES_REQUEST
    });

    return fetch(`${SERVER_URL}/wishes`, {
      method: 'POST',
      headers: {
				'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      credentials: 'include'
    })
		.then(res => {
			//console.log('res', res)
			return res.json()
		})
		.then(data => {
      //console.log('success', data);
      dispatch({
        type: ADD_WHISHES_SUCCESS,
        payload: data
      });
		})
		.catch(e => {
      //console.log('error', e);
      dispatch({
        type: ADD_WHISHES_ERROR,
        error: true,
        payload: new Error('Ошибка загрузки вишек')
      });
		});
  }
}

export function updateWish(data) {
  return dispatch => {
    dispatch({
      type: UPDATE_WHISHES_REQUEST
    });

    return fetch(`${SERVER_URL}/wishes`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include'
      })
      .then(res => {
        //console.log('res', res)
        return res.json()
      })
      .then(data => {
        // console.log('success', data);
        dispatch({
          type: UPDATE_WHISHES_SUCCESS,
          payload: data
        });

        return data;
      })
      .catch(e => {
        //console.log('error', e);
        dispatch({
          type: UPDATE_WHISHES_ERROR,
          error: true,
          payload: new Error('Ошибка загрузки вишек')
        });
      });
  }
}

export function deleteWish(data) {
  return dispatch => {
    dispatch({
      type: DELETE_WHISHES_REQUEST
    });

    return fetch(`${SERVER_URL}/wishes`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      credentials: 'include'
    })
      .then(res => {
        //console.log('res', res)
        return res.json()
      })
      .then(data => {
        //console.log('success', data);
        dispatch({
          type: DELETE_WHISHES_SUCCESS,
          payload: data
        });
      })
      .catch(e => {
        //console.log('error', e);
        dispatch({
          type: DELETE_WHISHES_ERROR,
          error: true,
          payload: new Error('Ошибка загрузки вишек')
        });
      });
  }
}

/* export function getPhotos(year) {
  return dispatch => {
    dispatch({
      type: GET_PHOTOS_REQUEST,
      payload: year
    });
    //eslint-disable-next-line no-undef
    VK.Api.call(
      'photos.getAll',
      { extended: 1, count: 200, v: '5.80', need_hidden: 1 },
      function(r) {
        if (r.response) {
          dispatch({
            type: GET_PHOTOS_SUCCESS,
            payload: r.response
          });
        } else if (r.error) {
          dispatch({
            type: GET_PHOTOS_ERROR,
            error: true,
            payload: new Error(r.error)
          });
        }
      }
    );
  };
}

export function getPhotosByYear(year) {
  return {
    type: GET_PHOTOS_BY_YEAR,
    payload: year
  };
}

export function sortByLikes() {
  return {
    type: SORT_BY_LIKES
  };
}
 */