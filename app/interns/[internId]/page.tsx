"use client"

import SinglePageIntern from "@/components/SinglePageIntern";
import { useParams } from 'next/navigation';


export default function RecipePage() {

  const params = useParams();
  const  internId  = params.internId;
  return (

    <div>
      <SinglePageIntern internId={internId}/>
    </div>

  );

}
