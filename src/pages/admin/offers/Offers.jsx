import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import PageLayout from '../../../components/admin/layout/PageLayout';
import OffersTable from '../../../components/admin/offers/offersTable/OffersTable';
import { addOfferAction, deleteOfferAction, getAllOffersAction, updateOfferAction } from '../../../redux/actions/offerActions';

const Offers = () => {

  const [addOfferModalVisible, setAddOfferModalVisible] = useState(false);
  const [offerClicked, setOfferClicked] = useState('');
  const offers = useSelector(state => state?.offers?.offerList);
  const offerClickedInfo = offers
  const dispatch = useDispatch();
  const history = useHistory();
  
  useEffect(() => {
    handleGetAllOffers();
  }, [])

  const handleGetAllOffers = () => {
    dispatch(getAllOffersAction());
  }

  const handleDeleteOffer = (id) => {
    // deleteOffer(id).then(({msg}) => {
    //   notify('success', 'Offer deleted successfully', msg);
    //   const newOffers = offers.filter(offer => offer.id !== id);
    //   dispatch(set('offers', newOffers))
    // }).catch(ex => notify('error', 'Error in deleting offer', ex))
    dispatch(deleteOfferAction(id));
  }

  const handleCancelOffer = () => { 
    setAddOfferModalVisible(false);
    setOfferClicked('');
  }

  const handleOpenAddOffer = () => {
    history.push('/admin/offers/addOffer');
  }
  
  return (
    <PageLayout selectedNav='offers' crumbs={['Offers']}> 
      <OffersTable 
        offers={offers} 
        setOfferClicked={(value) => setOfferClicked(value)} 
        handleAddOfferVisible={handleOpenAddOffer}
        handleDeleteOffer={(id) => handleDeleteOffer(id)} />
      {/* {addOfferModalVisible && <AddOffer
        initialvalues={offerClickedInfo}
        handleAddOffer={handleAddOffer}
        handleEditOffer={handleEditOffer}
        handleCancelOffer={handleCancelOffer} />}  */}
    </PageLayout>
  );
}

export default Offers;