import React from 'react';
import 'chart.js/auto';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import axios from 'axios';
import { useState, useEffect, useRef} from 'react';
import { Line } from 'react-chartjs-2'; 

const ChartThree = () => {

    const [listYears, setListYears] = useState([]);
    const [numOfLaunches, setNumOfLaunches] = useState([]);

    useEffect(()=>{
        axios.get("https://api.spacexdata.com/v4/launches")
        .then((res)=>{ //if responsive
            let data = res.data;

            const numOfFlight=[];
            const years=[];

            for(let i=0; i<data.length;i++){

                years.push((data[i].date_utc).substring(0, 4)) //get only the first 4 characters of this answer
                


            }
            // console.log(years);

            // for(let i =0; i<years.length;i++){
            //     if(years[i])
            // }

            //here I deleted duplicates in order to create an array of the years for the labels
            let yearsList = [];
            years.forEach((c) => {
                    if (!yearsList.includes(c)) {
                        yearsList.push(c);
                    }
                });

            // console.log(yearsList);

            setListYears(yearsList);

            //year I count duplicates
                    
            const NumLaunch = {};
            years.forEach((x) => {
                NumLaunch[x] = (NumLaunch[x] || 0) + 1;
            });
            console.log(NumLaunch);

            setNumOfLaunches(NumLaunch);


    
        })
    }, []);
    //data that makes up chart
    const chartData={
        
            labels: listYears, 
            datasets: [{
              label: 'Launches Per Year',
              data: numOfLaunches,
              fill: false,
              borderColor: '#2b2b2b',
              backgroundColor: '#2b2b2b',
              tension: 0.1
            }]
    };

    //makes sure all axis values are displayed on the grid
    const chartOptions={
        maintainAspectRatio:false,
        scales: {
            y: {
                ticks: {
                    autoSkip:false
                }
              },
                x: {
                    ticks: {
                        autoSkip: false,
                    }
                  }
      }
    };


    return (
        <div>
               <div className='right-Chart'>
                <Line data={chartData} options={chartOptions}/>
            </div>
            
        </div>
    );
};

export default ChartThree;