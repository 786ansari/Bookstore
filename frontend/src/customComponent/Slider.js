import React, { useEffect } from "react";
import { useSnapCarousel } from "react-snap-carousel";

const Slider = (props) => {
  const { sliderDate } = props;
  const { scrollRef, pages, activePageIndex, next, prev, goTo } =
    useSnapCarousel();
  let count = 0;
  //   useEffect(()=>{
  //     setInterval(displayHello, 1000);

  //     function displayHello() {

  //         console.log("ASasas")
  //         if(count < sliderDate.length){
  //             next()
  //         }
  //         count=count+4

  //     }
  //   },[props])

  const nextSlide = () => {
    console.log("213213213");
    //  next()
  };
  return (
    <>
          
          <ul
            ref={scrollRef}
            style={{
                flex:1,
              display: "flex",
              overflow: "hidden",
              //   scrollSnapType: 'x mandatory'
            }}
          >
            {sliderDate.map((item, index) => (
              <li
                key={index}
                style={{
                  backgroundColor: "aqua",
                  fontSize: "50px",
                  width: "250px",
                  height: "250px",
                  flexShrink: 0,
                  color: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {item.name}
                <img
                  src={item.image}
                  style={{ height: "200px", width: "100px", margin: "10px" }}
                />
              </li>
            ))}
          </ul>
          <div>
          {/*  {activePageIndex + 1} / {pages.length}*/}
          </div>
          <div className="priew-button">
              <button onClick={() => prev()}>Prev</button>
              <button onClick={() => next()}>Next</button>
          </div>
         
          {/* <ol style={{ display: 'flex' }}>
        {pages.map((_, i) => (
          <li key={i}>
            <button
              style={i === activePageIndex ? { opacity: 0.5 } : {}}
              onClick={() => goTo(i)}
            >
              {i + 1}
            </button>
          </li>
        ))}
      </ol> */}
        
    </>
  );
};

export default Slider;
