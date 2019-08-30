import React, { useState, useEffect } from 'react';
import  { FirebaseContext } from './firebase';
import { withFirebase } from './firebase';
import { Item, Dropdown } from 'semantic-ui-react'
const _ = require('lodash');

const DiaryItemBase= (props) => {
   const [article, setArticle] = useState([]);
   const [category, setCategory] = useState([]);
   const articles=[];
   // Similar to componentDidMount and componentDidUpdate:
   useEffect(() => {
     //Update the document title using the browser API
    //  document.title = `You clicked ${count} times`;
    props.firebase.blogs().once('value').then(snapshot => {
      console.log(snapshot.val());
      for (var key in snapshot.val()) {
        articles.push(snapshot.val()[key]);
  
      }
      setArticle(articles);
     });

     props.firebase.category().once('value').then(snapshot=>{
       console.log(snapshot.val());
        const categoryOptions = _.map(snapshot.val(), (category,index) => ({
        key: snapshot.val()[index],
        text: category,
        value: snapshot.val()[index]
      }))
      setCategory(categoryOptions);
     })
   },[]);


  return (
    <div>
      <Dropdown placeholder='State' search selection options={category}/>
      <Item.Group>
      {article.slice(0).reverse().map((value)=>{
          return <Item>
            <Item.Image size='tiny' src='https://react.semantic-ui.com/images/wireframe/image.png' />
            <Item.Content>
              <Item.Header as='a'>{value.title}</Item.Header>
              <Item.Description>{value.comment}</Item.Description>
              {console.log(value.mediaLink)}
              <Item.Extra> {value.mediaLink.includes("embed")?
              <iframe src={value.mediaLink}  allowFullScreen="allowFullScreen" frameBorder="0"  height="400" width="600"></iframe>:""}</Item.Extra>
            </Item.Content>
          </Item>
      })}
      </Item.Group>
      </div>

  );
};
const DiaryItem = withFirebase(DiaryItemBase);
export default DiaryItem;