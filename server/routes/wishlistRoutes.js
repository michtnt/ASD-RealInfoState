const { check, validationResult } = require('express-validator');
let User = require('../models/user');
let Wishlist = require('../models/wishlist');
let Property = require('../models/property');
const { route } = require('./userRoutes');
const wishlist = require('../models/wishlist');
const wishlistRouter = require('express').Router();

//@route  CREATE wishlist /wishlist/add/
//@desc   add property to the wishlist
//@access Private

wishlistRouter.put(
  '/add',
  //Validate user_id and property_id must be filled
  [
    check('user_id', 'Your must be a user to create a wishlist')
      .not()
      .isEmpty(),
    check('property_id', 'enter the property you want to add to your wishlist')
      .not()
      .isEmpty(),
  ],
  async (req, res, next) => {
    //Store error in the errros array
    const errors = validationResult(req);
    //If the errors array is not empty than display the error
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //deconstruct from request body
    const { user_id, property_id } = req.body;

    //Create wishlist object attributes
    const wishlistFields = {};
    if (user_id) wishlistFields.user_id = user_id;
    if (property_id) wishlistFields.property_id = property_id;

    try {
      //Check if the usr exist user_id
      let user = await User.findById({ _id: user_id });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User does not exist' }] });
      }
      //Check if the property exist based on the property_id
      let property = await Property.findById({ _id: property_id });
      if (!property) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Property does not exist' }] });
      }

      //Check if the user has added this to their wishlist already
      let wishlist = await Wishlist.findOne({
        user_id: user_id,
        property_id: property_id,
      });
      //if it's added than don't add it again
      if (wishlist) {
        return res.status(400).json({
          errors: [{ msg: 'Property already added to wishlist before' }],
        });
      }

      //Create wishlist
      wishlist = new Wishlist(wishlistFields);
      await wishlist.save();
    } catch (err) {
      //error message produced by server and recorded for err variable
      console.error(err.message);
      //500 = internal Server Error
      res.status(500).send('Server Error');
    }
    //Return user_id and property_id
    res.status(200).json(wishlistFields);
  }
);

//@route  GET /wishlist/view/:user_id
//@desc   view wishlist of a specific user

wishlistRouter.get('/view/:user_id', async (req, res) => {
  try {
    //Find wishlist based on user id in params
    const wishlist = await Wishlist.find({
      user_id: req.params.user_id,
      //Populate results with the attributes of each property in the wishlist
    }).populate('property_id', [
      'name',
      'coordinate',
      'description',
      'address',
      'price',
      'size',
      'type',
      'url',
    ]);
    //If there are no results than wishlist is empty
    if (!wishlist) {
      return res.status(400).json({ msg: 'Wishlist is empty' });
    }
    //Return the wishlist
    res.json(wishlist);
  } catch (err) {
    //Display error message
    console.error(err.message);
    //If error message is regarding Object_id than display appropriate message
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Wishlist is empty' });
    }
    //Respond with status 500 and server error
    res.status(500).send('Server Error');
  }
});

//@todo
//@route  DELETE /wishlist/view/
//@desc   delete a property from wishlist
wishlistRouter.delete('/delete/:user_id-:property_id', async (req, res) => {
  const property_id  = req.params.property_id;
  const user_id = req.params.user_id;

  if(property_id){
    try {
      // delete property which has the matching id
      await wishlist.findOneAndRemove({user_id: user_id, property_id: property_id});
      res.status(200).send("The Property has been deleted from your wishlist");
  } catch(error){ // return feedback if operation does not suceed
      console.log(error)
      res.status(500).json({
          error: 'Something Wrong'
      })
  }
  }
  else{
    res.status(404).send('Please Enter a Property Id');
  }
});



//@todo
//@route DELETE /wishlist/clear/
//@desc  Delete are properties from the wishlist
wishlistRouter.delete('/clear/:user_id', async (req, res) => {
  const user_id = req.params.user_id;

  const user = await wishlist.findOne({user_id: user_id});

  try {
    // delete property which has the matching id
    await wishlist.deleteMany({user_id: user_id});
    res.status(200).send("Your Wishlist is now cleared");
} catch(error){ // return feedback if operation does not suceed
    console.log(error)
    res.status(500).json({
        error: 'Something Wrong'
    })
}
});

module.exports = wishlistRouter;
