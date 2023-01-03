import '../styles/List.css';
import React from 'react';
import Filters from './Filters';

function List({listOfCars}) {

    const [data, setData] = React.useState([]);
    const [filters, setFilters] = React.useState([]);
    const [filtersValue, setFiltersValue] = React.useState({});

    React.useEffect(() => {
        if (listOfCars) {
            setData(listOfCars);

            const filterValues = listOfCars.reduce((foundValues, nextCar) => {
                Object.keys(nextCar).forEach(function (key) {
                    
                    if (!foundValues.includes(key)) {
                        foundValues.push(key);
                    }
                });
                return foundValues;
            }, []);
            
            setFilters(filterValues)

            const filtersVal = filters.reduce((prevFilters, value) => {
                return { ...prevFilters, [value]: [] };
            }, {});

            setFiltersValue(filtersVal);
        }
        
    }, [listOfCars]);

    React.useEffect(() => {
        setData(filterArray())
    }, [filtersValue]);

    function filterArray(){

        let initialData = listOfCars.slice();

        for (var filter in filtersValue) {
            if (filtersValue[filter].length > 0) {
                //console.log(filter, filtersValue[filter])
                var filteredArray;

                if (filter === 'fuel' || filter === 'name'){
                    filteredArray = initialData.filter((car) => filtersValue[filter].indexOf(car[filter]) > -1);
                } 
                else if (filter === 'price'){
                    filteredArray = initialData.filter((car) => car.price > filtersValue[filter][0] && car.price < filtersValue[filter][1]);
                }
                else if (filter === 'Year') {
                    filteredArray = initialData.filter((car) => car.Year <= filtersValue[filter]);
                }

                initialData = filteredArray
            }
        }

        return initialData
    }

    const onChange = (e, key) => {

        const value = e.target.id 

        if (e.target.checked) {
            //console.log(`${value} to add from ${key}`)
            filtersValue[key].push(value)
            
            setFiltersValue({
                ...filtersValue, [key]: filtersValue[key],
            })
        }
        else {
            //console.log(`${value} to remove from ${key}`)
            const index = filtersValue[key].indexOf(value);
            if (index > -1) { 
                filtersValue[key].splice(index, 1); 

                if (filtersValue[key].length < 1) {
                    filtersValue[key] = []
                }
            }

            setFiltersValue({
                ...filtersValue, [key]: filtersValue[key],
            })
        }
    }

    const rangeChange = ({ min, max }) => {
        //console.log(`min = ${min}, max = ${max}`)
        
        /*let dataArray = filterArray();
        var filteredWithRangeArray = dataArray.filter((car) => car.price > min && car.price < max);
        setData(filteredWithRangeArray)*/

        setFiltersValue({
            ...filtersValue, price: [min, max], 
        })
    }

    const changeYear = ({ year }) => {
        setFiltersValue({
            ...filtersValue, Year: year,
        })
    }

    const selectOptions = [
        { value: '', text: '------------' },
        { value: 'recent', text: 'Recently published' },
        { value: 'priceasc', text: 'Price - in ascending order' },
        { value: 'pricedes', text: 'Price - in descending order' },
    ];

    const [selected, setSelected] = React.useState(selectOptions[0].value);

    const filterDatas = (type) => {

        //console.log(type)

        const sortedList = filterArray();
        
        if (type === 'recent') {

            const key = 'modified'

            sortedList.sort(function (a, b) {
                var dateA = new Date(a[key]).getTime();
                var dateB = new Date(b[key]).getTime();

                if (dateA > dateB) return -1;
                if (dateA < dateB) return 1;
                return 0;
            });

        } else if (type === 'priceasc') {
            
            const key = 'price'

            sortedList.sort(function (a, b) {
                var keyA = a[key],
                    keyB = b[key];
    
                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
                return 0;
            });

        } else if (type === 'pricedes') {

            const key = 'price'

            sortedList.sort(function (a, b) {
                var keyA = a[key],
                    keyB = b[key];

                if (keyA > keyB) return -1;
                if (keyA < keyB) return 1;
                return 0;
            });
        }

        setData(sortedList)
    }


    const handleChange = (e) => {
        setSelected(e.target.value)
        filterDatas(e.target.value)
    };
    
    return (
        <div className="mainContainer">
            <div className="fullwidth">
                <div className="leftCol">
                    {data.length + (data.length > 1 ? ' results' : ' result')}</div>
                <div className="rightCol">
                    <span>Order by</span>
                    <select value={selected} onChange={handleChange}>
                        {selectOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.text}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <Filters 
                listOfCars={listOfCars}
                filters={filters} 
                onChange={onChange} 
                rangeChange={rangeChange} 
                changeYear={changeYear}
            />
            <div className="listContainer">

                {data.length > 0 ?
                    
                    data.map(({id, name, url_picture, price, description, modified, fuel, Year}) =>
                    <div className="card" key={id}>
                    <div className="thumbnailContainer">
                    <img className="thumbnail" src={url_picture} alt={name}></img>
                    </div>
                    <div className="infosContainer">
                            <span className="date">Posted on {new Date(modified).toLocaleDateString("fr-BE")}</span>
                            <h3 className="name">{name}</h3>
                                <p className="description">{fuel}</p>
                                <p className="description">{Year}</p>
                        </div>
                        <div className="priceContainer">
                            <p>Achetez pour <span>{price}</span></p>
                        </div>
                    </div>)
                    
                    : <div className="no-result">Sorry there is no match found</div>
                }
            </div>
        </div>
    );
}

export default List;