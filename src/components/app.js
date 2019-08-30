import React, { Component } from 'react';
import { BrowserRouter, Match,Route, Miss, Link } from 'react-router-dom';
import DiaryItem from './diaryitem';
import Header from './header';
import AboutUs from './about';
import NewDiaryContainer from './newdiaryContainer';
export default class App extends Component {

  render() {
    return (
      <div>
      <BrowserRouter>
        <Header/>
        <div>
        <Route path="/diary" component={DiaryItem}/>
        <Route path="/new" component={NewDiaryContainer}/>
        <Route path="/about" component={AboutUs}/>
        </div>
      </BrowserRouter>
      </div>
    );
  }
}
