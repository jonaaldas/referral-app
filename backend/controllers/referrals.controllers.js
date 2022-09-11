// @desc Get Goals
// @route Get/api/getreferrals
// @access Private
export const getReferrals =  async (req, res) =>{
  res.status(200).json({message: "getting referrals"})
}

// @desc Create Referral
// @route Post/api/createreferrals
// @access Private
export const createReferrals = async(req, res) =>{
  if(!req.body.text){
    // user error
    res.status(400)
    throw new Error('Please add a body')
  }
  res.status(200).json({message: "referral created"})
}

// @desc Update Referral
// @route Put/api/updatereferral/:id
// @access Private
export const updateReferral = async(req, res) =>{
  res.status(200).json({message: `referral updated ${req.params.id}`})
}

// @desc Delete Referral
// @route delete/api/deletereferral/:id
// @access Private
export const deleteReferral = async(req, res) =>{
  res.status(200).json({message: `deleted referrals ${req.params.id}`})
}
