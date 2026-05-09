import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import DiaryItem from './diaryitem';
import Header from './header';
import AboutUs from './about';
import MainPage from './mainpage';
import NewDiaryContainer from './newdiaryContainer';

const App = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/main" element={<MainPage />} />
      <Route path="/diary" element={<DiaryItem />} />
      <Route path="/new" element={<NewDiaryContainer />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="*" element={<Navigate to="/main" replace />} />
    </Routes>
  </BrowserRouter>
);

export default App;
