import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FirebaseContext from './firebase/context';
import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import './diaryitem.css';
const _ = require('lodash');

const DiaryItem = () => {
  const [article, setArticle] = useState([]);
  const [category, setCategory] = useState([]);
  const [categorySelected, setCategorySelected] = useState('');
  const dispatch = useDispatch();
  const searchResult = useSelector((state) => state.searchResultState.searchResult);
  const firebase = useContext(FirebaseContext);
  const navigate = useNavigate();

  const getCategoryOptionsFromArticles = (articles) => {
    const categories = _.uniq(
      articles
        .map((item) => item.category)
        .filter((category) => typeof category === 'string' && category.trim().length > 0)
    );
    return categories.map((category, index) => ({
      key: index,
      text: category,
      value: category,
    }));
  };

  useEffect(() => {
    const loadData = async () => {
      const blogsData = await firebase.getBlogs();
      const articles = Object.keys(blogsData).map((key) => ({ ...blogsData[key], key }));
      setArticle(articles);
      dispatch({ type: 'ARTICLES_SET', articles });
      setCategory(getCategoryOptionsFromArticles(articles));
    };
    loadData();
  }, [dispatch, firebase]);

  useEffect(() => {
    const nextCategoryOptions = getCategoryOptionsFromArticles(article);
    setCategory(nextCategoryOptions);
    if (categorySelected && !nextCategoryOptions.some((item) => item.value === categorySelected)) {
      setCategorySelected('');
    }
  }, [article, categorySelected]);

  const handleChange = (event) => setCategorySelected(event.target.value);

  return (
    <Box>
      <FormControl fullWidth size="small" variant="outlined" sx={{ minWidth: 260, mb: 2 }}>
        <InputLabel id="category-select-label" shrink>
          Select categories
        </InputLabel>
        <Select
          labelId="category-select-label"
          label="Select categories"
          variant="outlined"
          displayEmpty
          value={categorySelected}
          onChange={handleChange}
          renderValue={(selected) => (selected ? selected : <em>All categories</em>)}
        >
          <MenuItem value="">
            <em>All categories</em>
          </MenuItem>
          {category.map((item) => (
            <MenuItem key={item.key} value={item.value}>
              {item.text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {article.slice(0).reverse().map((value) => {
        if (
          (searchResult == null || (value.title || '').includes(searchResult)) &&
          (!categorySelected || value.category === categorySelected)
        ) {
          return (
            <Paper key={value.key} elevation={1} sx={{ m: 2, overflow: 'hidden' }}>
              <Box sx={{ borderBottom: '1px solid #e9ecef', p: 2 }}>
                <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" gap={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                    <Chip
                      color={value.category != undefined && value.category.includes('Hyuny') === true ? 'error' : 'primary'}
                      label={value.category || 'Uncategorized'}
                      size="small"
                    />
                    <Typography variant="h6">{value.title}</Typography>
                  </Box>
                  <Stack direction="row" spacing={1}>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => {
                        navigate('/new', { state: { update: value } });
                      }}
                    >
                      Modify
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      variant="outlined"
                      onClick={() => {
                        firebase.removeBlog(value.key);
                        setArticle(article.filter((article) => article.key !== value.key));
                      }}
                    >
                      Delete
                    </Button>
                  </Stack>
                </Stack>
              </Box>
              <Box sx={{ p: 2, whiteSpace: 'pre-line' }}>
                {value.comment}
                {value.mediaLink ? (
                  value.mediaLink.includes('embed') ? (
                    <iframe
                      src={value.mediaLink}
                      allowFullScreen
                      frameBorder="0"
                      style={{ display: 'block', height: '80vh', width: '65vw', marginTop: 16 }}
                    />
                  ) : (
                    <Box component="img" src={value.mediaLink} alt={value.title} sx={{ display: 'block', maxWidth: '100%', maxHeight: 500, mt: 2 }} />
                  )
                ) : null}
              </Box>
            </Paper>
          );
        }
        return null;
      })}
    </Box>
  );
};

export default DiaryItem;
