import mongoose from "mongoose";

export const ComplaintSchema = new mongoose.Schema(
  {
    userId: {
      type:String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    mobile: {
      type: Number,
      required: true,
    },

    issueTitle: {
      type: String,
      required: true,
    },

    issueDescription: {
      type: String,
      required: true,
    },

    issueType: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    location: {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },

    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      pincode: { type: String },
    },

    status: {
      type: String,
      default: "Processing",
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true } // FIXED
);

const Complaint = mongoose.model("Complaint", ComplaintSchema);

export default Complaint;
