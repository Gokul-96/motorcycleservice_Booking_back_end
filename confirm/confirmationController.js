const Confirmation = require('../models/Confirmation');

// Function to retrieve confirmation data by bookingId
async function getConfirmationData(bookingId) {
  try {
    // Query db to find a confirmation document by bookingId
    const confirmationData = await Confirmation.findOne({ bookingId })
      .populate('service') // Populate the 'service' field with actual data from the 'Service' model
      .exec();
      console.log('Confirmation Data:', confirmationData);
    // If a confirmation document is found, return it
    if (confirmationData) {
      return confirmationData;
    } else {
      // If no confirmation document is found, return null
      return null;
    }
  } catch (error) {
    console.error('Error fetching confirmation data:', error);
    throw error; // You can handle the error here or in the calling code.
  }
}

module.exports = { getConfirmationData };