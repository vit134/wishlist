import {
    GET_PHOTOS_REQUEST,
    GET_PHOTOS_SUCCESS,
    GET_PHOTOS_ERROR,
    GET_PHOTOS_BY_YEAR,
    SORT_BY_LIKES
} from '../actions/PageActions';

const initialState = {
    year: new Date().getFullYear(),
    years: [],
    allPhotos: {},
    currentPhotos: [],
    error: '',
    isFetching: false,
    sorting: {
        likes: true
    }
};

export function pageReducer(state = initialState, action) {
    function sortByLikes(a, b) {
        let result;
        if (state.sorting.likes) {
            result = b.likes.count - a.likes.count;
        } else {
            result = a.likes.count - b.likes.count;
        }
        return result;
    }

    switch (action.type) {
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
    }
}
