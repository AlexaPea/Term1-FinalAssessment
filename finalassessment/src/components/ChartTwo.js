import React from 'react';
import 'chart.js/auto';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import axios from 'axios';
import { useState, useEffect, useRef} from 'react';
import { Bar } from 'react-chartjs-2'; 


const ChartTwo = () => {

    const [seaLevel, setSeaLevel] = useState([]);
    const [vacuumLevel, setVacuumLevel] = useState([]);
    const [graphData, setGraphData] = useState([]);
    const [labelData, setLabelData] = useState([]);

    useEffect(()=>{
        axios.get("https://api.spacexdata.com/v4/rockets")
        .then((res)=>{ //if responsive
            let data = res.data;
    
            const thrustSeaLevel = [];
            const thrustVacuum =[];
            const labels =[];

        
            //loop that puts these values into seperate arrays
            for(let i=0;i<data.length;i++){
               
                thrustVacuum.push(data[i].engines.thrust_vacuum.lbf);
                thrustSeaLevel.push(data[i].engines.thrust_sea_level.lbf);

                labels.push(data[i].name)


                // console.log(labels)
                // console.log(thrustVacuum)
                // console.log(thrustSeaLevel)



            }
            setVacuumLevel(thrustVacuum);
            setSeaLevel(thrustSeaLevel);
            setLabelData(labels);

            // setGraphData(thrustSeaLevel,thrustVacuum )

          
           
            
    
        })
    }, []);

    
    //data that makes up chart
    const chartData ={
        
        labels: labelData,
        datasets: [
            {   label: 'Thrust Vacuum ',
                data: vacuumLevel,
                backgroundColor: [
                    '#e7e7e7',
                ],
                borderColor: [
                    '#e7e7e7',
                ],
               
               
            },{
                label: 'Thrust Sea Level',
            data: seaLevel,
            backgroundColor: [
                '#2b2b2b',
            ],
            borderColor: [
                '#2b2b2b',
            ],
      
            },
        
       
        
    
    ]
   

    
} 

//Here I adjusted the grid
const chartOptions={
    maintainAspectRatio:false,
    scales: {
        y: {
            ticks: {
                min:0,
                max:140000,
            }
          },
            x: {
                ticks: {
                    autoSkip: false,
                }
              }
  }
};

   

//outputs graph
    return (
        <div>
             <div className='middle-Chart'>
                <Bar data={chartData} options={chartOptions}/> 
            </div>
            
        </div>
    );
};

export default ChartTwo;