import api from './api';

export const addTagService = (tag) => {
  return new Promise((resolve, reject) => {
    api.post('/tag/addTag', tag).then(res => {
      if(res.status === 200){
        resolve({ msg: res.data.message, result: res.data.tag })
      }
    }).catch(ex => reject(ex))
  })
}

export const getAllTagsService = (urlParams) => {
  return new Promise((resolve, reject) => {
    api.get(`/tag/getAllTags?${urlParams}`).then(res => {
      if(res.status === 200){
        resolve({ msg: res.data.mesage, tags: res.data.data, totalTags: res.data.count })
      }
    }).catch(ex => reject(ex))
  })
}

export const getTagByIdService = (id) => {
  return new Promise((resolve, reject) => {
    api.get(`/tag/getTag/${id}`).then(res => {
      if(res.status === 200){
        resolve({ msg: res.data.message, tag: res.data.data })
      }
    }).catch(ex => reject(ex))
  })
}

export const updateTagService = ({ id, editedTag }) => {
  return new Promise((resolve, reject) => {
    api.patch(`/tag/updateTag/${id}`, editedTag).then(res => {
      if(res.status === 200){
        resolve({ msg: res.data.msg, tag: res.data.tag })
      }
    }).catch(ex => reject(ex))
  })
}

export const deleteTagService = (id) => {
  return new Promise((resolve, reject) => {
    api.delete(`/tag/deleteTag/${id}`).then(res => {
      if(res.status === 200){
        resolve({ msg: res.data.msg })
      }
    }).catch(ex => reject(ex))
  })
}