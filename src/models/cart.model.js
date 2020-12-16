const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cart = new Schema ({
    // userId: {
    //     type: String,
    // },
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    date: {
        type: Date,
        default: new Date()
    },
    totalPrice: {type: Number},
    products: {
        type: [
            {
                productId: String,
                name: String,
                price: Number,
                image: String,
                count: Number,
                _id: String,
            }
        ],
        required : true,
        minlength: 1,
    },
})

module.exports = mongoose.model('cart', cart);