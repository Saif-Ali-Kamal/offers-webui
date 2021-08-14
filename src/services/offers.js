import api from './api';

export const addOffer = (offer) => {
  return new Promise((resolve, reject) => {
    api.post('/offer/', offer).then(res => {
      if(res.status === 200){
        resolve({ msg: res.data.message, result: res.data.offer })
      }
    }).catch(ex => reject(ex))
  })
}

export const getOffers = () => {
  return new Promise((resolve, reject) => {
    api.get('/offer/').then(res => {
      if(res.status === 200){
        resolve({ msg: res.data.msg, offers: res.data.offers, totalOffers: res.data.count })
      }
    }).catch(ex => reject(ex))
  })
}

export const updateOffer = (id, updateOffers) => {
  return new Promise((resolve, reject) => {
    api.patch(`/offer/${id}`, updateOffers).then(res => {
      if(res.status === 200){
        resolve({ msg: res.data.msg })
      }
    }).catch(ex => reject(ex))
  })
}

export const deleteOffer = (id) => {
  return new Promise((resolve, reject) => {
    api.delete(`/offer/${id}`).then(res => {
      if(res.status === 200){
        resolve({ msg: res.data.msg })
      }
    }).catch(ex => reject(ex))
  })
}