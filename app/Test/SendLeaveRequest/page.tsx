import React from 'react';
import SendLeaveRequest from "../../../components/SendLeaveRequest"; // Update the path to the SendLeaveRequest component

const LeaveRequestPage = () => {
  return (
    <div>
      <h1>Leave Request Page</h1>
      <SendLeaveRequest internId="64da7b6070890db1b3272f02" /> {/* Replace with Prop */}
    </div>
  );
};

export default LeaveRequestPage;
