const moongoose = require('mongoose');
const {Schema} = mongoose;

main().catch(err => console.log(err));

const uri = "mongodb+srv://user:chump@cluster0.qry592a.mongodb.net/?retryWrites=true&w=majority";

async function main() {
  await mongoose.connect(uri);
}

const miscSchema = new Schema({
    count: {
        type: Number,
        require: true
    }
}, { timesstamps: true})