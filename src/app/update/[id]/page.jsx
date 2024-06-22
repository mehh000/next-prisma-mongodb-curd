'use client'

import React, { useEffect } from 'react'
import UpdateForm from '@/components/updateForm'


const Update = ({ params }) => {
  
  return (
    <div className='flex items-center justify-center w-full min-h-screen' >
      <UpdateForm id={params.id} />
    </div>
  )
}
export default Update




