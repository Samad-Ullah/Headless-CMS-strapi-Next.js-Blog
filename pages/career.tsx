import { AxiosResponse } from 'axios'
import { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import JobsShow from '../components/JobsShow'
import { fetchJobs } from '../http'
import { ICollectionResponse, IJobs } from '../types'

interface IPropTypes {
  jobs: {
    item: IJobs[]
  }
}

const Career:NextPage<IPropTypes> = ({jobs}) => {
  console.log(jobs)
  return (
    <div>
      <JobsShow jobs={jobs.item}/>
    </div>
  )
}


export default Career

export const getServerSideProps: GetServerSideProps = async (context:any) => {

  const { data:jobs }: AxiosResponse<ICollectionResponse<IJobs[]>> =
   await fetchJobs()
   console.log(jobs.data)

   return {
    props:{
        jobs:{
            item: jobs.data
          }
    }
    
   }
}