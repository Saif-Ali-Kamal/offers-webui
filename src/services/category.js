import api from './api';

export const addCategoryService = (category) => {
  return new Promise((resolve, reject) => {
    api.post('/category/addCategory', category).then(res => {
      if(res.status === 200){
        resolve({ msg: res.data.message, result: res.data.category })
      }
    }).catch(ex => reject(ex))
  })
}

export const getAllCategoriesService = (urlParams) => {
  return new Promise((resolve, reject) => {
    api.get(`/category/getAllCategories?${urlParams}`).then(res => {
      if(res.status === 200){
        resolve({ msg: res.data.mesage, categories: res.data.data, totalCategories: res.data.count })
      }
    }).catch(ex => reject(ex))
  })
}

export const getCategoryByIdService = (id) => {
  return new Promise((resolve, reject) => {
    api.get(`/category/getCategory/${id}`).then(res => {
      if(res.status === 200){
        resolve({ msg: res.data.message, category: res.data.data })
      }
    }).catch(ex => reject(ex))
  })
}

export const updateCategoryService = ({ id, editedCategory }) => {
  return new Promise((resolve, reject) => {
    api.patch(`/category/updateCategory/${id}`, editedCategory).then(res => {
      if(res.status === 200){
        resolve({ msg: res.data.msg, category: res.data.category })
      }
    }).catch(ex => reject(ex))
  })
}

export const deleteCategoryService = (id) => {
  return new Promise((resolve, reject) => {
    api.delete(`/category/deleteCategory/${id}`).then(res => {
      if(res.status === 200){
        resolve({ msg: res.data.msg })
      }
    }).catch(ex => reject(ex))
  })
}