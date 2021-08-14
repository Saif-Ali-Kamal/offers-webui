import React from 'react';
import PageLayout from '../../components/user/layout/PageLayout';
import Banner from '../../components/user/home/Banner';

const Home = () => {

  return(
    <React.Fragment>
      <PageLayout selectedNav='home'>
        <Banner />
      </PageLayout>
    </React.Fragment>
  );
}

export default Home;