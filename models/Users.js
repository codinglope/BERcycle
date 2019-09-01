const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  name:String,
  username: {
    type:String,
    unique:true
  },
  
email: String,
  password: {
    type: String
    // required: true
  },
  githubId: String,
  facebookId: String
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;




