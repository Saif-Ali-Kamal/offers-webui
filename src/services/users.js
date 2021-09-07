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