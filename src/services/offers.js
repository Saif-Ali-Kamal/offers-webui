import api from './api';

export const addOfferService = (offer) => {
  return new Promise((resolve, reject) => {
    api.post('/offer/addOffer', offer).then(res => {
      if(res.status === 200){
        resolve({ msg: res.data.message, result: res.data.offer })
      }
    }).catch(ex => reject(ex))
  })
}

export const getAllOffersService = (urlParams) => {
  return new Promise((resolve, reject) => {
    api.get(`/offer/getAllOffers?${urlParams}`).then(res => {
      if(res.status === 200){
        resolve({ msg: res.data.mesage, offers: res.data.data, totalOffers: res.data.count })
      }
    }).catch(ex => reject(ex))
  })
}

export const getOfferByIdService = (id) => {
  return new Promise((resolve, reject) => {
    api.get(`/offer/getOffer/${id}`).then(res => {
      if(res.status === 200){
        resolve({ msg: res.data.message, offer: res.data.data })
      }
    }).catch(ex => reject(ex))
  })
}

export const updateOfferService = ({ id, editedOffer }) => {
  return new Promise((resolve, reject) => {
    api.patch(`/offer/updateOffer/${id}`, editedOffer).then(res => {
      if(res.status === 200){
        resolve({ msg: res.data.msg, offer: res.data.offer })
      }
    }).catch(ex => reject(ex))
  })
}

export const deleteOfferService = (id) => {
  return new Promise((resolve, reject) => {
    api.delete(`/offer/deleteOffer/${id}`).then(res => {
      if(res.status === 200){
        resolve({ msg: res.data.msg })
      }
    }).catch(ex => reject(ex))
  })
}