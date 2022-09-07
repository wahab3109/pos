import React,{useState,useEffect} from "react";
import Chart from "react-apexcharts";

const Charts = (props)=>{ 
  const [rerender, setRerender] = useState(false);
  console.log("data ha",props)
// useEffect(()=>{
//   console.log("use statae chl rha ha")
//   setRerender(prevState=>!prevState);
// }, []);
// console.log("props are",props)
  const xdata=[props.todays, props.yesterdays , props.twodayss, props.threedayss, props.fourdayss]
  console.log("x daar ha",xdata)
    const [state,setState]=useState({
    options: {

              chart: {
                id: props.id
              },
              xaxis: {
                props:props,
                categories: xdata
              },
             
              title:{
                text:"barchart for order and sales",
                style:{fontSize:21}
              },
              fill: {
                colors: [function({ value, seriesIndex, w }) {
                  if(value < 5) {
                      return '#7E36AF'
                  } else if (value >= 5 && value < 10) {
                      return '#164666'
                  } else {
                      return '#D9534F'
                  }
                }]
              },
              
              
            },
            series: [
              {
                name: "orders-sales",
                data: [props.todayl, props.yesterdayl, props.twodaysl, props.threedaysl, props.fourdaysl]
              }
            ]
            
          }
         
        
    )
   
    const [display, setDisplay] = useState(false);

    useEffect(() => {
       setTimeout(() => setDisplay(true), 3);
    }, [])
    
    if(!display) {
     return <></>;
    }
    return(
         <Chart
              options={state.options}
              series={state.series}
              type="bar"
              width="500"

            />
    )
}

const Radar = (props)=>{
  const [rerender, setRerender] = useState(false);
 
  useEffect(()=>{
      setRerender(!rerender);
  }, []);
    const [state,setState]=useState({
    options: {
              chart: {
                id: props.id
              },
              xaxis: {
                categories: [741, 150 , 43, 26, 336]
              },
              title:{
                text:"radar cahrt for order and sales",
                style:{fontSize:21}
              },
              fill: {
                colors: [function({ value, seriesIndex, w }) {
                  if(value < 2) {
                      return '#7E36AF'
                  } else if (value >= 5 && value < 10) {
                      return '#164666'
                  } else {
                      return '#D9534F'
                  }
                }]
              },
              
            },
            series: [
              {
                name: "series-1",
                  data: [7, 1, 12, 4, 1]
              }
            ]
          }
        
    )
    const [display, setDisplay] = useState(false);

    useEffect(() => {
       setTimeout(() => setDisplay(true), 3);
    }, [])
    
    return(<>
         <Chart
              options={state.options}
              series={state.series}
              type="area"
              width="501"
            />
    </>)
}
export default Charts;
export {Radar};