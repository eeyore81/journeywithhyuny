import React, { useEffect, useState } from 'react';
import { Form, Dropdown, TextArea, Button } from 'semantic-ui-react';

const NewDiary = ({ onSubmit, categoryOptions, update = {} }) => {
  const [formValues, setFormValues] = useState({
    title: '',
    category: '',
    comment: '',
    mediaLink: '',
  });

  useEffect(() => {
    if (update) {
      setFormValues({
        title: update.title || '',
        category: update.category || '',
        comment: update.comment || '',
        mediaLink: update.mediaLink || '',
      });
    }
  }, [update]);

  const handleChange = (e, { name, value }) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <label htmlFor="category">Category</label>
        <Dropdown
          selection
          name="category"
          placeholder="Select categories"
          options={categoryOptions}
          value={formValues.category}
          onChange={handleChange}
        />
      </Form.Field>

      <Form.Field>
        <label htmlFor="title">Title</label>
        <Form.Input
          name="title"
          value={formValues.title}
          onChange={handleChange}
          placeholder="Title"
        />
      </Form.Field>

      <Form.Field>
        <label htmlFor="comment">Content</label>
        <TextArea
          name="comment"
          value={formValues.comment}
          onChange={handleChange}
          placeholder="Content"
          rows={10}
        />
      </Form.Field>

      <Form.Field>
        <label htmlFor="mediaLink">Media Link</label>
        <Form.Input
          name="mediaLink"
          value={formValues.mediaLink}
          onChange={handleChange}
          placeholder="Media Link"
        />
      </Form.Field>

      <Button primary type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default NewDiary;
