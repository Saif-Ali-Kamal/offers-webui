import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import PageLayout from '../../../components/admin/layout/PageLayout';
import CarouselTable from '../../../components/admin/carousels/carouselTable/CarouselTable';
import { deleteCarouselAction, getAllCarouselsAction, getCarouselByIdAction } from '../../../redux/actions/carouselActions';

const Carousels = () => {

  const { carouselList, status } = useSelector(state => state.carousels);
  const dispatch = useDispatch();
  const history = useHistory();
  
  useEffect(() => {
    handleGetAllCarousels();
  }, [])

  const handleGetAllCarousels = () => {
    dispatch(getAllCarouselsAction());
  }

  const handleDeleteCarousel = (id) => {
    dispatch(deleteCarouselAction(id))
      .then(() => handleGetAllCarousels());
  }

  const handleOpenAddCarousel = () => {
    history.push('/admin/carousels/addCarousel');
  }

  const handleOpenEditCarousel = (id) => {
    dispatch(getCarouselByIdAction(id))
      .then(() => history.push('/admin/carousels/editCarousel')); 
  }

  return (
    <PageLayout selectedNav='carousels' crumbs={[{ text: 'Carousels' }]} status={status}> 
      <CarouselTable 
        carousels={carouselList}
        handleAddCarouselVisible={handleOpenAddCarousel}
        handleEditCarouselVisible={handleOpenEditCarousel}
        handleDeleteCarousel={handleDeleteCarousel}
      />
    </PageLayout>
  );
}

export default Carousels;