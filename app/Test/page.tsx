import React from 'react';
import UpdateInternRole from '../../components/UpdateRole'; // Import the component

const App = () => {
  const internId = '64da7b6070890db1b3272f02';//props

  return (
    <div>
      <h1>Intern Management App</h1>
      <UpdateInternRole internId={internId} />
    </div>
  );
};

export default App;
