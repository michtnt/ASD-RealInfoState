// WISHLIST MODEL
const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  property_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
  },
});

module.exports = mongoose.model('Wishlist', wishlistSchema);
