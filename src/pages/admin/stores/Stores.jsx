import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import PageLayout from '../../../components/admin/layout/PageLayout';
import StoreTable from '../../../components/admin/stores/storeTable/StoreTable';
import { deleteStoreAction, getAllStoresAction, getStoreByIdAction } from '../../../redux/actions/storeActions';

const Stores = () => {

  const { storeList, status } = useSelector(state => state.stores);
  const [reqFilters, setReqFilters] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  
  useEffect(() => {
    handleGetAllStores(reqFilters);
  }, [reqFilters])

  const handleGetAllStores = (reqFilters) => {
    dispatch(getAllStoresAction(reqFilters));
  }

  const handleDeleteStore = (id) => {
    dispatch(deleteStoreAction(id))
      .then(() => handleGetAllStores());
  }

  const handleOpenAddStore = () => {
    history.push('/admin/stores/addStore');
  }

  const handleOpenEditStore = (id) => {
    dispatch(getStoreByIdAction(id))
      .then(() => history.push('/admin/stores/editStore')); 
  }

  return (
    <PageLayout selectedNav='stores' crumbs={[{ text: 'Stores' }]} status={status}> 
      <StoreTable 
        stores={storeList}
        reqFilters={reqFilters}
        setReqFilters={setReqFilters}
        handleAddStoreVisible={handleOpenAddStore}
        handleEditStoreVisible={handleOpenEditStore}
        handleDeleteStore={handleDeleteStore}
      />
    </PageLayout>
  );
}

export default Stores;