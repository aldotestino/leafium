import mongoose from 'mongoose';
import express from 'express';

const app = express();

//Database
const connectionDb1 = "mongodb+srv://Gibax:Damiano00@cluster0.iclae.mongodb.net/?retryWrites=true&w=majority";
const connectionDb = "mongodb+srv://dbLeafium:dbLeafium@cluster0.1agqcpk.mongodb.net/test"
//mongoose.connect('mongodb+srv://Gibax:Damiano00@cluster0.iclae.mongodb.net/?retryWrites=true&w=majority');
mongoose.connect(connectionDb);

const db = mongoose.connection;

db.once("open", ()=> {
    console.log("MongoDB Connesso"); 
});

//middleware
app.use(express.json());


const server = app.listen(9000, function(){
    console.log('Server in Ascolto');
})




