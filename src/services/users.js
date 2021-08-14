import api from './api';

export const userSignup = (userConfig) => {
  return new Promise((resolve, reject) => {
    api.post('/user/signup', userConfig).then(res => {
      if(res.status === 201 || res.status === 409){
        resolve(res.data.message)
        return
      }
    }).catch(ex => reject(ex))
  })
}

export const userSignin = (userConfig) => {
  return new Promise((resolve, reject) => {
    api.post('/user/signin', userConfig).then(res => {
      if(res.status === 200){
        resolve({msg: res.data.msg, token: res.data.token})
        return 
      }
    }).catch(ex => reject(ex))
  })
}