// import mongoose from 'mongoose';

interface User {
  firstname: string;
  password: string;
  lastname: string;
  email: string;
  accessToken?: string;
  refreshToken?: string;
  // supervisor: mongoose.Types.ObjectId;
  supervisor: string;
  internRole: 'project manager' | 'software engineer';
  last_checkin?: Date;
  leaveRequests: object[]; // Update this with the correct type
}

export default User;
