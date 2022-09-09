import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {type: String, required: true},
  username:{type:String, unique: true},
  password: String,
  isAdmin: {
    type:Boolean
  }
});

export default mongoose.model("User", userSchema);