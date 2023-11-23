const Confirmation = require('../models/Confirmation');
async function getConfirmationData(bookingId) {
  try {
 
    const confirmationData = await Confirmation.findOne({ bookingId })
      .populate('service')
      .exec();
      console.log('Confirmation Data:', confirmationData);
    if (confirmationData) {
      return confirmationData;
    } else {
    
      return null;
    }
  } catch (error) {
    console.error('Error fetching confirmation data:', error);
    throw error;
  }
}

module.exports = { getConfirmationData };