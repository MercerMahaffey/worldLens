import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addCountries, chooseCountry1, addCities, addFlags, addCapitals, addPopCSV, addDocCSV, addAirCSV } from './actions/templateActions';
import { Link } from 'react-router-dom';
import { csv } from "d3-fetch";
import { Button, ButtonGroup, Slider } from '@mui/material';
import MapChart from './components/MapChart';
import { readString } from 'react-papaparse';
const lookup = require('country-code-lookup')

const DATA_ARRAY=[]

function App() {

  const countriesData = useSelector(state => state.populationRDC.countries);
  const flagsData = useSelector(state => state.populationRDC.flags)
  const country1 = useSelector(state => state.populationRDC.country1);
  const countryChoices = useSelector(state => state.populationRDC.countryChoices);

  const [dataChoice, setDataChoice] = useState('Age Dependency');
  const [data, setData] = useState([]);
  const [sliderNumber, setSliderNumber] = useState(3);

  const dispatch = useDispatch();

  // console.log(lookup.countries);
  // console.log(lookup.byIso);

  // componentDidMount if dependency list is empty
  useEffect(() => {
    const grabData = async () => {
      console.log('making fetch request')
      let results = await fetch('https://countriesnow.space/api/v0.1/countries/population', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "GET",
      })
      let apiData = await results.json();
      // console.log(apiData)
      dispatch(addCountries(apiData))
      csv(`/populationData.csv`).then((data) => {
        setData(data);
      });

      let citiesResponse = await fetch('https://countriesnow.space/api/v0.1/countries/population/cities', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "GET"
      });
      let citiesResult = await citiesResponse.json();
      // console.log('citiesResult', citiesResult);
      dispatch(addCities(citiesResult))
      
      let flagsResponse = await fetch('https://countriesnow.space/api/v0.1/countries/flag/images');
      let flagsResult = await flagsResponse.json();
      // console.log(flagsResult);
      dispatch(addFlags(flagsResult));

      let capitalsResponse = await fetch('https://countriesnow.space/api/v0.1/countries/capital');
      let capitalsResult = await capitalsResponse.json();
      // console.log(capitalsResult);
      dispatch(addCapitals(capitalsResult));
      // const grabCSV = async () => {
      let popCSVResponse = await fetch('http://apps.who.int/gho/athena/api/GHO/WHS9_86?format=csv',);
      let popCSVResult = await popCSVResponse.text();
      // console.log(popCSVResult);
      let popParsed = readString(popCSVResult);
      // console.log(parsed);
      dispatch(addPopCSV(popParsed));
      
      let doctorsCSVResponse = await fetch('http://apps.who.int/gho/athena/api/GHO/HWF_0001?format=csv',);
      let doctorsCSVResult = await doctorsCSVResponse.text();

      let docParsed = readString(doctorsCSVResult);
      let docCountryNamesArray = {};
      let docFilteredArray = docParsed.data.filter(countryObj=> {
        // if doccountrynamesarray has a key with a year less than this countryObj year then add name/year to doccountrynamesarray and return the object to the docFilteredArray
        if(!docCountryNamesArray[countryObj[5]] || parseInt(docCountryNamesArray[countryObj[5]])<parseInt(countryObj[2])){
          docCountryNamesArray[countryObj[5]]=countryObj[2]
          return true
        }else{
          return false
        }
      })
      // console.log(docCountryNamesArray);
      // console.log(docParsed);
      console.log(docFilteredArray);
      console.log('changed security policy');

      dispatch(addDocCSV(docFilteredArray));
      
      let airCSVResponse = await fetch('http://apps.who.int/gho/athena/api/GHO/SDGPM25?format=csv');
      let airCSVResult = await airCSVResponse.text();
      
      let airParsed = readString(airCSVResult);
      console.log(airParsed);
      let airCountryNamesArray = {};
      let airFilteredArray = airParsed.data.filter(countryObj=> {
        // if aircountrynamesarray has a key with a year less than this countryObj year then add name/year to aircountrynamesarray and return the object to the airFilteredArray
        if(!airCountryNamesArray[countryObj[6]] || parseInt(airCountryNamesArray[countryObj[6]])<parseInt(countryObj[2])){
          airCountryNamesArray[countryObj[6]]=countryObj[2]
          return true
        }else{
          return false
        }
      })

      
      dispatch(addAirCSV(airFilteredArray));
      
    }
    if (countriesData.length === 0) {
      grabData();
    }

    //component did unmount used as a cleanup function
    // return () =>{
    //     cleanup
    // }
  }, [])


  // console.log(flagsData);
  const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

  const handleClickCountry = (countryName) => {
    let chosenCountryObj = countryChoices.filter(country => countryName === country.label)
    // console.log(chosenCountryObj);
    if (chosenCountryObj.length === 1) {
      // console.log(chosenCountryObj[0]);
      dispatch(chooseCountry1(chosenCountryObj[0].index))
    }
  }

  
  // async function getData() {
  //   const response = await fetch('http://apps.who.int/gho/athena/api/GHO/WHS9_86?format=csv', {
  //     headers : { 
  //       'content-type': 'text/csv;charset=UTF-8'
  //      }
  //     })
  //     .catch(function() {
  //       console.log("error");
  //   }); 
    
    
  //   const data = await response.text();
  //   // console.log(data);
    
  //   const rows = data.split((/\r?\n|\r/)).slice(1);
  //   // console.log(rows[1]);
  //   rows.forEach(elt => {
  //           const colums = elt.split(';');
  //           const titre = colums[0];
  //           // console.log(titre);
  //           DATA_ARRAY.push(titre);
  //   })
    
  //   console.log(DATA_ARRAY);
  //     }
    
    
    
  //   getData();
    

