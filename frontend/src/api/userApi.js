import axios from 'axios'

export const getUserRequest = async (setIsSingedUp) => {
  return await axios.get("auth/user", {
    withCredentials: true,
  })
  .then((res) => {
    if(Object.keys(res.data).length !== 0){
      setIsSingedUp((prevBoolean) => !prevBoolean);
    }
  });
}

export const userLogInRuequest = async (email, password) => {
  return await axios.post("auth/signin",
    { username: email, password },
    {
      withCredentials: true,
    }
  )
  .then((res) => {
    console.log(res.data);
  })
}

export const userRegisterRequest = async (name, email, password) => {
  return await axios.post("auth/register",
    {name, username: email, password },
    {
      withCredentials: true,
    }
  )
  .then((res) => {
    console.log(res.data, 'User registered');
  })
}

export const logOutUser = async () => {
  return await axios.post("auth/logout",{
    withCredentials: true,
  }).then(res => {
    console.log(res)
    return res
  }) 
}