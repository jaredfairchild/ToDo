require('dotenv').config();
const mongoose = require('mongoose');

module.exports = async () => {

    const db_pass = process.env.DB_PASS;
    const db_user = process.env.DB_USER;

    try{
        await mongoose.connect(
            process.env.DB_CONNECTION
            // `mongodb+srv://${db_user}:${db_pass}@cluster0.rsvk4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
        );
        console.log("Connected to database.");
    } catch (err){
        console.log(err);
    }
}