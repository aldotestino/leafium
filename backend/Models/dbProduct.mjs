import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    id: String,
    name: String,
    price: {
        type: Number,
        min: 0
    },
    category : {
        type: String,
        default: 'LoRaWAN'
    },
    avaible: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model("product", productSchema);