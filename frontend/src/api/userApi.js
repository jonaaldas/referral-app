import axios from 'axios'
// user apis
export const registerUserRequest = async (name, email, password) => {
  try {
    return await axios.post('http://localhost:5012/api/user/register',{name,email,password})
  } catch (error) {
    return error
  }
}


export const logInUserRequest = async(email, password) => {
  try {
    return await axios.post('http://localhost:5012/api/user/login', {email, password})
  } catch (error) {
    return error
  }
}

export const getUserRequest = async (token) => {
  try {
    return await axios.get('http://localhost:5012/api/user/me',{ headers: {"Authorization" : `Bearer ${token}`}})
  } catch (error) {
    console.log(error)
  }
}