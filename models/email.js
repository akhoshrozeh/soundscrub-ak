import { Schema, model, models } from 'mongoose';

const EmailSchema = new Schema ({
    email: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required!'],
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

const Email = models.Email || model("Email", EmailSchema);

export default Email;