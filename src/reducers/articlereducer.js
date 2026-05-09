const initialState = {
  article: [],
};

export default function articleState(state = initialState, action) {
  switch (action.type) {
    case 'ARTICLES_SET':
      return { ...state, article: action.articles || [] };
    default:
      return state;
  }
}
