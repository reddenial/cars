import '../styles/Filters.css';
import React from 'react';
import RangeSlider from './RangeSlider';

function Filters({ filters, onChange, rangeChange, listOfNames }) {

    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <div className="filters">
            {isOpen ? 
                <div class="mobileMenuButton moved active" onClick={() => setIsOpen(false)}> 
                    <span class="hamburger_icon"> 
                        <span></span> 
                    </span> 
                    <span class="menu_txt menu">close filters</span> 
                </div>
                :
                <div class="mobileMenuButton" onClick={() => setIsOpen(true)}>
                    <span class="hamburger_icon">
                        <span></span>
                    </span>
                    <span class="menu_txt menu">open filters</span>
                </div>
            }
            
            <div className={'filtersContainer ' + (isOpen ? 'opened' : 'closed')}>
                {filters.map((key) => {
                    if (key === 'name')
                        return (
                            <div className="filterContainer" key={key}>
                                <h2 className="filterTitle">{key}</h2>
                                {listOfNames.sort().map((name) =>
                                    <div className="checkboxContainer" key={name}>
                                        <input id={name} type="checkbox" onChange={(e) => onChange(e)}></input>
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