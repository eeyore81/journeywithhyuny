import React, { Component } from 'react';
import { BrowserRouter, Match,Route, Miss, Link } from 'react-router-dom';
import {Redirect} from 'react-router';
import DiaryItem from './diaryitem';
import Header from './header';
import AboutUs from './about';
import MainPage from './mainpage';
import NewDiaryContainer from './newdiaryContainer';


export default class App extends Component {

  render() {
    return (
      <div>
      <BrowserRouter>
        <Header/>
        <div>
        <Route path="/" component={MainPage}/>
        <Route name="diary" path="/diary" component={DiaryItem}/>
        <Route path="/new" component={NewDiaryContainer}/>
        <Route path="/about" component={AboutUs}/>
        </div>
      </BrowserRouter>
      </div>
    );
  }
}
