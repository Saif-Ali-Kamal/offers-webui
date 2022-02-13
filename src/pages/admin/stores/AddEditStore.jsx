import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Col, Row } from "antd";
import PageLayout from "../../../components/admin/layout/PageLayout";
import { addStoreAction, updateStoreAction } from "../../../redux/actions/storeActions";
import AddEditStoreForm from '../../../components/admin/stores/addEditStore/AddEditStoreForm';
import { clearSelectedStore } from '../../../redux/reducers/storeReducer';

const AddEditStore = ({ type }) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const { selectedStore, status } = useSelector(state => state.stores);
  
  const handleCancelStore = () => {
    dispatch(clearSelectedStore());
    history.push('/admin/stores');
  }

  const handleAddStore = (store) => {
    dispatch(addStoreAction(store));
  }

  const handleEditStore = (id, editedStore) => {
    const updatedStore = { id, editedStore };
    dispatch(updateStoreAction(updatedStore));
  }

  return (
    <PageLayout 
      selectedNav='stores' 
      crumbs={[{ text: 'Stores', link: '/admin/stores' }, 
        type === 'add' ? 
        { text: 'Add store' } : { text: 'Edit store' }]} 
      innerPage
      title={type === 'add' ? 'Add store' : 'Edit store'}
      handleClick={handleCancelStore}
      status={status}
    >
      <Row>
        <Col lg={{ span: 16, offset: 4 }} xs={{ span: 24, offset: 0 }}>
          <AddEditStoreForm
            formType={type}
            initialvalues={type === 'edit' ? selectedStore : null}
            handleAddStore={handleAddStore}
            handleEditStore={handleEditStore}
            handleCancelStore={handleCancelStore} 
          />
        </Col>
      </Row>
    </PageLayout>
  );
}

export default AddEditStore;