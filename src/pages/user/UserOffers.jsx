import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageLayout from '../../components/user/layout/PageLayout';
import OfferList from '../../components/user/offers/OfferList';
import { getAllOffersAction } from '../../redux/actions/offerActions';

const UserOffers = () => {

  const dispatch = useDispatch();
  const offerList = useSelector(state => state.offers.offerList);

  useEffect(() => {
    handleGetAllOffers();
  }, [])

  const handleGetAllOffers = () => {
    dispatch(getAllOffersAction());
  }


  return(
    <React.Fragment>
      <PageLayout selectedNav='offers'>
        <OfferList offerList={offerList} />
      </PageLayout>
    </React.Fragment>
  );
}

export default UserOffers;