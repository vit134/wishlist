export const SET_YEAR = 'SET_YEAR';
export const GET_PHOTOS_REQUEST = 'GET_PHOTOS_REQUEST';
export const GET_PHOTOS_SUCCESS = 'GET_PHOTOS_SUCCESS';
export const GET_PHOTOS_ERROR = 'GET_PHOTOS_ERROR';

export const GET_PHOTOS_BY_YEAR = 'GET_PHOTOS_BY_YEAR';

export const SORT_BY_LIKES = 'SORT_BY_LIKES';


export const GET_WHISHES_REQUEST = 'GET_WHISHES_REQUEST';
export const GET_WHISHES_SUCCESS = 'GET_WHISHES_SUCCESS';
export const GET_WHISHES_ERROR = 'GET_WHISHES_ERROR';

export function getWhishes() {
    return dispatch => {
        dispatch({
            type: GET_WHISHES_REQUEST
        });

        fetch(`http://localhost:8888/wishes`, {
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