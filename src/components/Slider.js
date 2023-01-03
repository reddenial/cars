import React, { useCallback, useEffect, useState, useRef } from "react";

import '../styles/Slider.css';

function Slider({ min, max, step, onChange }) {
    // the width of the box
    const [year, setYear] = useState(2022);

    // This function is called when the first range slider changes
    const changeYear = (event) => {
        setYear(event.target.value)
    };

    useEffect(() => {
        onChange({ year: year });
    }, [year]);

    return (
        <div className="slideContainer">
            <input
                type='range'
                onChange={changeYear}
                min={min}
                max={max}
                step={step}
                value={year}
                className="custom-slider"
            ></input>

            <div className="slider">
                <p className="slider__right-value">{year}</p>
            </div>
        </div>
        
    )
}

export default Slider;