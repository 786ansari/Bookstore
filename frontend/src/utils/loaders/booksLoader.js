import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={876}
    height={124}
    viewBox="0 0 876 124"
    backgroundColor="#f3f3f3"
    foregroundColor="#585858"
    {...props}
  >
    <rect x="0" y="56" rx="3" ry="3" width="1000" height="6" /> 
    <rect x="0" y="72" rx="3" ry="3" width="780" height="6" /> 
    <rect x="0" y="88" rx="3" ry="3" width="578" height="6" /> 
  </ContentLoader>
)

export default MyLoader
