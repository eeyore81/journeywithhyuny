import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import FirebaseContext from './firebase/context';
import { Button, Dropdown, Segment, Header, Container, Label } from 'semantic-ui-react';
import './diaryitem.css';
const _ = require('lodash');

const DiaryItem = () => {
  const [article, setArticle] = useState([]);
  const [category, setCategory] = useState([]);
  const [categorySelected, setCategorySelected] = useState('');
  const dispatch = useDispatch();
  const searchResult = useSelector((state) => state.searchResultState.searchResult);
  const firebase = useContext(FirebaseContext);
  const history = useHistory();

  useEffect(() => {
    const loadData = async () => {
      const blogsData = await firebase.getBlogs();
      const articles = Object.keys(blogsData).map((key) => ({ ...blogsData[key], key }));
      setArticle(articles);
      dispatch({ type: 'ARTICLES_SET', articles });

      const categories = await firebase.getCategories();
      const categoryOptions = _.map(categories || [], (category, index) => ({
        key: index,
        text: category,
        value: category,
      }));
      setCategory(categoryOptions);
    };
    loadData();
  }, [dispatch, firebase]);

  const handleChange = (e, { value }) => setCategorySelected(value);

  return (
    <div>
      <Dropdown
        placeholder="Select categories"
        selection
        options={category}
        value={categorySelected}
        onChange={handleChange}
      />
      {article.slice(0).reverse().map((value) => {
        if (
          (searchResult == null || (value.title || '').includes(searchResult)) &&
          (!categorySelected || value.category === categorySelected)
        ) {
          return (
            <Container key={value.key} style={{ margin: 20 }}>
              <Segment attached="top">
                <div className="ui grid">
                  <div className="thirteen wide column">
                    <Label
                      color={value.category != undefined && value.category.includes('Hyuny') === true ? 'red' : 'blue'}
                      content={value.category}
                      style={{ display: 'inline' }}
                      ribbon
                    />
                    <Header as="h3" content={value.title} style={{ display: 'inline' }} />
                  </div>
                  <div className="three wide column">
                    <Button
                      size="tiny"
                      onClick={() => {
                        history.push('/new', { update: value });
                      }}
                    >
                      Modify
                    </Button>
                    <Button
                      size="tiny"
                      onClick={() => {
                        firebase.removeBlog(value.key);
                        setArticle(article.filter((article) => article.key !== value.key));
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Segment>
              <Segment attached="bottom">
                <Container style={{ whiteSpace: 'pre-line' }}>
                  {value.comment}
                  {value.mediaLink && value.mediaLink.includes('embed') ? (
                    <iframe
                      src={value.mediaLink}
                      allowFullScreen
                      frameBorder="0"
                      style={{ display: 'block', height: '80vh', width: '65vw' }}
                    />
                  ) : (
                    ''
                  )}
                </Container>
              </Segment>
            </Container>
          );
        }
        return null;
      })}
    </div>
  );
};

export default DiaryItem;
