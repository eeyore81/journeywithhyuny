import React, { useState, useEffect } from 'react';
import { BrowserRouter, Match,Route, Miss, Link } from 'react-router-dom';

import { Menu } from 'semantic-ui-react'

const Header = () => {

    return (
        <div className="ui secondary  menu">
        <div className="item">
        <Link to="/diary"> diaries</Link>
        <Link className="item" to="/new"> new article</Link>
        <Link className="item" to="/about">About Us</Link>
        </div>
        <div className="right menu">
            <div className="item">
            <div className="ui icon input">
                <input type="text" placeholder="Search..."/>
                <i className="search link icon"></i>
            </div>
            </div>
            <Link className="ui item">
            Logout
            </Link>
        </div>
        </div>
    );
}

export default Header;