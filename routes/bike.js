const express = require('express');
const router = express.Router();
const Controller = require('../controllers/bike');

router.post('/', Controller.validateAddBike, Controller.createBikeController);

router.get('/', Controller.getBikesController);

router.patch(
  '/:id',
  Controller.validateUpdateBike,
  Controller.updateBikeController
);

router.delete('/:id', Controller.deleteBikeController);

module.exports = router;
