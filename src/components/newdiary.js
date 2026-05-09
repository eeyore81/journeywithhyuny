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
  const [selectedCategory, setSelectedCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [comment, setComment] = useState('');
  const [mediaLink, setMediaLink] = useState('');

  useEffect(() => {
    if (update) {
      setTitle(update.title || '');
      setSelectedCategory(update.category || '');
      setCustomCategory('');
      setComment(update.comment || '');
      setMediaLink(update.mediaLink || '');
    }
  }, [update]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const category = customCategory.trim() || selectedCategory;
    onSubmit({ title, category, comment, mediaLink });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2, maxWidth: 720 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {update ? 'Edit Diary' : 'New Diary'}
      </Typography>
      <Stack spacing={2}>
        <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <FormControl fullWidth variant="outlined">
          <InputLabel id="new-diary-category-label" shrink>
            Category
          </InputLabel>
          <Select
            labelId="new-diary-category-label"
            value={selectedCategory}
            label="Category"
            variant="outlined"
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCustomCategory('');
            }}
            displayEmpty
            renderValue={(selected) => (selected ? selected : <em>None</em>)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {categoryOptions.map((item) => (
              <MenuItem key={item.key} value={item.value}>
                {item.text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Or enter a new category"
          fullWidth
          value={customCategory}
          onChange={(e) => {
            const value = e.target.value;
            setCustomCategory(value);
            setSelectedCategory(value);
          }}
          helperText="If you type a category here, it will override the selected category."
        />
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
