import React, { useCallback, useEffect, useState, useRef } from "react";

import '../styles/Slider.css';

function Slider({ min, max, step, onChange, type }) {
    // the width of the box
    const typeName = type === 'Year' ? 'year' : 'KM';
    const val = typeName === 'year' ? 2022 : 0;
    const [value, setValue] = useState(val);

    // This function is called when the first range slider changes
    const changeValue = (event) => {
        setValue(event.target.value)
    };

    useEffect(() => {
        onChange({ [typeName]: value });
    }, [value]);

    return (
        <div className="slideContainer">
            <input
                type='range'
                onChange={changeValue}
                min={min}
                max={max}
                step={step}
                value={value}
                className="custom-slider"
            ></input>

            <div className="slider">
                <p className="slider__right-value">{typeName === 'KM' ? 'more than '+ value + 'km' : value}</p>
            </div>
        </div>
        
    )
}

export default Slider;