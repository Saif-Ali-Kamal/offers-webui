import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import PageLayout from '../../../components/admin/layout/PageLayout';
import OffersTable from '../../../components/admin/offers/offersTable/OffersTable';
import { deleteOfferAction, getAllOffersAction, getOfferByIdAction } from '../../../redux/actions/offerActions';

const Offers = () => {

  const { offerList, status } = useSelector(state => state.offers);
  const dispatch = useDispatch();
  const history = useHistory();
  
  useEffect(() => {
    handleGetAllOffers();
  }, [])

  const handleGetAllOffers = () => {
    dispatch(getAllOffersAction());
  }

  const handleDeleteOffer = (id) => {
    dispatch(deleteOfferAction(id))
      .then(() => handleGetAllOffers());
  }

  const handleOpenAddOffer = () => {
    history.push('/admin/offers/addOffer');
  }

  const handleOpenEditOffer = (id) => {
    dispatch(getOfferByIdAction(id))
      .then(() => history.push('/admin/offers/editOffer')); 
  }

  return (
    <PageLayout selectedNav='offers' crumbs={[{ text: 'Offers' }]} status={status}> 
      <OffersTable 
        offers={offerList} 
        handleAddOfferVisible={handleOpenAddOffer}
        handleEditOfferVisible={handleOpenEditOffer}
        handleDeleteOffer={handleDeleteOffer} />
    </PageLayout>
  );
}

export default Offers;