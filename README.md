# Intern Management App

### Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## **Project Brief: Intern Management App - Attendance Tracker**

Overview:
The Intern Management App - Attendance Tracker is designed to efficiently track the presence of interns in the office and manage their leave statuses (sick leave and holiday). The primary goal is to provide a simple and user-friendly interface for supervisors to monitor intern attendance and leave records.

### Main Objectives:

- manage when interns have clocked in
- manage when interns are sick
- manage when interns are on holiday

### Bonus Objectives:

- Supervisors and interns receive notifications for upcoming meetings or events
- Superivisors can access attendance reports for their interns
- Superivisors can create and assign tasks to their interns
- Superivisors can create a meeting with their interns straight from the app

Key Features:
1. Intern Check-in System:
   - Implement a straightforward check-in system for interns to record when they arrive at the office. Ideally, this should be automated - perhaps integrate a GPS API that tracks whether an intern enters the office or not.

2. Leave Status Management:
   - Enable interns to update their leave status (sick leave or holiday) through the app. Supervisors can review and approve leave requests.

3. Real-time Attendance Tracking:
   - Develop a real-time attendance tracking feature for supervisors to monitor intern presence throughout the workday.

4. Calendar Integration:
   - Integrate a calendar into the app to display important dates, such as public holidays or team events, enhancing user experience.

5. User-Friendly Interface:
   - Design an intuitive and easy-to-navigate interface to ensure efficient attendance tracking and leave management.

6. Admin Dashboard:
   - Implement a simplified admin dashboard to provide supervisors with an overview of intern attendance and leave status.

7. Data Security:
   - Ensure data security by using encryption for sensitive information, such as personal details and leave records.

8. Mobile Responsiveness:
   - Develop a mobile-responsive design to enable supervisors to access the app on various devices.

## User Stories: 

### Intern can...
- sign in using their work email
- be automatically directed to intern interface based on email title
- create a profile - saved to the database
- next time intern signs into app, if email is in database, take them to home page
- Home Page tracks whether intern is in office/working from home/ out of office (holiday/sick)
- Home page should allow intern to update leave status (reviewed and approved by supervisor) if sick or on holiday, intern status should automatically become out of office
- Home page should have a calendar that displays public holidays/team meetings
- Intern can sign out of tracker app.

### Supervisor can...
- sign in using their work email
- be automatically directed to supervisor interface based on email title
- create a profile - saved to the database
- next time supervisor signs into app, if email is in database, take them to home page
- Home Page tracks whether an intern is in office/working from home/ out of office (holiday/sick)
- Home page should allow supervisor to review and approve  leave.
- Home page should have a calendar that displays public holidays/team meetings
- Supervisor can sign out of tracker app.

Click [here](https://www.figma.com/file/Naemkvc1lwR5FQzACTw3y7/Intern-Management-App?type=whiteboard&node-id=0%3A1&t=fYyNxllUHpjG4fHN-1) for the project wireframe.

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


**Buckle your belts, because we are going on a ride!! We got this guys! Fighting!!! (づ ◕‿◕ )づ ⸂⸂⸜(രᴗര๑)⸝⸃⸃**