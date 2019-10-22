import React from 'react';
import {Container, Header,Icon,Image,Grid } from 'semantic-ui-react';

const AboutUs = () => {
    return (<Container>
        <Header as="h1" icon textAlign="center">
        <div>
          <Icon name='users' circular/>
          </div>
          <Header.Content> Our Family</Header.Content>
        </Header>
        <Grid divided inverted stackable textAlign="center">
          <Grid.Column width={5}>
          <Image
      centered
      size='large'
      src='/images/cat.jpg'
    />
              </Grid.Column>
              <Grid.Column width={5}>
          <Image
      centered
      size='large'
      src='/images/cat.jpg'
    />
              </Grid.Column>
              <Grid.Column width={5}>
          <Image
      centered
      size='large'
      src='/images/cat.jpg'
    />
              </Grid.Column>
            </Grid>
        <br></br>
        <br></br>
        </Container>);
}


export default AboutUs;