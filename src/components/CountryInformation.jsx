
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { Button, ButtonGroup, Card } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import Fade from 'react-reveal/Fade';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie, Doughnut } from 'react-chartjs-2';
const lookup = require('country-code-lookup')

let countryNames = ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bosnia and Herzegovina', 'Botswana', 'Bouvet Island', 'Brazil', 'British Indian Ocean Territory', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo', 'Cook Islands', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands (Malvinas)', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard Island and McDonald Islands', 'Holy See (Vatican City State)', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', "Lao People's Democratic Republic", 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macao', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Réunion', 'Romania', 'Russian Federation', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Pierre and Miquelon', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia and the South Sandwich Islands', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syrian Arab Republic', 'Taiwan', 'Tajikistan', 'Thailand', 'Timor-Leste', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'United States Minor Outlying Islands', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Viet Nam', 'Wallis and Futuna', 'Yemen', 'Zambia', 'Zimbabwe']
let ISO2Codes = ['AF', 'AL', 'DZ', 'AD', 'AO', 'AI', 'AG', 'AR', 'AM', 'AW', 'AU', 'AT', 'AZ', 'BS', 'BH', 'BD', 'BB', 'BY', 'BE', 'BZ', 'BJ', 'BM', 'BT', 'BA', 'BW', 'BV', 'BR', 'IO', null, 'BG', 'BF', 'BI', 'KH', 'CM', 'CA', 'CV', 'KY', 'CF', 'TD', 'CL', 'CN', 'CX', null, 'CO', 'KM', null, 'CK', 'CR', 'HR', 'CU', 'CY', 'CZ', 'DK', 'DJ', 'DM', 'DO', 'EC', 'EG', 'SV', 'GQ', 'ER', 'EE', 'ET', null, 'FO', 'FJ', 'FI', 'FR', 'GF', 'PF', 'GA', 'GM', 'GE', 'DE', 'GH', 'GI', 'GR', 'GL', 'GD', 'GP', 'GU', 'GT', 'GG', 'GN', 'GW', 'GY', 'HT', 'HM', null, 'HN', 'HK', 'HU', 'IS', 'IN', 'ID', 'IR', 'IQ', 'IE', 'IM', 'IL', 'IT', 'JM', 'JP', 'JE', 'JO', 'KZ', 'KE', 'KI', 'KW', 'KG', null, 'LV', 'LB', 'LS', 'LR', 'LY', 'LI', 'LT', 'LU', 'MO', 'MG', 'MW', 'MY', 'MV', 'ML', 'MT', 'MH', 'MQ', 'MR', 'MU', 'YT', 'MX', 'MC', 'MN', 'ME', 'MS', 'MA', 'MZ', 'MM', 'NA', 'NR', 'NP', 'NL', 'NC', 'NZ', 'NI', 'NE', 'NG', 'NU', 'NF', 'MP', 'NO', 'OM', 'PK', 'PW', 'PA', 'PG', 'PY', 'PE', 'PH', 'PN', 'PL', 'PT', 'PR', 'QA', null, 'RO', 'RU', 'RW', 'KN', 'LC', 'PM', 'VC', 'WS', 'SM', 'ST', 'SA', 'SN', 'RS', 'SC', 'SL', 'SG', 'SK', 'SI', 'SB', 'SO', 'ZA', 'GS', 'ES', 'LK', 'SD', 'SR', 'SZ', 'SE', 'CH', null, 'TW', 'TJ', 'TH', null, 'TG', 'TK', 'TO', 'TT', 'TN', 'TR', 'TM', 'TC', 'TV', 'UG', 'UA', 'AE', 'GB', 'US', 'UM', 'UY', 'UZ', 'VU', null, 'WF', 'YE', 'ZM', 'ZW']
// console.log(ISO2Codes[166]);
let ageStructureData = {
    labels: ['0-14', '15-24', '24-54', '55-64', '65 and Over'],
    datasets: [
        {
            label: 'Age Structure',
            data: [2, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
        },
    ],
};
let gdpSectorData = {
    labels: ['agriculture', 'industry', 'services'],
    datasets: [
        {
            label: 'GDP - composition, by sector of origin',
            data: [2, 19, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
        },
    ],
};
let gdpEndData = {
    labels: ['household consumption', 'government consumption', 'investment in fixed capital', 'investment in inventories', 'exports of goods and services', 'imports of goods and services'],
    datasets: [
        {
            label: 'GDP - composition, by end use',
            data: [2, 19, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgb(0,255,255, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgb(0,255,255, 1)'
            ],
            borderWidth: 1,
        },
    ],
};

ChartJS.register(ArcElement, Tooltip, Legend);

function CountryInformation() {

    const countriesData = useSelector(state => state.populationRDC.countries);
    const citiesData = useSelector(state => state.populationRDC.cities);
    const flagsData = useSelector(state => state.populationRDC.flags);
    const country1 = useSelector(state => state.populationRDC.country1);
    const [countryFlag, setCountryFlag] = useState('');
    const [countryCapital, setCountryCapital] = useState('')
    // const [countryISO2, setCountryISO2] = useState(ISO2Codes[countryNames.indexOf(country1)]);
    const [countryFacts, setCountryFacts] = useState({})
    const [chosenCountryCities, setChosenCountryCities] = useState(citiesData.data.filter(city => city.country.toLowerCase().includes(countriesData.data[country1].country.toLowerCase())))
    const capitalsData = useSelector(state => state.populationRDC.capitals);
    const [showPop, setShowPop] = useState(false);
    const [showEco, setShowEco] = useState(false);
    const [showGeo, setShowGeo] = useState(false);
    const [showDis, setShowDis] = useState(false);
    // console.log(citiesData.data);
    // console.log(lookup.countries);
    // console.log(lookup.byCountry(countriesData.data[country1].country).fips);
    // let countryObj = lookup.byIso(ISO2Codes[countryNames.indexOf(countriesData.data[country1].country)]);
    // console.log(countryObj.fips);
    // let chosenCountryCities = citiesData.data.filter(city => city.country.toLowerCase().includes(countriesData.data[country1].country.toLowerCase()));
    // console.log(chosenCountryCities);
    let chosenCountryCitiesRowObj = chosenCountryCities.map(city => {
        return {
            id: uuidv4(),
            city: city.city,
            year: city.populationCounts[0].year,
            population: Math.floor(city.populationCounts[0].value) || null
        }
    })


    // let age1524 = parseFloat(countryFacts["People and Society"]["Age structure"]["15-24 years"].text.split('%')[0]);

    if (countryFacts["People and Society"]) {
        console.log(countryFacts);
        // console.log(countryFacts.Economy["Economy - overview"].text.indexOf(" ++ "));

        let age014 = Math.floor(countriesData.data[country1].populationCounts[countriesData.data[country1].populationCounts.length - 1].value*(parseFloat(countryFacts["People and Society"]["Age structure"]["0-14 years"].text.split('%')[0])/100))
        let age1524 = Math.floor(countriesData.data[country1].populationCounts[countriesData.data[country1].populationCounts.length - 1].value*(parseFloat(countryFacts["People and Society"]["Age structure"]["15-24 years"].text.split('%')[0])/100))
        // console.log(age1524);
        let age2554 = Math.floor(countriesData.data[country1].populationCounts[countriesData.data[country1].populationCounts.length - 1].value*(parseFloat(countryFacts["People and Society"]["Age structure"]["25-54 years"].text.split('%')[0])/100))
        // console.log(age2554);
        let age5564 = Math.floor(countriesData.data[country1].populationCounts[countriesData.data[country1].populationCounts.length - 1].value*(parseFloat(countryFacts["People and Society"]["Age structure"]["55-64 years"].text.split('%')[0])/100))
        let age65plus = Math.floor(countriesData.data[country1].populationCounts[countriesData.data[country1].populationCounts.length - 1].value*(parseFloat(countryFacts["People and Society"]["Age structure"]["65 years and over"].text.split('%')[0])/100))

        ageStructureData = {
            labels: ['0-14', '15-24', '25-54', '55-64', '65 and Over'],
            datasets: [
                {
                    label: 'Age Structure',
                    data: [age014, age1524, age2554, age5564, age65plus],
                    backgroundColor: [
                        'rgba(255, 99, 132, .5)',
                        'rgba(54, 162, 235, .5)',
                        'rgba(255, 206, 86, .5)',
                        'rgba(75, 192, 192, .5)',
                        'rgba(153, 102, 255, .5)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        };

        let gdpSecAg = parseFloat(countryFacts.Economy["GDP - composition, by sector of origin"].agriculture.text.split('%')[0]);
        let gdpSecInd = parseFloat(countryFacts.Economy["GDP - composition, by sector of origin"].industry.text.split('%')[0]);
        let gdpSecSer = parseFloat(countryFacts.Economy["GDP - composition, by sector of origin"].services.text.split('%')[0]);

        gdpSectorData = {
            labels: ['agriculture', 'industry', 'services'],
            datasets: [
                {
                    label: 'GDP - composition, by sector of origin',
                    data: [gdpSecAg, gdpSecInd, gdpSecSer],
                    backgroundColor: [
                        'rgba(255, 99, 132, .5)',
                        'rgba(54, 162, 235, .5)',
                        'rgba(255, 206, 86, .5)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        };

        let gdpEndExp = parseFloat(countryFacts.Economy['GDP - composition, by end use']['exports of goods and services'].text.split('%')[0]);
        let gdpEndImp = parseFloat(countryFacts.Economy['GDP - composition, by end use']['imports of goods and services'].text.split('%')[0]);
        let gdpEndIIn = parseFloat(countryFacts.Economy['GDP - composition, by end use']['investment in inventories'].text.split('%')[0]);
        let gdpEndIFC = parseFloat(countryFacts.Economy['GDP - composition, by end use']['investment in fixed capital'].text.split('%')[0]);
        let gdpEndGvC = parseFloat(countryFacts.Economy['GDP - composition, by end use']['government consumption'].text.split('%')[0]);
        let gdpEndHsC = parseFloat(countryFacts.Economy['GDP - composition, by end use']['household consumption'].text.split('%')[0]);

        gdpEndData = {
            labels: ['household consumption', 'government consumption', 'investment in fixed capital', 'investment in inventories', 'exports of goods and services', 'imports of goods and services'],
            datasets: [
                {
                    label: 'GDP - composition, by end use',
                    data: [gdpEndHsC, gdpEndGvC, gdpEndIFC, gdpEndIIn, gdpEndExp, gdpEndImp],
                    backgroundColor: [
                        'rgba(255, 99, 132, .5)',
                        'rgba(54, 162, 235, .5)',
                        'rgba(255, 206, 86, .5)',
                        'rgba(75, 192, 192, .5)',
                        'rgba(153, 102, 255, .5)',
                        'rgb(0,255,255, .5)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgb(0,255,255, 1)'
                    ],
                    borderWidth: 1,
                },
            ],
        };
    }



    // console.log(countryFlagObj);



    useEffect(() => {

        let fixedFlagsData = [...flagsData.data,{ name: 'russian federation', flag: "https://media.istockphoto.com/photos/flat-flag-of-russia-picture-id545240242?b=1&k=20&m=545240242&s=170667a&w=0&h=yKr6P7hfTVOvObUXFCZAfrm-yb2Hx9w3hHXaofVnxwc=" }, { name: 'south sudan', flag: 'https://cdn.britannica.com/37/150637-004-5D1F2321/Bandera-de-Sudan-del-Sur.jpg' }, { name: 'american samoa', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Flag_of_American_Samoa.svg/1200px-Flag_of_American_Samoa.svg.png' }, { name: 'libya', flag: 'https://cdn.britannica.com/37/3037-004-1C8F9958/Flag-Libya.jpg' }];

        // console.log(fixedFlagsData);
        let countryFlagObj = fixedFlagsData.filter(country => country.name.toLowerCase().includes(countriesData.data[country1].country.toLowerCase()));
        // console.log(countryFlagObj);
        if (countryFlagObj[0].name === 'British Indian Ocean Territory') {
            setCountryFlag(countryFlagObj[1].flag);
        }
        else {
            setCountryFlag(countryFlagObj[0].flag);
        }

        let fixedCapitalsData = [...capitalsData.data, { name: 'russian federation', capital: 'Moscow' }]
        let capitalObj = fixedCapitalsData.filter(country => country.name.toLowerCase().includes(countriesData.data[country1].country.toLowerCase()))
        // console.log(capitalObj);
        if (capitalObj[0].name === 'British Indian Ocean Territory') {
            setCountryCapital(capitalObj[1].capital)
        }
        else {
            setCountryCapital(capitalObj[0].capital)
        }
        const getWorldFactData = async () => {
            let countryObj = lookup.byIso(ISO2Codes[countryNames.indexOf(countriesData.data[country1].country)]);
            // console.log(countryNames.indexOf(countriesData.data[country1].country));
            // console.log(countryObj.fips);
            let response = await fetch(`https://raw.githubusercontent.com/Jeith/worldfactbookapi/master/countries/${countryObj.fips.toLowerCase()}.json`);
            let result = await response.json();
            // console.log(result);
            setCountryFacts(result);
        }
        getWorldFactData()

    }, [])




    const columns = [
        // { field: 'id', headerName: 'ID', width: 70 },
        { field: 'city', headerName: 'City', width: 150 },
        { field: 'year', headerName: 'Year', width: 60 },
        {
            field: 'population',
            headerName: 'Population',
            type: 'number',
            width: 120,
        },
    ];
    const rows = chosenCountryCitiesRowObj;

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // console.log(countryFacts);
    // console.log(countriesData.data[country1].populationCounts[countriesData.data[country1].populationCounts.length - 1].value);

    return (
        <>
            {/* <Link to="/countrycomparison" >Compare Countries</Link> */}

            <div className="row justify-content-between">
                <div className="col-12 col-md-10 offset-md-1">
                    <div className="row justify-content-center">
                        <div className="col-12 row my-2">
                            <ButtonGroup className='justify-content-center' variant="text" aria-label="text button group">
                                <Button ><Link className="pageLink p-2" to="/" >View World Map</Link></Button>
                                <Button ><Link className="pageLink p-2" to="/countrycomparison" >Compare Populations</Link></Button>
                            </ButtonGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 col-md-4 countryInformationText row align-items-center">
                            <h1>{countriesData.data[country1].country}</h1>
                            <h5>Capital: {countryCapital}</h5>
                            <h5>Population: {numberWithCommas(countriesData.data[country1].populationCounts[countriesData.data[country1].populationCounts.length - 1].value)}</h5>
                        </div>
                        <div className="col-6 col-md-4 row align-items-center justify-content-center">
                            <img style={{height: '150px', width: 'fit-content'}} className="countryFlag" src={countryFlag} />
                        </div>
                        <div className="col-12 col-md-4">
                            <div className='info-text' style={{ textAlign: "center", fontWeight: 'bold' }}>Age Structure</div>
                            <Pie data={ageStructureData} />
                        </div>
                        <hr />
                        <div className="col-12 info-text  my-2">
                            {(countryFacts.Introduction) ? countryFacts.Introduction.Background.text : null}
                        </div>

                        <div className="col-12 row mt-3 justify-content-center">
                            <h2 onClick={()=>setShowPop(!showPop)} className="countryInfoSection">List of cities by population in {countriesData.data[country1].country}:</h2>
                            {showPop? <div className="row"><div className='col-12 col-sm-8 col-md-6 col-lg-5'>
                                <div style={{ height: 500, width: '100%' }}>
                                    <DataGrid
                                        rows={rows}
                                        columns={columns}
                                    // pageSize={10}
                                    // rowsPerPageOptions={[10]}
                                    />
                                </div>
                            </div></div> : null }
                            
                        </div>
                        <hr className='mt-3' />
                        <div className="col-12 mt-3 row ">
                            <h2 onClick={()=>setShowEco(!showEco)} className="countryInfoSection">Economy in {countriesData.data[country1].country}:</h2>
                            {showEco? <div className="row">{countryFacts.Economy ? <div className='info-text'>{countryFacts.Economy["Economy - overview"].text.substring(0, countryFacts.Economy["Economy - overview"].text.indexOf(" ++ "))}</div> : null}
                            <br />
                            {countryFacts.Economy ? <div className='my-2'><h5 className="countryInformationText">Labor Force</h5><div>{countryFacts.Economy["Labor force"].text}</div></div> : null}
                            <br />
                            <div className='col-12 col-md-6'>{countryFacts.Economy ?  <div style={{textAlign: 'center', fontWeight: 'bold'}}>GDP Composition by Sector of Origin<Doughnut data={gdpSectorData} /></div>: null}</div>
                            <div className='col-12 col-md-6'>{countryFacts.Economy ?  <div style={{textAlign: 'center', fontWeight: 'bold'}}>GDP Composition by End Use<Doughnut data={gdpEndData} /></div>: null}</div></div> : null}
                            
                            
                        </div>
                        <hr className='my-3' />
                        <div className="col-12 mt-3 row ">
                            <h2 onClick={()=>setShowGeo(!showGeo)} className="countryInfoSection">Geography in {countriesData.data[country1].country}:</h2>
                            {showGeo? <div className="row">{countryFacts.Geography ? <div className='my-2'><h5 className="countryInformationText">Population Distribution:</h5><div className='info-text'>{countryFacts.Geography['Population - distribution']?countryFacts.Geography['Population - distribution'].text:null}</div></div> : null}
                            <br />
                            {countryFacts.Geography ? <div className='my-2'><h5 className="countryInformationText">Climate:</h5><div className='info-text'>{countryFacts.Geography.Climate? countryFacts.Geography.Climate.text:null}</div></div> : null}
                            <br />
                            {countryFacts.Geography ? <div className='my-2'><h5 className="countryInformationText">Area: </h5><div className='info-text'>Land: {countryFacts.Geography.Area? countryFacts.Geography.Area.land.text:null}</div><div className='info-text'>Water: {countryFacts.Geography.Area.water.text}</div></div> : null}
                            <br />
                            {countryFacts.Geography ? <div className='my-2'><h5 className="countryInformationText">Bordering Countries: </h5><div className='info-text'>{countryFacts.Geography['Land boundaries']['border countries']?countryFacts.Geography['Land boundaries']['border countries'].text:null}</div></div> : null}</div> : null}
                            
                        </div>
                        <hr className='my-3' />
                        <div className="col-12 mt-3 row ">
                            <h2 onClick={()=>setShowDis(!showDis)} className="countryInfoSection">International Disputes in {countriesData.data[country1].country}:</h2>
                            {showDis? <div className="row">{countryFacts['Transnational Issues'] ? <div className='my-2'><div className='info-text'>{countryFacts['Transnational Issues']['Disputes - international'].text}</div></div> : null}
                            </div> : null}
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default CountryInformation

