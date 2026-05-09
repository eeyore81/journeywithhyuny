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
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [existingMediaLink, setExistingMediaLink] = useState('');

  useEffect(() => {
    if (update) {
      setTitle(update.title || '');
      setSelectedCategory(update.category || '');
      setCustomCategory('');
      setComment(update.comment || '');
      setExistingMediaLink(update.mediaLink || '');
      setImagePreviewUrl(update.mediaLink || '');
    }
  }, [update]);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0] || null;
    setImageFile(file);

    if (file) {
      setImagePreviewUrl(URL.createObjectURL(file));
    } else {
      setImagePreviewUrl(existingMediaLink);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const category = customCategory.trim() || selectedCategory;
    onSubmit({
      title,
      category,
      comment,
      mediaLink: existingMediaLink,
      mediaFile: imageFile,
    });
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
        <Box>
          <Button variant="outlined" component="label">
            Upload image
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={handleFileChange}
            />
          </Button>
          {imagePreviewUrl && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2">Image preview</Typography>
              <Box
                component="img"
                src={imagePreviewUrl}
                alt="Selected"
                sx={{ width: '100%', maxHeight: 360, objectFit: 'contain', mt: 1 }}
              />
            </Box>
          )}
        </Box>
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
