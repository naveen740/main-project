const mongoose=require('mongoose')

const connectDb=async() =>{
try{
    await mongoose.connect('mongodb://127.0.0.1:27017/adminpanel')
    console.log("Database Connected")
}
catch(error){
    console.error(error)
}
}

module.exports=connectDb