const initialState = {
  searchResult: null,
};

export default function searchResultState(state = initialState, action) {
  switch (action.type) {
    case 'SEARCH_SET':
      return { ...state, searchResult: action.searchResult };
    default:
      return state;
  }
}
