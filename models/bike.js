const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bikeSchema = new Schema({
  name: {
    type: String,
    minLength: [5],
    required: true
  },
  type: {
    type: String,
    minLength: [5],
    required: true
  },
  color: {
    type: String,
    required: true
  },
  wheelSize: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  id: {
    type: String,
    validate: {
      validator: async function (id) {
        const bike = await this.constructor.findOne({ id });
        if (bike) {
          if (this.id === bike.id) {
            return true;
          }
          return false;
        }
        return true;
      },
      message: props => 'This ID is already in use.'
    },
    required: [true, 'Bike ID should be unique']
  },
  description: {
    type: String,
    minLength: [5],
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'busy', 'unavailable'],
    default: 'available'
  }
});

module.exports = mongoose.model('bike', bikeSchema);
