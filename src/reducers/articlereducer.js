const INITIAL_STATE ={
    articles : null,
};

const applySetArticle = (state, action) => ({
    ...state,
    articles : {
        ...state.articles,
        [action.uid] : action.article,
    },
});

function articleReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
    //   case 'USERS_SET': {
    //     return applySetUsers(state, action);
    //   }
      case 'ARTICLE_SET': {
        return applySetArticle(state, action);
      }
      default:
        return state;
    }
  }
  
  export default articleReducer;