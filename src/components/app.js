import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import DiaryItem from './diaryitem';
import Header from './header';
import AboutUs from './about';
import MainPage from './mainpage';
import NewDiaryContainer from './newdiaryContainer';


export default class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Header/>
        <Switch>
          <Route exact path="/main" component={MainPage}/>
          <Route exact path="/diary" component={DiaryItem}/>
          <Route exact path="/new" component={NewDiaryContainer}/>
          <Route exact path="/about" component={AboutUs}/>
          <Redirect to="/main"/>
        </Switch>
      </BrowserRouter>
    );
  }
}
