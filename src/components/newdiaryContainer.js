import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import FirebaseContext from './firebase/context';
import NewDiary from './newdiary';
const _ = require('lodash');

const NewDiaryContainer = () => {
  const [category, setCategory] = useState([]);
  const firebase = useContext(FirebaseContext);
  const history = useHistory();
  const location = useLocation();
  const updateData = location.state?.update;

  useEffect(() => {
    const loadCategories = async () => {
      const categories = await firebase.getCategories();
      const categoryOptions = _.map(categories || [], (category, index) => ({
        key: index,
        text: category,
        value: category,
      }));
      setCategory(categoryOptions);
    };
    loadCategories();
  }, [firebase]);

  const onSubmitHandler = async (values) => {
    if (updateData != undefined) {
      await firebase.updateBlog(updateData.key, values);
    } else {
      await firebase.addBlog({
        title: values.title,
        category: values.category,
        comment: values.comment || '',
        mediaLink: values.mediaLink || '',
      });
    }
    history.push('/diary');
  };

  return <NewDiary onSubmit={onSubmitHandler} categoryOptions={category} update={updateData} />;
};

export default NewDiaryContainer;
