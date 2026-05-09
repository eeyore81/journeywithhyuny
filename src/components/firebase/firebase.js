import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const storageBucket = process.env.REACT_APP_SUPABASE_STORAGE_BUCKET || 'blog-images';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase environment variables are required: REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

class Firebase {
  constructor() {
    this.supabase = supabase;
    this.storageBucket = storageBucket;
  }

  uploadImage = async (file, path) => {
    if (!file) {
      return '';
    }

    const { error: uploadError } = await this.supabase.storage
      .from(this.storageBucket)
      .upload(path, file, { cacheControl: '3600', upsert: true });

    if (uploadError) {
      throw uploadError;
    }

    const { data, error: urlError } = this.supabase.storage
      .from(this.storageBucket)
      .getPublicUrl(path);

    if (urlError) {
      throw urlError;
    }

    return data.publicUrl;
  };

  getBlogs = async () => {
    const { data, error } = await this.supabase.from('blogs').select('*');
    if (error) {
      throw error;
    }

    const blogs = {};
    (data || []).forEach((row) => {
      blogs[row.id] = row;
    });
    return blogs;
  };

  getCategories = async () => {
    const { data, error } = await this.supabase.from('blogs').select('category').neq('category', '');

    if (error) {
      throw error;
    }

    const categories = Array.from(
      new Set((data || []).map((row) => (typeof row.category === 'string' ? row.category.trim() : '')))
    ).filter((category) => category.length > 0);

    return categories;
  };

  addBlog = async (data) => {
    const { error } = await this.supabase.from('blogs').insert([data]);
    if (error) {
      throw error;
    }
  };

  updateBlog = async (key, data) => {
    const { error } = await this.supabase.from('blogs').update(data).eq('id', key);
    if (error) {
      throw error;
    }
  };

  removeBlog = async (key) => {
    const { error } = await this.supabase.from('blogs').delete().eq('id', key);
    if (error) {
      throw error;
    }
  };
}

export default Firebase;
