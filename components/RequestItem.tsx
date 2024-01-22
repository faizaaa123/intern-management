import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Router } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';

export default function RequestItem({request}:{request:any}) {
  const [displayAllRequests, setAllRequests] = useState(true);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAllRequests((prevDisplayAllRequests) => !prevDisplayAllRequests);
  };

  return (
    <>

    {displayAllRequests && 
     <Link legacyBehavior href={`/requests/${request._id}`} >
     <Card sx={{ maxWidth: 500, maxHeight: 500}}>
    <CardActionArea>
    <CardMedia
     component="img"
     height="200"
     image="https://images.unsplash.com/photo-1692394434977-f3f83967b3ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60"/>
     <CardContent>
          <Typography gutterBottom variant="h5" component="div" height={70}>
            Request
          </Typography>
          <Typography variant="body2" color="text.secondary" >
            status: {request.status}
            <br/>
            Date: {request.start_date} - {request.end_date}
            <br/>
            Reason: {request.reason}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Link>
}

    </>
  );
}