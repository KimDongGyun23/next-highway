import Sidebar from '@/layout/sidebar/Sidebar'
import React from 'react'

const styles = {
  display: 'grid',
  gridTemplateColumns: '1fr 4fr'
};

const layout = ({
  children, 
  allHighwayInfo, 
  setDisplayedHighwayInfo, 
  setCurrentPage
}) => {
  return (
    <div style={styles}>
      <Sidebar
        allHighwayInfo={allHighwayInfo}
        setDisplayedHighwayInfo={setDisplayedHighwayInfo}
        setCurrentPage={setCurrentPage}
      />
      {children}
    </div>
  )
}

export default layout