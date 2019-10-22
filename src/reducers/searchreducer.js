const INITIAL_STATE ={
    searchResult : null,
};

const applySetSearchResult = (state, action) => ({
    ...state,
    searchResult : action.searchResult
});


function searchResultReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case 'SEARCH_RESULT_SET': {
        return applySetSearchResult(state, action);
      }

      default:
        return state;
    }
  }
  
  export default searchResultReducer;