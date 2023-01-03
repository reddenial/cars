import '../styles/Filters.css';
import React from 'react';
import RangeSlider from './RangeSlider';
import Slider from './Slider';

function getValuesFromKey(arr, key){
    if (arr.length > 0) {

        const values = arr.reduce((foundValues, nextCar) =>
            foundValues.includes(nextCar[key]) ?
                foundValues : foundValues.concat(nextCar[key]), []
        );

        return values
    }

}

function Filters({ listOfCars, filters, onChange, rangeChange, changeYear }) {

    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <div className={'filters ' + (isOpen ? 'opened' : 'closed')}>
            {isOpen ? 
                <div className="mobileMenuButton moved active" onClick={() => setIsOpen(false)}> 
                    <span className="hamburger_icon"> 
                        <span></span> 
                    </span> 
                    <span className="menu_txt menu">close filters</span> 
                </div>
                :
                <div className="mobileMenuButton" onClick={() => setIsOpen(true)}>
                    <span className="hamburger_icon">
                        <span></span>
                    </span>
                    <span className="menu_txt menu">open filters</span>
                </div>
            }
            
            <div className={'filtersContainer ' + (isOpen ? 'opened' : 'closed')}>
                {filters.map((key) => {
                    if (key === 'name' || key === 'fuel')
                        return (
                            <div className="filterContainer" key={key}>
                                <h2 className="filterTitle">{key}</h2>
                                {getValuesFromKey(listOfCars, key).sort().map((name) =>
                                    <div className="checkboxContainer" key={name}>
                                        <input id={name} type="checkbox" onChange={(e) => onChange(e, key)}></input>
                                        <label htmlFor={name}>{name.split(' ')[0]}</label>
                                    </div>
                                )}
                                
                            </div>
                        )
                    else if (key === 'price')
                        return (
                            <div className="filterContainer" key={key}>
                                <h2 className="filterTitle">{key}</h2>
                                <RangeSlider
                                    min={0}
                                    max={40000}
                                    step={5000}
                                    onChange={(e) => rangeChange(e)}
                                />
                            </div>
                        )
                    else if (key === 'Year')
                        return (
                            <div className="filterContainer" key={key}>
                                <h2 className="filterTitle">{key}</h2>
                                <Slider
                                    min={2017}
                                    max={2022}
                                    step={1}
                                    onChange={(e) => changeYear(e)}
                                />
                            </div>
                        )
                    return null
                    }
                )} 

                <button
                    className='select-filters'
                    onClick={() => setIsOpen(false)}
                >
                    Select filters
                </button>
            </div>
        </div>
    )
}

export default Filters;