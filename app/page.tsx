import React from 'react'
import Link from 'next/link'
function page() {
  return (
    <div>
      {isAuthenticated ? <Protected token = {token}/> : <Public />}
    </div>
  );
};

export default page
