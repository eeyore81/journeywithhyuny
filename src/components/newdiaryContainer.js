import React, { useState, useEffect } from 'react';
import { withFirebase } from './firebase';
import NewDairy from './newdiary'; 
import { Redirect } from 'react-router-dom';

const NewDiaryContainer = (props) => {
    const [redirect, setRedirect] = useState(0);
    const onSubmitHandler = (values) => {
        props.firebase.blogs().push({title: values.title,comment: values.comment,mediaLink: values.mediaLink})
        console.log(values);
        setRedirect(1);
    }
    if(redirect ==1)
        return (<Redirect to='/diary'/>);
    return <NewDairy onSubmit={onSubmitHandler} />;
};

export default withFirebase(NewDiaryContainer);