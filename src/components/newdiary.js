import React, { useEffect } from 'react';
import { Field, reduxForm } from 'redux-form'
import { Form, Dropdown } from 'semantic-ui-react'

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
    useEffect(()=>{
    if(props.update != undefined){
      props.initialize({ title: props.update.title,category:props.update.category,comment:props.update.comment,mediaLink:props.update.mediaLink });
    }
  },[props.update, props.initialize]);
    // need to make container to add handler and receive values from redux-form
    return (
        <Form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="Category">Title</label>
          <Field component={DropdownFormField} name="category" label='Select categories' selection options={props.categoryOptions}>
          </Field>
        </div>        
        <div className="field">
        <label htmlFor="title">Title</label>
        <Field name="title" component="input" type="text" />
      </div>
      <div className="field">
        <Field name="comment" component={renderTextArea} {...content}/>
      </div>
      <div className="field">
        <label htmlFor="mediaLink">Media Link</label>
        <Field name="mediaLink" component="input" type="text" />
      </div>
      <div className="ui right aligned container">
        <div>
          <button className="ui right button" type="submit">Submit</button>
        </div>
      </div>
    </Form>
    );
};

NewDiary = reduxForm({
    // a unique name for the form
    form: 'newDiary',

  })(NewDiary);
export default NewDiary;

const DropdownFormField = props => (
  <Form.Field>
    <Dropdown selection {...props.input}
              options={props.options}
              value={props.input.value}
              onChange={(param,data) => props.input.onChange(data.value)}
              placeholder={props.label} 
     />
   </Form.Field>
 )