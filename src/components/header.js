import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Match,Route, Miss, Link } from 'react-router-dom';
import { Search } from "semantic-ui-react";
import { Menu } from 'semantic-ui-react'
const _ = require('lodash');

const Header = () => {
    const [result, setResult] = useState([]);
    const [value, setValue] = useState();
    const articles = useSelector(state => 
        state.articleState.articles);
    const isLoggedIn = useSelector(state =>
        state.authState.isLoggedIn);
    const dispatch = useDispatch();
    const handleResultSelect = (e, { result }) =>{
        setValue(result.title);
        dispatch({type :'SEARCH_RESULT_SET', searchResult : result.title})
    }
    const handleSearchChange = (e, { value }) => {
        setValue(null);
        dispatch({type :'SEARCH_RESULT_SET', searchResult : result.title})
        setResult(articles.filter((item)=>{
        return item.value.title.toString().includes(value)}
        ));
    };

    return (
        <div className="ui medium menu">
        <Link className="item" to="/main">Home</Link>
        <Link className="item" to="/diary">Articles</Link>
        <Link className="item" to="/new"> Write an Article</Link>
        <Link className="item" to="/about">About Us</Link>
        <div className="right menu">
            <div className="item">
            <div className="ui icon input">
                {result.map((item)=>(console.log(item.value.title,item.value.comment)))}
                <Search onResultSelect={handleResultSelect} onSearchChange={handleSearchChange} results={result.map((item,index)=>({key:index,title:item.value.title,description:item.value.comment}))} />
            </div>
            </div>
            {isLoggedIn?<Link className="ui item" to="/logout">Logout</Link>:<Link className="ui item" to="/login">Login</Link>}
        </div>
        </div>
    );
}

export default Header;