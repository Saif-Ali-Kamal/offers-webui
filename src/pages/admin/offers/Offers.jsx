import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageLayout from '../../../components/admin/layout/PageLayout';
import OffersTable from '../../../components/admin/offers/offersTable/OffersTable';
import AddOffer from '../../../components/admin/offers/addOffer/AddOffer';
import { addOfferAction, deleteOfferAction, getAllOffersAction, updateOfferAction } from '../../../redux/actions/offerActions';

const Offers = () => {

  const [addOfferModalVisible, setAddOfferModalVisible] = useState(false);
  const [offerClicked, setOfferClicked] = useState('');
  const offers = useSelector(state => state.offers.offerList);
  const offerClickedInfo = offers
  const dispatch = useDispatch();
  
  useEffect(() => {
    handleGetAllOffers();
  }, [])

  const handleGetAllOffers = () => {
    dispatch(getAllOffersAction());
  }

  const handleAddOffer = (offer) => {
    dispatch(addOfferAction(offer));
  }

  const handleEditOffer = (id, editedOffer) => {
    // updateOffer(id, updatedOffer).then(({msg}) => {
    //   notify('success', 'Offer updated successfully', msg);
    //   offers.map(offer => {
    //     if(offer.id === id) {
    //       updatedOffer.map(changedOffer => {
    //         return offer[changedOffer.propName] = changedOffer.value;
    //       })
    //     }
    //     return offer
    //   })
    // }).catch(ex => notify('error', 'Error in updating offer', ex))
    const updatedOffer = { id, editedOffer };
    dispatch(updateOfferAction(updatedOffer));
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
  
  return (
    <PageLayout selectedNav='offers' crumbs={['Offers']}> 
      <OffersTable 
        offers={offers} 
        setOfferClicked={(value) => setOfferClicked(value)} 
        handleAddOfferVisible={() => setAddOfferModalVisible(true)}
        handleDeleteOffer={(id) => handleDeleteOffer(id)} />
      {addOfferModalVisible && <AddOffer
        initialvalues={offerClickedInfo}
        handleAddOffer={handleAddOffer}
        handleEditOffer={handleEditOffer}
        handleCancelOffer={handleCancelOffer} />} 
    </PageLayout>
  );
}

export default Offers;