//   const downloadCsv = async () => {
//     try {
//         const target = `http://apps.who.int/gho/athena/api/GHO/WHS9_86?format=csv`; //file
//         //const target = `https://SOME_DOMAIN.com/api/data/log_csv?$"queryString"`; //target can also be api with req.query
        
//         const res = await fetch(target, {
//             method: 'get',
//             headers: {
//                 'content-type': 'text/csv;charset=UTF-8',
//                 //'Authorization': //in case you need authorisation
//             }
//         });

//         if (res.status === 200) {

//             const data = await res.text();
//             console.log(data);

//         } else {
//             console.log(`Error code ${res.status}`);
//         }
//     } catch (err) {
//         console.log(err)
//     }
// }
// downloadCsv();



  // console.log(countriesData);
  useEffect(() => {
    // console.log('setting data');
  }, [data])

  useEffect(() => {
    
    // console.log('number', sliderNumber);

    switch (sliderNumber) {
      case 1:
        setDataChoice('Population')
        break;
      case 2:
        setDataChoice('GDP Per Capita')
        break;
      case 3:
        setDataChoice('Age Dependency')
        break;
      case 4:
        setDataChoice('Doctors Per 10,000 People')
        break;
      case 5:
        setDataChoice('Air Pollution')
        break;
    
      default:
        break;
    }
  }, [sliderNumber])

  // console.log('running app', dataChoice);

  const renderMap = () => {
    let mapDiv = document.getElementById('mapContainer').innerHTML = <MapChart chartType={dataChoice} />
    // console.log(mapDiv);
    // <MapChart chartType={dataChoice} />
  }

  const grabApi = async () => {
    let result = await fetch('https://raw.githubusercontent.com/Jeith/worldfactbookapi/master/countries/us.json');
    let response = await result.text();
    console.log(response);
  }
  // grabApi();


  // console.log('running app');
  return (
    <div >
      <div  className='row'>
        <div style={{ width: '100%', textAlign: 'center' }} className="col-12 py-2">
        <Link className="pageLink" to="/countrycomparison" > <Button>Compare Populations</Button></Link>
        </div>
        <div style={{ width: '100%', textAlign: 'center', }} className="col-12 py-2">
          {/* <ButtonGroup  variant="text" aria-label="text button group">
          <Button style={{fontFamily: "Noto Serif Display, serif",color: "rgb(20, 111, 197)",textDecoration: "none", fontSize: "13px"}} onClick={() => setDataChoice('Population')} >Population</Button>
          <Button style={{fontFamily: "Noto Serif Display, serif",color: "rgb(20, 111, 197)",textDecoration: "none", fontSize: "13px"}} onClick={() => setDataChoice('GDP Per Capita')} >GDP per Capita</Button>
          <Button style={{fontFamily: "Noto Serif Display, serif",color: "rgb(20, 111, 197)",textDecoration: "none", fontSize: "13px"}} onClick={() => setDataChoice('Age Dependency')} >Age Dependency Ratio</Button>
          <Button style={{fontFamily: "Noto Serif Display, serif",color: "rgb(20, 111, 197)",textDecoration: "none", fontSize: "13px"}} onClick={() => setDataChoice('Doctors Per 100,000 People')} >Doctors Per 100,000 People</Button>
        </ButtonGroup> */}
        <Slider onChange={(e)=>setSliderNumber(e.target.value)}
        aria-label="Chart"
        color='primary'
        defaultValue={3}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={5}
        />
        </div>
        <div style={{ width: '100%', textAlign: 'center', position: 'absolute', top: '25vh', zIndex: '3' }} className="col-12">

        {countriesData.data ? <h2><Link className="selectedCountry" to="/countryinformation" >Info on {countriesData.data[country1].country}</Link></h2> : <h1>Choose a Country</h1>}

        </div>
        <div>
          <div>
            <MapChart chartType={dataChoice} /> 
          </div>
        </div>
        <div style={{fontFamily: "Noto Serif Display, serif",textDecoration: "none", fontSize: "15px", position: 'absolute', bottom: '15%',  width: '100%', textAlign: 'center' }}>
          Map of <Link className="pageLink2" to="/information" >{dataChoice}</Link>. Click country to change selection.
        </div>
      </div>
    </div>
  )
}

export default App;
