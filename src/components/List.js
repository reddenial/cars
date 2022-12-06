import '../styles/List.css';
import React from 'react';
import Filters from './Filters';

function List({listOfCars}) {

    const [data, setData] = React.useState([]);
    const [filters, setFilters] = React.useState([]);
    const [listOfNames, setNames] = React.useState([]);

    React.useEffect(() => {
        if (listOfCars) {
            setData(listOfCars);

            if (data[0] !== undefined){
                setFilters(Object.keys(listOfCars[0]))

                //get all car names 
                listOfCars.forEach((el) =>
                    setNames(list => [...list, el.name])
                )
            }
        }
        
    }, [listOfCars]);

    const [options, setOptions] = React.useState([]);

    const onChange = (e) => {

        const value = e.target.id 

        var updatedList = [...options];
        if (e.target.checked) {
            updatedList = [...options, value];
        } else {
            updatedList.splice(options.indexOf(value), 1);
        }
        setOptions(updatedList);

        if (updatedList.length > 0) {
            var filteredArray = listOfCars.filter((car) => updatedList.indexOf(car.name) > -1);
    
            setData(filteredArray)
        } else {
            setData(listOfCars)
        }
    }

    const rangeChange = ({ min, max }) => {
        //console.log(`min = ${min}, max = ${max}`)

        var filteredArray = listOfCars.filter((car) => car.price > min && car.price < max);

        setData(filteredArray)
    }
    
    return (
        <div className="mainContainer">
            <div className="fullwidth">
                <span>Order by</span>
                <select>
                    <option>Recently published</option>
                    <option>Price - in ascending order</option>
                    <option>Price - in descending order</option>
                </select>
            </div>
            <Filters 
                filters={filters} 
                listOfNames={listOfNames} 
                onChange={onChange} 
                rangeChange={rangeChange} 
            />
            <div className="listContainer">

                {data.length > 0 ?
                    
                    data.map(({id, name, url_picture, price, description}) =>
                    <div className="card" key={id}>

                        <div className="thumbnailContainer">
                            <img className="thumbnail" src={url_picture} alt={name}></img>
                        </div>
                        <div className="infosContainer">
                            <h3 className="name">{name}</h3>
                            <p className="description">{description.length > 150 ? description.substring(0, 150) + `...` : description }</p>
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