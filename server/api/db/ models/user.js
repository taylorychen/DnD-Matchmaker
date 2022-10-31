const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
      email: { type: String, required: [true, "can't be blank"], unique: true },
      firstName: { type: String, required: [true, "can't be blank"]},
      lastName: { type: String, required: [true, "can't be blank"]},
      discordUsername: { type: String, required: [true, "can't be blank"] },
      google: {
        id: { type: String, required: [true, "can't be blank"], unique: true },
      },
      isAuthenticated: {type: Boolean, default: false},

      activePostings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Active Postings" }],
      archivedPostings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Archived Postings" }],
      pendingRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pending Requests" }],
      approvedRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Approved Requests" }],

    },
  );
  
  let User = mongoose.model("User", userSchema);
  
  module.exports = User;