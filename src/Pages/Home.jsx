import React from 'react';
import {Header, Banner, Posts, Footer} from '../Components'


const Home = (props) => {
  return (
    <div className="homeParentDiv">
      <Header />
      <Banner />
      <Posts />
      <Footer />
    </div>
  );
}

export default Home;
 
