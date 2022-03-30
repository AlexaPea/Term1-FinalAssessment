import React from 'react';
import 'chart.js/auto';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import axios from 'axios';
import { useState, useEffect, useRef} from 'react';
import { Doughnut } from 'react-chartjs-2'; 



ChartJS.register(ArcElement, Tooltip, Legend);




const ChartOne = () => {


    const [chartInfo, setChartInfo] = useState([]);

    useEffect(()=>{
        axios.get("https://api.spacexdata.com/v5/launches")
        .then((res)=>{ //if responsive
            let data = res.data;
    
            //filter works like if
            //counts number of successful launches
            const success = data.filter((item) => item.success === true).length; 
            //counts number of failed launches
            const fail = data.filter((item) => item.success === false).length;
    
            setChartInfo([success, fail]);
    
    
            
    
        })
    }, []);
    
    //data that makes up the chart
    const chartData = {
        labels: ['Success', 'Failures'],
                datasets: [{
                    label: 'Success/Failed Launches',
                    data: chartInfo,
                    backgroundColor: [
                        '#2b2b2b',
                        '#e7e7e7',
                        
                    ],
                    borderColor: [
                        '#2b2b2b',
                        '#e7e7e7',
                        
                    ],
                    borderWidth: 1
                }]
    }

    //lets me resize chart better
    const chartOptions={
        maintainAspectRatio:false
       
    };
    
    




    //outputs chart
    return (
        <div>
          
             <div className='left-Chart'>
                <Doughnut data={chartData} options={chartOptions} />
            </div>
       
            
        </div>
    );
};

export default ChartOne;