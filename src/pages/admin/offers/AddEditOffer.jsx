import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Col, Row } from "antd";
import PageLayout from "../../../components/admin/layout/PageLayout";
import { addOfferAction, updateOfferAction } from "../../../redux/actions/offerActions";
import AddEditOfferForm from '../../../components/admin/offers/addEditOffer/AddEditOfferForm';

const AddEditOffer = ({ type }) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const handleCancelOffer = () => {
    history.push('/admin/offers');
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

  return (
    <PageLayout 
      selectedNav='offers' 
      crumbs={['Offers', type === 'add' ? 'Add Offer' : 'Edit Offer']} 
      innerPage
      title={type === 'add' ? 'Add Offer' : 'Edit Offer'}
      route='/admin/offers'
    >
      <Row>
        <Col lg={{ span: 16, offset: 4 }} xs={{ span: 24, offset: 0 }}>
          <AddEditOfferForm
            // initialvalues={offerClickedInfo}
            handleAddOffer={handleAddOffer}
            handleEditOffer={handleEditOffer}
            handleCancelOffer={handleCancelOffer} 
          />
        </Col>
      </Row>
    </PageLayout>
  );
}

export default AddEditOffer;