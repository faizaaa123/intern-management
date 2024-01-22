import * as React from 'react';

import Card from 'react-bootstrap/Card';
import internStyles from '../app/styles/internStyles.module.css'

export default function Intern({intern}:{intern:any}) {
  return (
    <div>
        <Card bg="light-blue" style={{ width: '18rem', background: '#F8F0E5', border: '10', margin: '10'}}>
      <Card.Body>
        <Card.Title>{intern.firstname} {intern.lastname}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{intern.email}</Card.Subtitle>
        <Card.Text>
            {intern.internRole}
            <br/>
            {intern.supervisor? `${intern.supervisor}`: 'Not assigned to a supervisor'}
        </Card.Text>
        <Card.Link href={`/interns/${intern._id}`}>View Intern Details</Card.Link>
        {/* <Card.Link href="#">Another Link</Card.Link> */}
      </Card.Body>
    </Card>

    </div>
  );
}
