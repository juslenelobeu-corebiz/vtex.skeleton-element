import React, { useState, useRef } from 'react';
import SkeletonElement from './SkeletonElement';
import { useOnView } from 'vtex.on-view'

const Skeleton = ({ children }) => {
  const [ loading, setLoading ] = useState(true)
  const element = useRef(null)

  useOnView({
    ref: element,
    once: true,
    onView: () => {
      setLoading(false)
    },
  })

  if (loading) {
    return (
      <div ref={ element }>
        <SkeletonElement type="item" width="300px" height="auto">
          <SkeletonElement type="image" width="100%" height="400px"/>
          <SkeletonElement type="text" width="80%" height="15px"/>
          <SkeletonElement type="text" width="50%" height="10px"/>
        </SkeletonElement>
      </div>
    ) 
  }

  return <div ref={ element }>{ children }</div> 

};

export default Skeleton;