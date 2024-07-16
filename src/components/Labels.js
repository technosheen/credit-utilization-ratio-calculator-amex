import React from "react";




export default function labels(props) {
    const {index} = props;


    return (
        <div className='labels'>
            <label htmlFor={'balance' + index}>
                {'Card ' + (index + 1) + ' '}<span style={{fontWeight: 400}}>(Balance)</span>
            </label>
            <div className='helpDiv'>
                <label htmlFor={'limit' + index}>
                    {'Card ' + (index + 1) + ' '}<span style={{fontWeight: 400}}>(Limit)</span>
                </label>
                
            </div>
        </div>
    );
}