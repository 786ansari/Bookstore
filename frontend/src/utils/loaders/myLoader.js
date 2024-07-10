import React from "react"
import ContentLoader from "react-content-loader"

const CategoryLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={476}
    height={124}
    viewBox="0 0 476 124"
    backgroundColor="#f3f3f3"
    foregroundColor="#585858"
    {...props}
  >
    <circle cx="10" cy="20" r="8" /> 
    <rect x="25" y="15" rx="5" ry="5" width="220" height="10" /> 
    <circle cx="10" cy="50" r="8" /> 
    <rect x="25" y="45" rx="5" ry="5" width="220" height="10" /> 
    <circle cx="10" cy="80" r="8" /> 
    <rect x="25" y="75" rx="5" ry="5" width="220" height="10" /> 
    <circle cx="10" cy="110" r="8" /> 
    <rect x="25" y="105" rx="5" ry="5" width="220" height="10" />
    <circle cx="10" cy="140" r="8" /> 
    <rect x="25" y="135" rx="5" ry="5" width="220" height="10" />
    <circle cx="10" cy="170" r="8" /> 
    <rect x="25" y="165" rx="5" ry="5" width="220" height="10" />
  </ContentLoader>
)

export default CategoryLoader