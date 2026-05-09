import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FirebaseContext from './firebase/context';
import NewDiary from './newdiary';
const _ = require('lodash');

const NewDiaryContainer = () => {
  const [category, setCategory] = useState([]);
  const firebase = useContext(FirebaseContext);
  const navigate = useNavigate();
  const location = useLocation();
  const updateData = location.state?.update;

  const getCategoryOptionsFromArticles = (articles) => {
    const categories = _.uniq(
      articles
        .map((item) => item.category)
        .filter((category) => typeof category === 'string' && category.trim().length > 0)
    );

    if (updateData?.category) {
      const currentCategory = updateData.category.trim();
      if (currentCategory && !categories.includes(currentCategory)) {
        categories.unshift(currentCategory);
      }
    }

    return categories.map((category, index) => ({
      key: index,
      text: category,
      value: category,
    }));
  };

  useEffect(() => {
    const loadCategories = async () => {
      const blogsData = await firebase.getBlogs();
      const articles = Object.keys(blogsData).map((key) => ({ ...blogsData[key], key }));
      setCategory(getCategoryOptionsFromArticles(articles));
    };
    loadCategories();
  }, [firebase, updateData]);

  const onSubmitHandler = async (values) => {
    let mediaLink = values.mediaLink || '';

    if (values.mediaFile) {
      const fileName = `${Date.now()}-${values.mediaFile.name}`;
      const path = fileName;
      mediaLink = await firebase.uploadImage(values.mediaFile, path);
    }

    const payload = {
      title: values.title,
      category: values.category,
      comment: values.comment || '',
      mediaLink,
    };

    if (updateData != undefined) {
      await firebase.updateBlog(updateData.key, payload);
    } else {
      await firebase.addBlog(payload);
    }
    navigate('/diary');
  };

  return <NewDiary onSubmit={onSubmitHandler} categoryOptions={category} update={updateData} />;
};

export default NewDiaryContainer;
