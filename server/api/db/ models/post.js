const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    name: { type: String },
    owner: { type: String}, //this will be their email (since their email has to be unique)
    
    //the details
    caption: { type: String, required: true },
    numberOfMembers: { type: Number, required: true },
    tags: { type: Array, default: [] }, //this can be optional 
    date: { type: Date, required: true },
    location: { type: String, required: true },
    category: { type: String, required: true },
    specialNotes: { type: String, required: true }, //any additional unique info they want to add will go here
    
    //status of posting 
    approvedMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: "members" }],
    requests: [{ type: mongoose.Schema.Types.ObjectId, ref: "requests" }],
    status: { type: Boolean, default: true }, //active/still have slots left == true, not active/full == false 
  },
  { timestamps: true, strict: false }
);

let Post = mongoose.model("Post", postSchema);

module.exports = Post;
