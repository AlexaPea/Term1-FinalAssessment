import React from 'react';

const CardTable = (props) => {

    
    return (
        <div>
            <div className='TableItem'>
                <h3>{props.name}</h3>
                <p>{props.content}</p>
                <p><strong>Manufacturer: {props.manu} </strong></p>
                <a href={props.websiteLink} target='_blank'><p>Click to See Website</p></a>
            </div>
            
        </div>
    );
};

export default CardTable;