import mongoose from 'mongoose';

const { Schema } = mongoose;

const gradeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        min: 0,
        required: true,
    },
    lastModified: {
        type: Date,
        default: Date.now
    }
});

const Grade = mongoose.model('grade', gradeSchema);

export default Grade;