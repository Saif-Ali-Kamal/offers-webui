import api from './api';

export const addCountryService = (country) => {
  return new Promise((resolve, reject) => {
    api.post('/country/addCountry', country).then(res => {
      if(res.status === 200){
        resolve({ msg: res.data.message, result: res.data.country })
      }
    }).catch(ex => reject(ex))
  })
}

export const getAllCountriesService = (urlParams) => {
  return new Promise((resolve, reject) => {
    api.get(`/country/getAllCountries?${urlParams}`).then(res => {
      if(res.status === 200){
        resolve({ msg: res.data.mesage, countries: res.data.data, totalCountries: res.data.count })
      }
    }).catch(ex => reject(ex))
  })
}

export const getCountryByIdService = (id) => {
  return new Promise((resolve, reject) => {
    api.get(`/country/getCountry/${id}`).then(res => {
      if(res.status === 200){
        resolve({ msg: res.data.message, country: res.data.data })
      }
    }).catch(ex => reject(ex))
  })
}

export const updateCountryService = ({ id, editedCountry }) => {
  return new Promise((resolve, reject) => {
    api.patch(`/country/updateCountry/${id}`, editedCountry).then(res => {
      if(res.status === 200){
        resolve({ msg: res.data.msg, country: res.data.country })
      }
    }).catch(ex => reject(ex))
  })
}

export const deleteCountryService = (id) => {
  return new Promise((resolve, reject) => {
    api.delete(`/country/deleteCountry/${id}`).then(res => {
      if(res.status === 200){
        resolve({ msg: res.data.msg })
      }
    }).catch(ex => reject(ex))
  })
}