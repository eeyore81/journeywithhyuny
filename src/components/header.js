import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Search } from "semantic-ui-react";

const Header = () => {
    const [result, setResult] = useState([]);
    const [value, setValue] = useState('');
    const articles = useSelector(state => state.articleState.articles || []);
    const isLoggedIn = useSelector(state =>
        state.authState.isLoggedIn);
    const dispatch = useDispatch();
    const handleResultSelect = (e, { result }) =>{
        setValue(result.title);
        dispatch({type :'SEARCH_RESULT_SET', searchResult : result.title})
    }
    const handleSearchChange = (e, { value }) => {
        const nextValue = value || '';
        setValue(nextValue);
        dispatch({type :'SEARCH_RESULT_SET', searchResult : nextValue || null});

        const filtered = articles.filter((item) => {
            const title = (item && item.title) ? String(item.title) : '';
            return title.toLowerCase().includes(nextValue.toLowerCase());
        });
        setResult(filtered);
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
                                <Search
                                    value={value}
                                    onResultSelect={handleResultSelect}
                                    onSearchChange={handleSearchChange}
                                    results={result.map((item,index)=>({
                                        key:index,
                                        title:item.title,
                                        description:item.comment
                                    }))}
                                />
            </div>
            </div>
            {isLoggedIn?<Link className="ui item" to="/logout">Logout</Link>:<Link className="ui item" to="/login">Login</Link>}
        </div>
        </div>
    );
}

export default Header;