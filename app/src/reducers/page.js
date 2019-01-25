import {
   /*  GET_PHOTOS_REQUEST,
    GET_PHOTOS_SUCCESS,
    GET_PHOTOS_ERROR,
    GET_PHOTOS_BY_YEAR,
    SORT_BY_LIKES, */
    GET_WHISHES_REQUEST,
    GET_WHISHES_SUCCESS,
    GET_WHISHES_ERROR,
    ADD_WHISHES_REQUEST,
    ADD_WHISHES_SUCCESS,
    ADD_WHISHES_ERROR,
    UPDATE_WHISHES_REQUEST,
    UPDATE_WHISHES_SUCCESS,
    UPDATE_WHISHES_ERROR,
    DELETE_WHISHES_REQUEST,
    DELETE_WHISHES_SUCCESS,
    DELETE_WHISHES_ERROR
} from '../actions/PageActions';

const initialState = {
    isFetching: false,
    error: false,
    data: []
};

export function pageReducer(state = initialState, action) {
    switch (action.type) {
        case GET_WHISHES_REQUEST:
            return { ...state, isFetching: true }
        case GET_WHISHES_SUCCESS:
            return { ...state, data: action.payload, isFetching: false }
        case GET_WHISHES_ERROR:
            return { ...state, isFetching: false, err: action.error }
        case ADD_WHISHES_REQUEST:
            return { ...state, isFetching: true }
        case ADD_WHISHES_SUCCESS:
            return {
                ...state,
                data: Object.assign({}, state.data, {body: state.data.body.concat(action.payload)}),
                isFetching: false
            }
        case ADD_WHISHES_ERROR:
            return { ...state, isFetching: false, err: action.error }
        case UPDATE_WHISHES_REQUEST:
            return { ...state, isFetching: true }
        case UPDATE_WHISHES_SUCCESS:
            const { _id } = action.payload;
            const newBody = state.data.body.map(el => {
                if (el._id === _id) {
                    return action.payload;
                }

                return el;
            })

            return {
                ...state,
                data: Object.assign({}, state.data, { body: newBody }),
                isFetching: false
            }
        case UPDATE_WHISHES_ERROR:
            return { ...state, isFetching: false, err: action.error }
        case DELETE_WHISHES_REQUEST:
            return { ...state, isFetching: true }
        case DELETE_WHISHES_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                data: Object.assign({}, state.data, {
                    body: state.data.body.filter(el => !action.payload.includes(el._id))
                }),
                isFetching: false
            }
        case DELETE_WHISHES_ERROR:
            return { ...state, isFetching: false, err: action.error }
        default:
            return { ...state };
    }

    /* switch (action.type) {
        case GET_PHOTOS_REQUEST:
            return { ...state, isFetching: true };
        case GET_PHOTOS_SUCCESS:
            return {
                ...state,
                allPhotos: { ...action.payload },
                currentPhotos: action.payload.items
                    .sort(sortByLikes)
                    .filter((el, i) => i <= 20),
                years: action.payload.items
                    .reduce((acc, el) => {
                        const currentYear = new Date(
                            el.date * 1000
                        ).getFullYear();

                        if (acc.indexOf(currentYear) === -1) {
                            acc.push(currentYear);
                        }
                        return acc;
                    }, [])
                    .sort(),
                isFetching: false
            };
        case GET_PHOTOS_ERROR:
            return { ...state, error: action.error, isFetching: false };
        case GET_PHOTOS_BY_YEAR:
            return {
                ...state,
                currentPhotos:
                    action.payload === 'all'
                        ? state.allPhotos.items.sort(sortByLikes)
                        : state.allPhotos.items
                              .filter(el => {
                                  const currentYear = new Date(
                                      el.date * 1000
                                  ).getFullYear();
                                  return +action.payload === currentYear;
                              })
                              .sort(sortByLikes)
            };
        case SORT_BY_LIKES:
            return {
                ...state,
                currentPhotos: state.currentPhotos.sort((a, b) => {
                    let result;
                    if (!state.sorting.likes) {
                        result = b.likes.count - a.likes.count;
                    } else {
                        result = a.likes.count - b.likes.count;
                    }
                    return result;
                }),
                sorting: {
                    ...state.sorting,
                    likes: !state.sorting.likes
                }
            };
        default:
            return state;
    } */
}
