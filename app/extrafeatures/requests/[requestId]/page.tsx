"use client"

import SinglePageRequest from "@/components/SinglePageRequest";
import { useParams } from 'next/navigation';


export default function RecipePage() {

  const params = useParams();
  const  requestId  = params.requestId;
  return (

    <div>
      <SinglePageRequest requestId={requestId}/>
    </div>

  );

}
