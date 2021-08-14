import React from 'react';
import { useSelector } from 'react-redux';
import PageLayout from '../../components/user/layout/PageLayout';
import OfferList from '../../components/user/offers/OfferList';

const UserOffers = () => {

  const offers = useSelector(state => state.offers)

  return(
    <React.Fragment>
      <PageLayout selectedNav='offers'>
        <OfferList offers={offers} />
      </PageLayout>
    </React.Fragment>
  );
}

export default UserOffers;