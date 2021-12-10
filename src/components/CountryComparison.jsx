import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CountrySelect from './CountrySelect';
import { addCountries } from '../actions/templateActions';
import { Button, ButtonGroup } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import Fade from 'react-reveal/Fade';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
)

const lookup = require('country-code-lookup')

let labels = [1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018];
let countryNames = ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bosnia and Herzegovina', 'Botswana', 'Bouvet Island', 'Brazil', 'British Indian Ocean Territory', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo', 'Cook Islands', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands (Malvinas)', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard Island and McDonald Islands', 'Holy See (Vatican City State)', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', "Lao People's Democratic Republic", 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macao', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Réunion', 'Romania', 'Russian Federation', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Pierre and Miquelon', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia and the South Sandwich Islands', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syrian Arab Republic', 'Taiwan', 'Tajikistan', 'Thailand', 'Timor-Leste', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'United States Minor Outlying Islands', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Viet Nam', 'Wallis and Futuna', 'Yemen', 'Zambia', 'Zimbabwe']
let ISO2Codes = ['AF', 'AL', 'DZ', 'AD', 'AO', 'AI', 'AG', 'AR', 'AM', 'AW', 'AU', 'AT', 'AZ', 'BS', 'BH', 'BD', 'BB', 'BY', 'BE', 'BZ', 'BJ', 'BM', 'BT', 'BA', 'BW', 'BV', 'BR', 'IO', null, 'BG', 'BF', 'BI', 'KH', 'CM', 'CA', 'CV', 'KY', 'CF', 'TD', 'CL', 'CN', 'CX', null, 'CO', 'KM', null, 'CK', 'CR', 'HR', 'CU', 'CY', 'CZ', 'DK', 'DJ', 'DM', 'DO', 'EC', 'EG', 'SV', 'GQ', 'ER', 'EE', 'ET', null, 'FO', 'FJ', 'FI', 'FR', 'GF', 'PF', 'GA', 'GM', 'GE', 'DE', 'GH', 'GI', 'GR', 'GL', 'GD', 'GP', 'GU', 'GT', 'GG', 'GN', 'GW', 'GY', 'HT', 'HM', null, 'HN', 'HK', 'HU', 'IS', 'IN', 'ID', 'IR', 'IQ', 'IE', 'IM', 'IL', 'IT', 'JM', 'JP', 'JE', 'JO', 'KZ', 'KE', 'KI', 'KW', 'KG', null, 'LV', 'LB', 'LS', 'LR', 'LY', 'LI', 'LT', 'LU', 'MO', 'MG', 'MW', 'MY', 'MV', 'ML', 'MT', 'MH', 'MQ', 'MR', 'MU', 'YT', 'MX', 'MC', 'MN', 'ME', 'MS', 'MA', 'MZ', 'MM', 'NA', 'NR', 'NP', 'NL', 'NC', 'NZ', 'NI', 'NE', 'NG', 'NU', 'NF', 'MP', 'NO', 'OM', 'PK', 'PW', 'PA', 'PG', 'PY', 'PE', 'PH', 'PN', 'PL', 'PT', 'PR', 'QA', null, 'RO', 'RU', 'RW', 'KN', 'LC', 'PM', 'VC', 'WS', 'SM', 'ST', 'SA', 'SN', 'RS', 'SC', 'SL', 'SG', 'SK', 'SI', 'SB', 'SO', 'ZA', 'GS', 'ES', 'LK', 'SD', 'SR', 'SZ', 'SE', 'CH', null, 'TW', 'TJ', 'TH', null, 'TG', 'TK', 'TO', 'TT', 'TN', 'TR', 'TM', 'TC', 'TV', 'UG', 'UA', 'AE', 'GB', 'US', 'UM', 'UY', 'UZ', 'VU', null, 'WF', 'YE', 'ZM', 'ZW']

