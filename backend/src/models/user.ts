import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    id: {
        type: String,                        
        required: true
    },
	email: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
	last_name: {
        type: String,
        required: true
    },
	risk_tolderance: {
        type: String,
        enum: ['low', 'medium', 'high'],
        required: true
    },
})

const UserModel = mongoose.model('User', userSchema)
export default UserModel