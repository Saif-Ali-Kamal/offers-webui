import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { set } from 'automate-redux';
import PageLayout from '../../../components/admin/layout/PageLayout';
import OffersTable from '../../../components/admin/offers/offersTable/OffersTable';
import AddOffer from '../../../components/admin/offers/addOffer/AddOffer';
import { decrementPendingRequests, incrementPendingRequests, notify } from '../../../utils/utils';
import { addOffer, getOffers, updateOffer, deleteOffer } from '../../../services/offers';

const Offers = () => {

  const [addOfferModalVisible, setAddOfferModalVisible] = useState(false);
  const [offerClicked, setOfferClicked] = useState('');
  const offers = useSelector(state => state.offers);
  const offerClickedInfo = offers.find(offer => offer.id === offerClicked)
  const dispatch = useDispatch();
  
  useEffect(() => {
    handleGetOffers();
  }, [])

  const handleGetOffers = () => {
    getOffers().then(({msg, offers, totalOffers}) => {
      notify('success', 'Offer fetched successfully', msg);
      dispatch(set('totalOffers', totalOffers));
      dispatch(set('offers', offers));
    }).catch(ex => notify('error', 'Error in fetching offer', ex))
  }

  const handleAddOffer = (offer) => {
    addOffer(offer).then(({ msg, result}) => {
      notify('success', 'Offer added successfully', msg);
      dispatch(set('offers', [...offers, result]));
    }).catch(ex => notify('error', 'Error in adding offer', ex))
  }

  const handleEditOffer = (id, updatedOffer) => {
    updateOffer(id, updatedOffer).then(({msg}) => {
      notify('success', 'Offer updated successfully', msg);
      offers.map(offer => {
        if(offer.id === id) {
          updatedOffer.map(changedOffer => {
            return offer[changedOffer.propName] = changedOffer.value;
          })
        }
        return offer
      })
    }).catch(ex => notify('error', 'Error in updating offer', ex))
  }

  const handleDeleteOffer = (id) => {
    deleteOffer(id).then(({msg}) => {
      notify('success', 'Offer deleted successfully', msg);
      const newOffers = offers.filter(offer => offer.id !== id);
      dispatch(set('offers', newOffers))
    }).catch(ex => notify('error', 'Error in deleting offer', ex))
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