import React from 'react';
import Holiday from './Holiday';

export const Holidays = (props) => {
    return (
        <div className="Holiday-List">
            <ul>
                {props.holidays.map((holiday, key) =>
                    <Holiday
                        {...holiday}
                        key={key}/>,
                )}
            </ul>
        </div>
    );
};
