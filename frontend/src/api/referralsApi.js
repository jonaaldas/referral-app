import axios from 'axios'

// get all Referrals
export const getAllReferralsRequest = async (token) => {
  try {
       return await axios.get('http://localhost:5012/api/getreferrals',{ headers: {"Authorization" : `Bearer ${token}`}})
  } catch (error) {
    return error
  }
}

// create referrals

export const createReferralsRequest = async (token, client) =>{
  try {
    return await axios.post('http://localhost:5012/api/createreferral', client,{ headers: {"Authorization" : `Bearer ${token}`}})
  } catch (error) {
    return error
  }
}

// get one referral to edit 
export const getOneReferralToEditRequest = async (token, id) => {
  try {
    return await axios.get(`http://localhost:5012/api/getsinglereferral/${id}`, { headers: {"Authorization" : `Bearer ${token}`}})
  } catch (error) {
    return error
  }
}

// edit referral 
export const editReferralRequest = async (token, client, referralId) =>{
  try {
    return await axios.put(`http://localhost:5012/api/updatereferral/${referralId}`, client,  { headers: {"Authorization" : `Bearer ${token}`}})
  } catch (error) {
    return error
  }

}

// delete referral 

export const deleteReferralRequest = async (token, referralId) => {
  try {
    return await axios.delete(`http://localhost:5012/api/deletereferral/${referralId}` , { headers: {"Authorization" : `Bearer ${token}`}})
  } catch (error) {
    return error
  }
}

// CRUD Actions for Notes
export const addANoteRequest = async (token, note, referralId) => {
  try {
  return await axios.post(`http://localhost:5012/api/createnote/${referralId}`, note, { headers: {"Authorization" : `Bearer ${token}`}}
  )
  } catch (error) {
    return error
  }
}

// delete note 

export const  deleteNoteRequest = async (token, notesId, referralId) =>{
  try {
    return await axios.delete(`http://localhost:5012/api/deletenote/${referralId}/note/${notesId}`, { headers: {"Authorization" : `Bearer ${token}`}})
  } catch (error) {
    return error
  }
}