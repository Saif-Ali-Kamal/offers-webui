import api from './api';

export const addStoreService = (store) => {
  return new Promise((resolve, reject) => {
    api.post('/store/addStore', store).then(res => {
      if(res.status === 200){
        resolve({ msg: res.data.message, result: res.data.store })
      }
    }).catch(ex => reject(ex))
  })
}

export const getAllStoresService = (urlParams) => {
  return new Promise((resolve, reject) => {
    api.get(`/store/getAllStores?${urlParams}`).then(res => {
      if(res.status === 200){
        resolve({ msg: res.data.mesage, stores: res.data.data, totalStores: res.data.count })
      }
    }).catch(ex => reject(ex))
  })
}

export const getStoreByIdService = (id) => {
  return new Promise((resolve, reject) => {
    api.get(`/store/getStore/${id}`).then(res => {
      if(res.status === 200){
        resolve({ msg: res.data.message, store: res.data.data })
      }
    }).catch(ex => reject(ex))
  })
}

export const updateStoreService = ({ id, editedStore }) => {
  return new Promise((resolve, reject) => {
    api.patch(`/store/updateStore/${id}`, editedStore).then(res => {
      if(res.status === 200){
        resolve({ msg: res.data.msg, store: res.data.store })
      }
    }).catch(ex => reject(ex))
  })
}

export const deleteStoreService = (id) => {
  return new Promise((resolve, reject) => {
    api.delete(`/store/deleteStore/${id}`).then(res => {
      if(res.status === 200){
        resolve({ msg: res.data.msg })
      }
    }).catch(ex => reject(ex))
  })
}