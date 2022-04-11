import mongoose,{Schema} from "mongoose";


var userSchema = new Schema({
	userName:String,
	firstName:String,
	lastName:String,
	password:String,
	profileImage:String,
})


var userModel = mongoose.model('user',userSchema)


export { userModel }

