import React from 'react';
import 'chart.js/auto';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import axios from 'axios';
import { useState, useEffect, useRef} from 'react';
import CardTable from './CardTable';


const ChartFour = () => {

    const [cardInfo, setCardInfo] = useState([]);

    useEffect(()=>{
        axios.get("https://api.spacexdata.com/v3/missions")
        .then((res)=>{ //if responsive
            let data = res.data;

            const missionData = [];

            //loops through all data and makes an array of objects
            for(let i=0; i<data.length; i++){

                missionData.push({
                    name: data[i].mission_name,
                    text: data[i].description.substring(0, 255),
                    manufacturer: data[i].manufacturers[0],
                    website: data[i].website,
                    id: data[i].mission_id


                })

            }
            setCardInfo(missionData);
          
               
    
    
            
    
        })
    }, []);

    //goes through each object and outputs specified props to table
    let missionCardInfo = cardInfo.map((item)=> <CardTable key={item.id} name={item.name} content={item.text} manu={item.manufacturer} websiteLink={item.website}/>);



    return (
        <div>
            
            <div className='bottom-panel'>
            <h3 className='Heading'>Mission Log</h3>
                {missionCardInfo} 
            </div>
        </div>
    );
};

export default ChartFour;