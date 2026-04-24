import React, { useState, useEffect } from 'react';
import { withFirebase } from './firebase';
import NewDairy from './newdiary'; 
import { Redirect } from 'react-router-dom';
const _ = require('lodash');

const NewDiaryContainer = (props) => {
    const [redirect, setRedirect] = useState(0);
    const [category, setCategory] = useState([]);
    const updateData = props.location && props.location.update;

    useEffect(()=>{
      props.firebase.category().once('value').then(snapshot=>{
         const categoryOptions = _.map(snapshot.val() || [], (category,index) => ({
         key: index,
         text: category,
         value: category
       }))
       setCategory(categoryOptions);
      });
    },[]);
    const onSubmitHandler = (values) => {
        if(updateData != undefined) {
          let ref = props.firebase.blogs().child(updateData.key);
          ref.set(values);
        } else {
        props.firebase.blogs().push({title: values.title, category: values.category, comment: values.comment || "", mediaLink: values.mediaLink || ""})
        }
        setRedirect(1);
    }
    if(redirect === 1)
        return (<Redirect to='/diary'/>);
    return <NewDairy onSubmit={onSubmitHandler} categoryOptions = {category} update= {updateData}/>;
};

export default withFirebase(NewDiaryContainer);