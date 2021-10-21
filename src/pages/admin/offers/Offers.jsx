import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import PageLayout from '../../../components/admin/layout/PageLayout';
import OffersTable from '../../../components/admin/offers/offersTable/OffersTable';
import { deleteOfferAction, getAllOffersAction, getOfferByIdAction } from '../../../redux/actions/offerActions';

const Offers = () => {

  const offers = useSelector(state => state.offers.offerList);
  const dispatch = useDispatch();
  const history = useHistory();
  
  useEffect(() => {
    handleGetAllOffers()
  }, [dispatch])

  const handleGetAllOffers = () => {
    dispatch(getAllOffersAction());
  }

  const handleGetOfferById = (id) => {
    dispatch(getOfferByIdAction(id));
  }

  const handleDeleteOffer = (id) => {
    dispatch(deleteOfferAction(id));
  }

  const handleOpenAddOffer = () => {
    history.push('/admin/offers/addOffer');
  }
  
  return (
    <PageLayout selectedNav='offers' crumbs={['Offers']}> 
      <OffersTable 
        offers={offers} 
        setOfferClicked={handleGetOfferById} 
        handleAddOfferVisible={handleOpenAddOffer}
        handleDeleteOffer={handleDeleteOffer} />
    </PageLayout>
  );
}

export default Offers;