import React, { useState, useEffect } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom';


const renderTextArea = ({input, meta: { touched, error, warning }}) => (
    <div>
        <label>Content</label>
        <div>
            <textarea {...input} placeholder="Content" rows="10" cols="40"/>
            {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    </div>
);

let NewDiary = props => {
    const { handleSubmit, content } = props
    
    return (
        <Form onSubmit={handleSubmit}>      
        <div>
        <label htmlFor="title">Title</label>
        <Field name="title" component="input" type="text" />
      </div>
      <div>
        <Field name="comment" component={renderTextArea} {...content}/>
      </div>
      <div>
        <label htmlFor="mediaLink">Media Link</label>
        <Field name="mediaLink" component="input" type="text" />
      </div>
      <button type="submit">Submit</button>
    </Form>
    );
};

NewDiary = reduxForm({
    // a unique name for the form
    form: 'newDiary',

  })(NewDiary);
export default NewDiary;