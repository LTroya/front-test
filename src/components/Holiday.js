import React from 'react';

export const Holiday = (props) => {
    return (
       <div>
           {props.date}: {props.name}
       </div>
    );
};

export default Holiday;
