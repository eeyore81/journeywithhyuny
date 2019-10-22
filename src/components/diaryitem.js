import React, { useState, useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import  { FirebaseContext } from './firebase';
import { withFirebase } from './firebase';
import { Redirect } from 'react-router-dom';
import { Button, Dropdown,Segment,Header,Container,Label } from 'semantic-ui-react';
import './diaryitem.css'
const _ = require('lodash');

const DiaryItemBase= (props) => {
   const [article, setArticle] = useState([]);
   const [category, setCategory] = useState([]);
   const [categorySelected, setCategorySelected] = useState([]);
   const articles=[];
   const dispatch= useDispatch();
   const searchResult = useSelector((state)=>state.searchResultState.searchResult);

   // Similar to componentDidMount and componentDidUpdate:
   useEffect(() => {
     //Update the document title using the browser API
    //  document.title = `You clicked ${count} times`;
    props.firebase.blogs().once('value').then(snapshot => {
    //  console.log(snapshot.val());
      for (var key in snapshot.val()) {
        articles.push({...snapshot.val()[key],key} );
  
      }
      setArticle(articles);
      dispatch({type : 'ARTICLES_SET', articles : articles})
     });
     props.firebase.category().once('value').then(snapshot=>{
       console.log(snapshot.val());
        const categoryOptions = _.map(snapshot.val(), (category,index) => ({
        key: index,
        text: category,
        value: category
      }))
      setCategory(categoryOptions);
     });
   },[]);

   
  const handleChange = (e, { value }) => setCategorySelected({ value })

  return (
    <div>
      <Dropdown placeholder='Select categories' selection options={category} value={categorySelected.value} onChange={handleChange} />
      {console.log("check"+searchResult)}{
        article.slice(0).reverse().map((value)=>{
        if((searchResult==null || value.title.includes(searchResult)) && (categorySelected.value==undefined || value.category == categorySelected.value)) {
          return <Container style={{ margin: 20 }}>
            <Segment attached="top">
              <div className="ui grid">
              <div className="thirteen wide column">
              <Label color={value.category!=undefined && value.category.includes("Hyuny")==true?"red":"blue"} content={value.category} style={{display:"inline"}} ribbon/>
              <Header as="h3" content={value.title} style={{display:"inline"}}/>
              </div>
              <div className="three wide column">
              <Button size="tiny" onClick={()=>{
                let data = article.filter((token)=>(token.key == value.key));
                console.log(data);
                props.history.push({pathname:'/new',update: data[0]});}}>
              Modify</Button>
              <Button size="tiny" onClick={()=>{props.firebase.blogs().child(value.key).remove();setArticle(article.filter((article)=>(article.key != value.key))); }}>Delete</Button>
              </div>
              </div>
            </Segment>
            <Segment attached="bottom">
            <Container style={{"white-space": "pre-line"}}>
            {value.comment}

            {value.mediaLink.includes("embed")?
              <iframe src={value.mediaLink}  allowFullScreen="allowFullScreen" frameBorder="0" style={{display:"block",height:"80vh",width:"65vw"}}></iframe>:""}
            </Container>
            </Segment>
          </Container>
        }
      })}
      </div>

  );
};
const DiaryItem = withFirebase(DiaryItemBase);
export default DiaryItem;