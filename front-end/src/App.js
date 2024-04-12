import { useState } from 'react';
import './App.css';
import Weather from './component/Weather';
import { Toaster } from 'react-hot-toast';

function App() {
  const [optionSelected,setOptionSelected] = useState('city')
  return (
    <>
    <ul className='d-flex justify-content-evenly mt-5'>
      <li className={optionSelected === 'city' ? ('list-group-item fw-light fs-3 border-2 border-primary border-bottom') : ('list-group-item fw-light fs-3')} role='button' onClick={()=>setOptionSelected('city')}>Search By City</li>
      <li className={optionSelected === 'zip' ? ('list-group-item fw-light fs-3 border-2 border-primary border-bottom') : ('list-group-item fw-light fs-3')} role='button' onClick={()=>setOptionSelected('zip')}>Search By ZipCode</li>
    </ul>
    <Weather optionSelected={optionSelected}/>
    <Toaster/>
    </>
  );
}

export default App;
