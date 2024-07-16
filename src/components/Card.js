import React, {useState, useEffect} from "react";
import Labels from './Labels'


export default function Card(props) {
    const { card, index, update} = props;
    const charMax = 8;
    const [cardObj, setCardObj] = useState(card);
    const [displayValues, setDisplayValues] = useState({
        balance: styleValue(cardObj.balance),
        limit: styleValue(cardObj.limit)
    });


    const handleInput = e => {
        e.preventDefault();
        let {name, value} = e.target;

        // Remove any display styling
        const hasOnlyNumbers = /^\d+$/.test(value);
        value = hasOnlyNumbers ? parseInt(value) : unstyleValue(value);

        // Update child if input has changed
        setCardObj((oldCard) => {
            return oldCard[name] !== value ?
                {...oldCard, [name]: value} :
                oldCard;
        });
        // Update cards array in parent
        value = value || 0;
        update({...cardObj, [name]: value}, index);
    };

    useEffect(() => { // Style inputs on change
        let bal = styleValue(cardObj.balance)
        let lim = styleValue(cardObj.limit)
        setDisplayValues({balance: bal, limit: lim});
    }, [cardObj]);


    return (
        <div className='card'>

            <Labels index={index} />
            <div className='inputRow'>
                <input 
                    name='balance'
                    maxLength={charMax}
                    id={'balance' + index}
                    onChange={handleInput}
                    value={displayValues.balance}>
                </input>
                <input 
                    name='limit'
                    maxLength={charMax}
                    id={'limit' + index}
                    onChange={handleInput}
                    value={displayValues.limit}>
                </input>
            </div>
        </div>
    );
}

// Styles numbers to US conventions
const styleValue = (value) => {
    // If 0 or falsy, return empty string
    if (!value) return '';

    // Remove styling
    value = unstyleValue(value);

    // Style with commas and '$'
    value = '$' + (value.toLocaleString("en-US"));
    return value;
};

// Removes number styling
const unstyleValue = (value) => {
    // If value is styled
    if (typeof value === 'string') {
        // Remove all non-numbers and cast as int
        value = parseInt(value.replace(/[^0-9]/g, ""))
    }
    return value;
}