let country1AgeStructureData = {
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
let country2AgeStructureData = {
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


function Graph() {

    const countriesData = useSelector(state => state.populationRDC.countries);
    const country1 = useSelector(state => state.populationRDC.country1);
    const country2 = useSelector(state => state.populationRDC.country2);
    const [country1Facts, setCountry1Facts] = useState({});
    const [country2Facts, setCountry2Facts] = useState({});

    const dispatch = useDispatch();

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
        }
        if (!countriesData) {
            grabData();
        }
        // console.log('initializing labels');
        countriesData.data[0].populationCounts.forEach((country, index) => {
            let startDate = 1960;
            let combinedDate = startDate + index;

            if (!labels.includes(combinedDate)) {
                labels.push(combinedDate)
            }

        })
        const getCountry1WorldFactData = async () => {
            let countryObj = lookup.byIso(ISO2Codes[countryNames.indexOf(countriesData.data[country1].country)]);
            // console.log(countryNames.indexOf(countriesData.data[country1].country));
            // console.log(countryObj.fips);
            let response = await fetch(`https://raw.githubusercontent.com/Jeith/worldfactbookapi/master/countries/${countryObj.fips.toLowerCase()}.json`);
            let result = await response.json();
            // console.log(result);
            setCountry1Facts(result);
        }
        getCountry1WorldFactData()
        const getCountry2WorldFactData = async () => {
            let countryObj = lookup.byIso(ISO2Codes[countryNames.indexOf(countriesData.data[country2].country)]);
            // console.log(countryNames.indexOf(countriesData.data[country2].country));
            // console.log(countryObj.fips);
            let response = await fetch(`https://raw.githubusercontent.com/Jeith/worldfactbookapi/master/countries/${countryObj.fips.toLowerCase()}.json`);
            let result = await response.json();
            // console.log(result);
            setCountry2Facts(result);
        }
        getCountry2WorldFactData()
        // console.log(newLabels);
        //component did unmount used as a cleanup function
        // return () =>{
        //     cleanup
        // }
    }, [])

    if (country1Facts["People and Society"]) {
        let age014 = Math.floor(countriesData.data[country1].populationCounts[countriesData.data[country1].populationCounts.length - 1].value*(parseFloat(country1Facts["People and Society"]["Age structure"]["0-14 years"].text.split('%')[0])/100))
        let age1524 = Math.floor(countriesData.data[country1].populationCounts[countriesData.data[country1].populationCounts.length - 1].value*(parseFloat(country1Facts["People and Society"]["Age structure"]["15-24 years"].text.split('%')[0])/100))
        // console.log(age1524);
        let age2554 = Math.floor(countriesData.data[country1].populationCounts[countriesData.data[country1].populationCounts.length - 1].value*(parseFloat(country1Facts["People and Society"]["Age structure"]["25-54 years"].text.split('%')[0])/100))
        // console.log(age2554);
        let age5564 = Math.floor(countriesData.data[country1].populationCounts[countriesData.data[country1].populationCounts.length - 1].value*(parseFloat(country1Facts["People and Society"]["Age structure"]["55-64 years"].text.split('%')[0])/100))
        let age65plus = Math.floor(countriesData.data[country1].populationCounts[countriesData.data[country1].populationCounts.length - 1].value*(parseFloat(country1Facts["People and Society"]["Age structure"]["65 years and over"].text.split('%')[0])/100))

        country1AgeStructureData = {
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
    }
    if (country2Facts["People and Society"]) {
        let age014 = Math.floor(countriesData.data[country2].populationCounts[countriesData.data[country2].populationCounts.length - 1].value*(parseFloat(country2Facts["People and Society"]["Age structure"]["0-14 years"].text.split('%')[0])/100))
        let age1524 = Math.floor(countriesData.data[country2].populationCounts[countriesData.data[country2].populationCounts.length - 1].value*(parseFloat(country2Facts["People and Society"]["Age structure"]["15-24 years"].text.split('%')[0])/100))
        // console.log(age1524);
        let age2554 = Math.floor(countriesData.data[country2].populationCounts[countriesData.data[country2].populationCounts.length - 1].value*(parseFloat(country2Facts["People and Society"]["Age structure"]["25-54 years"].text.split('%')[0])/100))
        // console.log(age2554);
        let age5564 = Math.floor(countriesData.data[country2].populationCounts[countriesData.data[country2].populationCounts.length - 1].value*(parseFloat(country2Facts["People and Society"]["Age structure"]["55-64 years"].text.split('%')[0])/100))
        let age65plus = Math.floor(countriesData.data[country2].populationCounts[countriesData.data[country2].populationCounts.length - 1].value*(parseFloat(country2Facts["People and Society"]["Age structure"]["65 years and over"].text.split('%')[0])/100))

        country2AgeStructureData = {
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
    }


    const options = {
        // responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Population Changes from 1960 to ${labels[labels.length - 1]}`,
            },
        },
    };





    const data = {
        labels,
        datasets: [
            {
                label: countriesData.data[country1].country,
                data: labels.map((label, index) => countriesData.data[country1].populationCounts[index].value),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: countriesData.data[country2].country,
                data: labels.map((label, index) => countriesData.data[country2].populationCounts[index].value),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };


    const columns = [
        // { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Country', width: 150 },
        { field: 'populationStart', headerName: `Population in ${countriesData.data[country1].populationCounts[0].year}`, type: 'number', width: 150 },
        { field: 'populationNow', headerName: `Population in ${countriesData.data[country1].populationCounts[countriesData.data[country1].populationCounts.length - 1].year}`, type: 'number', width: 150 },
        { field: 'populationChange', headerName: `% Change in Population`, type: 'number', width: 200 },
        // {
        //     field: 'population',
        //     headerName: 'Population',
        //     type: 'number',
        //     width: 130,
        // },
    ];

    const rows = [
        { id: uuidv4(), name: countriesData.data[country1].country, populationStart: countriesData.data[country1].populationCounts[0].value, populationNow: countriesData.data[country1].populationCounts[countriesData.data[country1].populationCounts.length - 1].value, populationChange: Math.floor(countriesData.data[country1].populationCounts[countriesData.data[country1].populationCounts.length - 1].value / countriesData.data[country1].populationCounts[0].value * 100)-100, },
        { id: uuidv4(), name: countriesData.data[country2].country, populationStart: countriesData.data[country2].populationCounts[0].value, populationNow: countriesData.data[country2].populationCounts[countriesData.data[country2].populationCounts.length - 1].value, populationChange: Math.floor(countriesData.data[country2].populationCounts[countriesData.data[country2].populationCounts.length - 1].value / countriesData.data[country2].populationCounts[0].value * 100)-100, }
    ]

    // console.log(countriesData);
    // console.log(country1Facts);
    // console.log(country2Facts);
    return (
        <>

            <div className="row justify-content-between">
                <div className="col-12 col-md-10 offset-md-1 ">
                    <div className="row justify-content-center">
                        <div className="col-12 row my-2">
                            <ButtonGroup className='justify-content-center' variant="text" aria-label="text button group">
                                <Button ><Link className="pageLink p-1" to="/" >World Map</Link></Button>
                                <Button ><Link className="pageLink p-1" to="/countryinformation" >Information on {countriesData.data[country1].country}</Link></Button>
                            </ButtonGroup>
                        </div>
                        <div className="col-6 col-md-4"><CountrySelect countrySelection={1} /></div>
                        <div className="col-6 col-md-4"><CountrySelect countrySelection={2} /></div>
                    </div>
                    <Fade right>
                        <div className="row justify-content-around">
                            {/* <div className="col-12 col-md-10"> */}
                                <Line  options={options} data={data} />
                            {/* </div> */}
                        </div>
                    </Fade>
                    <hr />
                    <div className="row justify-content-center">
                        {/* <div style={{textAlign: 'center'}} className="col-12">
                        Population change between 1960 and {labels[labels.length - 1]}:
                        </div>
                        <div style={{textAlign: 'center'}} className="col-6">
                            {countriesData.data[country1].country}: {Math.floor(countriesData.data[country1].populationCounts[countriesData.data[country1].populationCounts.length-1].value/countriesData.data[country1].populationCounts[0].value*100)}%
                        </div>
                        <div style={{textAlign: 'center'}} className="col-6">
                            {countriesData.data[country2].country}: {Math.floor(countriesData.data[country2].populationCounts[countriesData.data[country2].populationCounts.length-1].value/countriesData.data[country2].populationCounts[0].value*100)}%
                        </div> */}
                        <div className='col-12 col-lg-10 col-xl-8' >
                            <Fade left>
                                <div style={{ height: 200, width: '100%' }}>
                                    <DataGrid
                                        autoHeight={true}
                                        disableExtendRowFullWidth={true}
                                        rows={rows}
                                        columns={columns}
                                        pageSize={10}
                                        className='dataGrid'
                                    // rowsPerPageOptions={[10]}
                                    />
                                </div>
                            </Fade>
                        </div>
                        <hr />
                        <div className='row col-12'>
                            <Fade cascade left>
                            <div className="col-12 col-md-6">
                                <div className='info-text' style={{ textAlign: "center", fontWeight: 'bold' }}>Age Structure of {countriesData.data[country1].country}</div>
                                <Pie data={country1AgeStructureData} />
                            </div>
                            </Fade>
                            <Fade cascade right>
                            <div className="col-12 col-md-6">
                                <div className='info-text' style={{ textAlign: "center", fontWeight: 'bold' }}>Age Structure of {countriesData.data[country2].country}</div>
                                <Pie data={country2AgeStructureData} />
                            </div>
                            </Fade>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default Graph
