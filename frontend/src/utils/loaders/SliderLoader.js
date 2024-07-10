import React from "react"
import ContentLoader from "react-content-loader"

const SliderLoader = (props) => (
  console.log(".setting",props.setting),
<ContentLoader 
    speed={2} // Increase the width to 600
    height={460}
    width={props.setting.width}
     // Adjust the viewBox to match the new width
    backgroundColor="#f3f3f3"
    foregroundColor="#585858"
    {...props.setting}
  > 
    <rect x="0" y="60" rx="2" ry="2" width={props.setting.width} height="400" /> {/* Adjust the width of the rectangle */}
  </ContentLoader>
)

export default SliderLoader