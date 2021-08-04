const Joi = require('joi');
const Bike = require('../models/bike');

getOneBike = async (value, helpers) => {
  const bike = await Bike.findOne({ id: value });
  console.log('Bike', bike);

  if (bike) {
    res.send(bike);
    return new Error('Duplicate bike id');
  }
  // return bike;
};
class BikeController {
  getBikesController = async (req, res, next) => {
    try {
      const bikes = await Bike.find();
      console.log(bikes);
      res.json(bikes);
    } catch (e) {
      next(e);
    }
  };

  createBikeController = async (req, res, next) => {
    try {
      const bike = await new Bike(req.body).save();
      res.send(bike);
    } catch (e) {
      next(e);
    }
  };

  deleteBikeController = async (req, res, next) => {
    try {
      const bike = await Bike.findByIdAndDelete(req.params.id);
      res.send(bike);
    } catch (e) {
      next(e);
    }
  };

  updateBikeController = async (req, res, next) => {
    try {
      await Bike.findOneAndUpdate({ _id: req.params.id }, req.body);
      res.send(req.body);
    } catch (e) {
      next(e);
    }
  };
  // findBike = async b => {
  //   console.log(b);
  //   const bike = await Bike.findOne(b.id);
  //   res.send(bike);
  // };

  //validation
  validateAddBike = (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(5).required(),
      type: Joi.string().min(5).required(),
      color: Joi.string().min(3).required(),
      wheelSize: Joi.number().required(),
      price: Joi.number().required(),
      id: Joi.string().custom(method, 'custom validation').required(),
      description: Joi.string().min(5).required()
    });
    const validationRes = schema.validate(req.body);
    if (validationRes.error) {
      return res
        .status(400)
        .send('"message": "missing required name field"', validationRes.error);
    }
    next();
  };

  validateUpdateBike = (req, res, next) => {
    const schema = Joi.object({
      status: Joi.string().valid('available', 'busy', 'unavailable')
    });
    const validationRes = schema.validate(req.body);
    if (validationRes.error) {
      return res
        .status(400)
        .send(body, 'missing required fields', validationRes.error);
    }
    next();
  };
}

module.exports = new BikeController();

const method = async (value, helpers) => {
  const bike = await Bike.findOne({ id: value });

  if (bike === null) {
    return value;
  } else {
    console.log('error');

    return helpers.error('Duplicate ID');
  }
};
