import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Col, Row } from "antd";
import PageLayout from "../../../components/admin/layout/PageLayout";
import { addOfferAction, updateOfferAction } from "../../../redux/actions/offerActions";
import AddEditOfferForm from '../../../components/admin/offers/addEditOffer/AddEditOfferForm';

const AddEditOffer = ({ type }) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const selectedOffer = useSelector(state => state.offers.selectedOffer);
  
  const handleCancelOffer = () => {
    history.push('/admin/offers');
  }

  const handleAddOffer = (offer) => {
    dispatch(addOfferAction(offer));
  }

  const handleEditOffer = (id, editedOffer) => {
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
            initialvalues={selectedOffer}
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