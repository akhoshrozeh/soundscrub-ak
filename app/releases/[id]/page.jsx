'use client'
import ReleaseCard from "@components/ReleaseCard"
import { useEffect, useState } from 'react'

const ReleasePageView = ({params}) => {

  const [release, setRelease] = useState();

  useEffect(() => {
    const fetchReleases = async () => {
      console.log(`/api/releases/${params.id}`)
      const response = await fetch(`/api/releases/${params.id}`);

      try {
        const data = await response.json();

        console.log('Data successfully retrieved')
        setRelease(data);
      } catch(error){
        console.log('Error getting json', error)
      }
      
    }
    fetchReleases();
}, []);

  return (
    <section className="w-9/12 pt-12">
      <ReleaseCard release={release}/>
    </section>
  )
}

export default ReleasePageView