import referralsSchema from '../models/referral.js'
import userShcema from '../models/user.js'
// @desc Get Goals
// @route Get/api/getreferrals
// @access Private
export const getReferrals =  async (req, res) =>{
  const referrals = await referralsSchema.find({user: req.user.id})
  res.status(200).json(referrals)
}

// @desc Create Referral
// @route Post/api/createreferrals
// @access Private
export const createReferrals = async(req, res) =>{
  const date = new Date();
	const timeAndDate = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
try {
  const {
    referralType,
    clientsName,
    typeOfTransaction,
    clientsPhoneNumber,
    clientsEmail,
    closed, 
    realtorsName,
    realtorsEmail,
    realtorsPhone,
    propertyType,
    bedsandBaths,
    notes,
    financing,
    lendersName,
    lendersPhoneNumber,
    lendersEmail,
    referredDate
  } = req.body
  const referral =  new referralsSchema({
    user: req.user.id,
      referralType,
      clientsName,
      typeOfTransaction,
      clientsPhoneNumber,
      clientsEmail,
      closed,
      realtorsName,
      realtorsEmail,
      realtorsPhone,
      referredDate
  })
  referral.referredDate = timeAndDate
  referral.ClientDetails = {
    PropertyType: propertyType ? propertyType : '',
    BedsandBaths: bedsandBaths ? bedsandBaths : ''
  }
  referral.FinancingDetails = {
    Financing: financing ? financing : '',
    LendersName: lendersName ? lendersName : '',
    LendersPhoneNumber: lendersPhoneNumber ? lendersPhoneNumber : '',
    LendersEmail: lendersEmail ? lendersEmail : ''
  }
  referral.agentNotes.push({
    note: notes,
    dateAdded: timeAndDate
  })
  console.log(req.user)
  await referral.save()
  res.status(200).json(referral)
} catch (error) {
  console.log(error)
  }
}

// @desc Update Referral
// @route Put/api/updatereferral/:id
// @access Private
export const updateReferral = async(req, res) =>{
  try {
    const refferalToUpdate = await referralsSchema.findById(req.params.id)

    if(!refferalToUpdate){
      res.status(400)
      throw new Error("refferal Note found")
    }

    const user = await userShcema.findById(req.user.id)
    // check for user
    if(!user){
       res.data(401)
       throw new Error('User not Found')
    }

    // make sure the log in user mathces the goal user
    if(refferalToUpdate.user.toString() !== req.user.id){
      res.status(401)
      throw new Error('User not found')
    }

    const updatedReferral = await referralsSchema.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    
    res.status(200).json(updatedReferral)
  } catch (error) {
    console.log(error)
  }
}

// @desc Delete Referral
// @route delete/api/deletereferral/:id
// @access Private
export const deleteReferral = async(req, res) =>{
  const refferalToDelete = await referralsSchema.findById(req.params.id)  

  if(!refferalToDelete){
    res.status(400)
    throw new Error("refferalfound")
  }

  const user = await userShcema.findById(req.user.id)
    // check for user
    if(!user){
       res.data(401)
       throw new Error('User not Found')
    }

    // make sure the log in user mathces the goal user
    if(refferalToDelete.user.toString() !== req.user.id){
      res.status(401)
      throw new Error('User not found')
    }

  const refferralToBeDelted = await referralsSchema.findByIdAndDelete(req.params.id)

  res.status(200).json(refferralToBeDelted)
}


// notes CRUD API

// @desc  POST referral Notes
// @route POST/api/createNote/:referral_id
// @access Private

export const createNote = async(req, res) => {
  try {
    const referralWithNewNote = await referralsSchema.findByIdAndUpdate({_id: req.params.id}, {$push: {
      agentNotes: req.body 
    }})
    await referralWithNewNote.save()
    res.status(200).json(referralWithNewNote)
  } catch (error) {
    console.log(error)
  }
}

// @desc PUT update note
// @route PUT/api/updatenote/:note_id
// @access Private

export const updateNote = async (req, res) => {
  const {referral_id, note_id} = req.params
  try {
    const updatedNote = await referralsSchema.updateOne({
      "agentNotes": {$elemMatch:{"_id": note_id}}
    },{$set: {"agentNotes.$.note": req.body.note}})
    res.status(200).json(updateNote)

  } catch (error) {
    console.log(error)
  }
}


// remove 
// @desc Delete delete note
// @route delete/api/deletenote/:referral_id/note/:note_id
// @access Private

export const deleteNote = async (req, res)=> {
  try {
    const {referral_id, note_id} = req.params
    
    const deletedNote =  await referralsSchema.updateMany({'_id': referral_id}, {$pull: {agentNotes: {_id: note_id}}})
    res.status(200).json(deletedNote)
  } catch (error) {
    console.log(error)
  }
}