import api from './api';

export const userSignupService = (userConfig) => {
  return new Promise((resolve, reject) => {
    api.post('/user/signup', userConfig).then(res => {
      if(res.status === 201 || res.status === 409){
        resolve(res?.data)
        return
      }
    }).catch(ex => reject(ex))
  })
}

export const userSigninService = (userConfig) => {
  return new Promise((resolve, reject) => {
    api.post('/user/signin', userConfig).then(res => {
      if(res.status === 200){
        resolve(res?.data)
        return 
      }
    }).catch(ex => reject(ex))
  })
}

export const getAllUsersService = () => {
  return new Promise((resolve, reject) => {
    api.get(`/user/getAllUsers`).then(res => {
      if(res.status === 200){
        resolve({ msg: res.data.mesage, users: res.data.data, totalUsers: res.data.count })
      }
    }).catch(ex => reject(ex))
  })
}

export const getUserByIdService = (id) => {
  return new Promise((resolve, reject) => {
    api.get(`/user/getUser/${id}`).then(res => {
      if(res.status === 200){
        resolve({ msg: res.data.message, user: res.data.data })
      }
    }).catch(ex => reject(ex))
  })
}

export const updateUserService = ({ id, editedUser }) => {
  return new Promise((resolve, reject) => {
    api.patch(`/user/updateUser/${id}`, editedUser).then(res => {
      if(res.status === 200){
        resolve({ msg: res.data.msg, user: res.data.user })
      }
    }).catch(ex => reject(ex))
  })
}

export const deleteUserService = (id) => {
  return new Promise((resolve, reject) => {
    api.delete(`/user/deleteUser/${id}`).then(res => {
      if(res.status === 200){
        resolve({ msg: res.data.msg })
      }
    }).catch(ex => reject(ex))
  })
}

export const userRefreshTokenService = () => {
  return new Promise((resolve, reject) => {
    api.get('/user/refresh', { withCredentials: true }).then(res => {
      if(res.status === 200){
        resolve(res?.data)
        return 
      }
    }).catch(ex => reject(ex))
  })
}

export const userSignoutService = () => {
  return new Promise((resolve, reject) => {
    api.get('/user/signout', { withCredentials: true }).then(res => {
      if(res.status === 200){
        resolve(res?.data)
        return 
      }
    }).catch(ex => reject(ex))
  })
}