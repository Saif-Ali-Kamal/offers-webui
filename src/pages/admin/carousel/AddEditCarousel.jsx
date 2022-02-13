import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Col, Row } from "antd";
import PageLayout from "../../../components/admin/layout/PageLayout";
import { addCarouselAction, updateCarouselAction } from "../../../redux/actions/carouselActions";
import AddEditCarouselForm from '../../../components/admin/carousels/addEditCarousel/AddEditCarouselForm';
import { clearSelectedCarousel } from '../../../redux/reducers/carouselReducer';

const AddEditCarousel = ({ type }) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const { selectedCarousel, status } = useSelector(state => state.carousels);
  
  const handleCancelCarousel = () => {
    dispatch(clearSelectedCarousel());
    history.push('/admin/carousels');
  }

  const handleAddCarousel = (carousel) => {
    dispatch(addCarouselAction(carousel));
  }

  const handleEditCarousel = (id, editedCarousel) => {
    const updatedCarousel = { id, editedCarousel };
    dispatch(updateCarouselAction(updatedCarousel));
  }

  return (
    <PageLayout 
      selectedNav='carousels' 
      crumbs={[{ text: 'Carousels', link: '/admin/carousels' }, 
        type === 'add' ? 
        { text: 'Add carousel' } : { text: 'Edit carousel' }]} 
      innerPage
      title={type === 'add' ? 'Add carousel' : 'Edit carousel'}
      handleClick={handleCancelCarousel}
      status={status}
    >
      <Row>
        <Col lg={{ span: 16, offset: 4 }} xs={{ span: 24, offset: 0 }}>
          <AddEditCarouselForm
            formType={type}
            initialvalues={type === 'edit' ? selectedCarousel : null}
            handleAddCarousel={handleAddCarousel}
            handleEditCarousel={handleEditCarousel}
            handleCancelCarousel={handleCancelCarousel} 
          />
        </Col>
      </Row>
    </PageLayout>
  );
}

export default AddEditCarousel;