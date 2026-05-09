import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

const NewDiary = ({ onSubmit, categoryOptions, update }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [comment, setComment] = useState('');
  const [mediaLink, setMediaLink] = useState('');

  useEffect(() => {
    if (update) {
      setTitle(update.title || '');
      setCategory(update.category || '');
      setComment(update.comment || '');
      setMediaLink(update.mediaLink || '');
    }
  }, [update]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ title, category, comment, mediaLink });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2, maxWidth: 720 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {update ? 'Edit Diary' : 'New Diary'}
      </Typography>
      <Stack spacing={2}>
        <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <FormControl>
          <InputLabel id="new-diary-category-label">Category</InputLabel>
          <Select
            labelId="new-diary-category-label"
            value={category}
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
          >
            {categoryOptions.map((item) => (
              <MenuItem key={item.key} value={item.value}>
                {item.text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Comment"
          multiline
          minRows={5}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <TextField
          label="Media Link (embed URL)"
          value={mediaLink}
          onChange={(e) => setMediaLink(e.target.value)}
        />
        <Box>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default NewDiary;
