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


const applySetArticles = (state, action) => ({
    ...state,
    articles : action.articles,
});

function articleReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ARTICLE_SET': {
      return applySetArticle(state, action);
    }
    case 'ARTICLES_SET': {
      return applySetArticles(state, action);
    }
    default:
      return state;
  }
}
  
export default articleReducer;