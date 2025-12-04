import express from "express";

import { complaint,getComplaintsByUserId ,getAllComplaints,deleteComplaint,updateComplaintStatus} from "../controller/complaintController.js";
import upload from "../config/multer.js";

const complaintRouter = express.Router();


complaintRouter.post(
  "/complaints",
 upload.single("profile"),
  complaint
);
complaintRouter.get("/complaints/:userId", getComplaintsByUserId);
complaintRouter.delete("/complaints/:complaintId", deleteComplaint);
//complaintRouter.get("/complaints/complaint/:complaintId", getComplaintById);
complaintRouter.get("/complaints", getAllComplaints);
complaintRouter.put("/complaints/:complaintId", updateComplaintStatus);





export default complaintRouter;
