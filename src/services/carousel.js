import api from './api';

export const addCarouselService = (carousel) => {
  return new Promise((resolve, reject) => {
    api.post('/carousel/addCarousel', carousel).then(res => {
      if(res.status === 200){
        resolve({ msg: res.data.message, result: res.data.carousel })
      }
    }).catch(ex => reject(ex))
  })
}

export const getAllCarouselsService = (urlParams) => {
  return new Promise((resolve, reject) => {
    api.get(`/carousel/getAllCarousels?${urlParams}`).then(res => {
      if(res.status === 200){
        resolve({ msg: res.data.mesage, carousels: res.data.data, totalCarousels: res.data.count })
      }
    }).catch(ex => reject(ex))
  })
}

export const getCarouselByIdService = (id) => {
  return new Promise((resolve, reject) => {
    api.get(`/Carousel/getCarousel/${id}`).then(res => {
      if(res.status === 200){
        resolve({ msg: res.data.message, carousel: res.data.data })
      }
    }).catch(ex => reject(ex))
  })
}

export const updateCarouselService = ({ id, editedCarousel }) => {
  return new Promise((resolve, reject) => {
    api.patch(`/carousel/updateCarousel/${id}`, editedCarousel).then(res => {
      if(res.status === 200){
        resolve({ msg: res.data.msg, carousel: res.data.carousel })
      }
    }).catch(ex => reject(ex))
  })
}

export const deleteCarouselService = (id) => {
  return new Promise((resolve, reject) => {
    api.delete(`/carousel/deleteCarousel/${id}`).then(res => {
      if(res.status === 200){
        resolve({ msg: res.data.msg })
      }
    }).catch(ex => reject(ex))
  })
}