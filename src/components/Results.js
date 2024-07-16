import React from "react";
import uniqid from 'uniqid';

export default function Results(props) { 
    const { totalUtilization, cards } = props;

    // Highlight utilizations which exceed 30%
    // (30% is the recommended max utilization)
    const checkUtilization = (utilization) => {
        return utilization > 30.0 ? 'red' : 'black';
    }

    return (
        <div>
            <div className='output-top'>
                <h2>Your Credit Utilization</h2>
            </div>
            {
                cards.map((card, index) => (
                    <div className='utilizationRow' key={uniqid()}>
                        <label className='outputLabels' htmlFor={'output' + (index + 1)}>
                            {'Card ' + (index + 1) + ' Utilization:'}
                        </label>
                        <output id={'output' + index} className={checkUtilization(card.utilization)}>
                            {card.utilization + '%'}
                        </output>
                    </div>
                ))
            }
            <div>
                <label className='outputTop' htmlFor='totalUtilization'>
                    Overall credit utilization ratio
                </label>
                <output className={checkUtilization(totalUtilization)} id='totalUtilization'>
                    {totalUtilization + '%'}
                </output>
            </div>
        </div>
    );
}
