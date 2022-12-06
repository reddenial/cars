import '../styles/App.css';
import List from './List';
import React from 'react';

function App() {
  const [listOfCars, setListOfCars] = React.useState([]);

  React.useEffect(() => {
    fetch('https://auto.gokalp.be/produits')
      .then(results => results.json())
      .then(data => {
        setListOfCars(data)
      });
  }, []); 

  return (
    <div className="app">
      <List listOfCars={listOfCars} />
    </div>
  );
}

export default App;
