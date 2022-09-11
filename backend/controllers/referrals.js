import referralModel from '../models/referrals.js'

/**
 * @route   POST api/auth/login
 * @desc    Login user
 * @access  Public
 */

// create referral
export const createReferral =  async (req, res) => {
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
      referredDate,
      realtosDate,
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
      user
    } = req.body
    let referral = new referralModel({
      referralType,
      clientsName,
      typeOfTransaction,
      clientsPhoneNumber,
      clientsEmail,
      closed,
      referredDate,
      realtosDate,
      realtorsName,
      realtorsEmail,
      realtorsPhone,
      user
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
    return res.json(referral)
  } catch (error) {
    console.log(error)
  }
}
// get all referrals

// get singel refferals
//upadre referral
// delete Referral
  // getSingel referral to delete