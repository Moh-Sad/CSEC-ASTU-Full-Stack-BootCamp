import mangoose from 'mongoose';
const jobs = new mangoose.Schema({
    title: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    }
});
export default mangoose.model('jobs', jobs);