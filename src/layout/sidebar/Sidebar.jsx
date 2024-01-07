import React from 'react'
import SidebarClient from './SidebarClient'

const Sidebar = ({ 
  allHighwayInfo, 
  setDisplayedHighwayInfo, 
  setCurrentPage, 
}) => {
  return (
    <SidebarClient 
      allHighwayInfo={allHighwayInfo} 
      setDisplayedHighwayInfo={setDisplayedHighwayInfo}
      setCurrentPage={setCurrentPage}
    />
  )
}

export default Sidebar