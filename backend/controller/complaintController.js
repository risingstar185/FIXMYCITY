import uploadOnCloudinary from "../config/cloudinary.js";
import Complaint from "../model/complaintModel.js";

export const complaint= async (req, res) => {
  try {  

    const { name, mobile, issueTitle, issueDescription, issueType,lat,lng, street,city,state,pincode ,userId} = req.body;

       let imageUrl = null;
    
          // If new image uploaded
          if (req.file) {
            imageUrl = await uploadOnCloudinary(req.file.path);
            if (!imageUrl) {
              return res.status(500).json({ message: "Image upload failed" });
            }
          }

         
    const newComplaint = await Complaint.create({
      userId,
      name,
      mobile,
      issueTitle,
      issueDescription,
      issueType,
      imageUrl: imageUrl,
   location: {
    lat,
    lng
  },
      address:{
        street,
        city,
        state,
        pincode
      }
    });
      
    

    return res.status(200).json({ message: "Complaint Created", complaint: newComplaint });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


export const getComplaintsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;  
    const complaints = await Complaint.find({ userId });

    return res.status(200).json( complaints );
  }
    catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  } 
}

export const getAllComplaints = async (req, res) => {
  try {  
    const complaints = await Complaint.find();
    return res.status(200).json({ complaints });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const updateComplaintStatus = async (req, res) => {
  try {
    const { complaintId } = req.params;
    const { status } = req.body;
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      complaintId,
      { status }, 
      { new: true }
    );
    if (!updatedComplaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    return res.status(200).json({ message: "Complaint status updated", complaint: updatedComplaint });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
export const deleteComplaint = async (req, res) => {
  try {
    const { complaintId } = req.params;
    const deletedComplaint = await Complaint.findByIdAndDelete(complaintId);
    if (!deletedComplaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    return res.status(200).json({ message: "Complaint deleted successfully" });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
export const getComplaintById = async (req, res) => {
  try {
    const { complaintId } = req.params;
    const complaint = await Complaint
      .findById(complaintId);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    return res.status(200).json({ complaint });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
