
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {  chooseCountry1 } from '../actions/templateActions';
import Zoom from 'react-reveal/Zoom';
import { scaleQuantize } from "d3-scale";
import {
    ComposableMap,
    Geographies,
    Geography,
    Sphere,
    Graticule
} from "react-simple-maps";

import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";

const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

var colorScale = scaleLinear()
    .domain([10000, 1500000000])
    // .domain([1000, 75000])
    .range(["#ffedea", "#ff5233"]);

let ISO3Codes = [ 'AFG', 'ALB', 'DZA', 'AND', 'AGO', 'AIA', 'ATG', 'ARG', 'ARM', 'ABW', 'AUS', 'AUT', 'AZE', 'BHS', 'BHR', 'BGD', 'BRB', 'BLR', 'BEL', 'BLZ', 'BEN', 'BMU', 'BTN', 'BIH', 'BWA', 'BVT', 'BRA', 'IOT', null, 'BGR', 'BFA', 'BDI', 'KHM', 'CMR', 'CAN', 'CPV', 'CYM', 'CAF', 'TCD', 'CHL', 'CHN', 'CXR', null, 'COL', 'COM', null, 'COK', 'CRI', 'HRV', 'CUB', 'CYP', 'CZE', 'DNK', 'DJI', 'DMA', 'DOM', 'ECU', 'EGY', 'SLV', 'GNQ', 'ERI', 'EST', 'ETH', null, 'FRO', 'FJI', 'FIN', 'FRA', 'GUF', 'PYF', 'GAB', 'GMB', 'GEO', 'DEU', 'GHA', 'GIB', 'GRC', 'GRL', 'GRD', 'GLP', 'GUM', 'GTM', 'GGY', 'GIN', 'GNB', 'GUY', 'HTI', 'HMD', null, 'HND', 'HKG', 'HUN', 'ISL', 'IND', 'IDN', 'IRN', 'IRQ', 'IRL', 'IMN', 'ISR', 'ITA', 'JAM', 'JPN', 'JEY', 'JOR', 'KAZ', 'KEN', 'KIR', 'KWT', 'KGZ', null, 'LVA', 'LBN', 'LSO', 'LBR', 'LIE', 'LTU', 'LUX', 'MAC', 'MDG', 'MWI', 'MYS', 'MDV', 'MLI', 'MLT', 'MHL', 'MTQ', 'MRT', 'MUS', 'MYT', 'MEX', 'MCO', 'MNG', 'MNE', 'MSR', 'MAR', 'MOZ', 'MMR', 'NAM', 'NRU', 'NPL', 'NLD', 'NCL', 'NZL', 'NIC', 'NER', 'NGA', 'NIU', 'NFK', 'MNP', 'NOR', 'OMN', 'PAK', 'PLW', 'PAN', 'PNG', 'PRY', 'PER', 'PHL', 'PCN', 'POL', 'PRT', 'PRI', 'QAT', null, 'ROU', 'RWA', 'KNA', 'LCA', 'SPM', 'VCT', 'WSM', 'SMR', 'STP', 'SAU', 'SEN', 'SRB', 'SYC', 'SLE', 'SGP', 'SVK', 'SVN', 'SLB', 'SOM', 'ZAF', 'SGS', 'ESP', 'LKA', 'SDN', 'SUR', 'SWZ', 'SWE', 'CHE', null, 'TWN', 'TJK', 'THA', null, 'TGO', 'TKL', 'TON', 'TTO', 'TUN', 'TUR', 'TKM', 'TCA', 'TUV', 'UGA', 'UKR', 'ARE', 'GBR', 'USA', 'UMI', 'URY', 'UZB', 'VUT', null, 'WLF', 'YEM', 'ZMB', 'ZWE' ]
let countryNames = [ 'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bosnia and Herzegovina', 'Botswana', 'Bouvet Island', 'Brazil', 'British Indian Ocean Territory', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo', 'Cook Islands', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands (Malvinas)', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard Island and McDonald Islands', 'Holy See (Vatican City State)', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', "Lao People's Democratic Republic", 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macao', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Réunion', 'Romania', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Pierre and Miquelon', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia and the South Sandwich Islands', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syrian Arab Republic', 'Taiwan', 'Tajikistan', 'Thailand', 'Timor-Leste', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'United States Minor Outlying Islands', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Viet Nam', 'Wallis and Futuna', 'Yemen', 'Zambia', 'Zimbabwe' ]


function MapChart({ chartType }) {

    
    
    const countryChoices = useSelector(state => state.populationRDC.countryChoices);
    const popData = useSelector(state => state.populationRDC.popData)
    const docData = useSelector(state => state.populationRDC.docData)
    const airData = useSelector(state => state.populationRDC.airData)

    const dispatch = useDispatch();
    const [data, setData] = useState([]);

    useEffect(() => {
        // console.log('initializing mapChart', chartType);
            csv(`/score.csv`).then((data) => {
                setData(data);
            });
            colorScale = scaleLinear()
                // .domain([10000, 1500000000])
                .domain([1000, 75000])
                .range(["#ffedea", "#ff5233"]);
        // }
    }, [])

    useEffect(() => {

        // console.log('chartType changed');
        updateChart()

    }, [chartType])

    const handleClickCountry = (countryName) => {
        let chosenCountryObj = countryChoices.filter(country => countryName === country.label)
        // console.log(chosenCountryObj);
        if (chosenCountryObj.length === 1) {
            // console.log(chosenCountryObj[0]);
            dispatch(chooseCountry1(chosenCountryObj[0].index))
        }
    }

    const updateChart = () => {
        if (chartType === 'Population') {

            let formattedPopData = [];
            popData.data.forEach((row, index) => {
                let countryIndex = ISO3Codes.indexOf(row[4])
                if(countryIndex!==-1){
                    let newRowObj = {ISO3: row[4], Name: countryNames[countryIndex], 2015: row[6]}
                    // console.log(newRowObj);
                    formattedPopData.push(newRowObj)
                }
            })
            formattedPopData.columns = ['ISO3', "Name", '2015',]
            // console.log(formattedPopData);
            formattedPopData.push({ISO3: "RUS", Name: "Russian Federation", 2015: 144000})

            setData(formattedPopData);

            colorScale = scaleQuantize()
                .domain([10, 1500000])
                // .domain([1000, 75000])
                .range([
                    "#ffedea",
                    "#ffcec5",
                    "#ffad9f",
                    "#ff8a75",
                    "#ff5533",
                    "#e2492d",
                    "#be3d26",
                    "#9a311f",
                    "#782618"
                ]);
        }
        else if (chartType === 'Doctors Per 10,000 People') {

            let formattedDocData = [];
            docData.forEach((row, index) => {
                let countryIndex = ISO3Codes.indexOf(row[5])
                if(countryIndex!==-1 && (parseInt(row[2])>2013)){
                    let newRowObj = {ISO3: row[5], Name: countryNames[countryIndex], 2015: row[6]}
                    // console.log(newRowObj);
                    formattedDocData.push(newRowObj)
                }
            })
            formattedDocData.columns = ['ISO3', "Name", '2015',]
            // console.log(formattedDocData);
            formattedDocData.push({ISO3: "RUS", Name: "Russian Federation", 2015: 44.4})

            setData(formattedDocData);

            colorScale = scaleQuantize()
                .domain([0.1, 100])
                // .domain([1000, 75000])
                .range([
                    "#ffedea",
                    "#ffcec5",
                    "#ffad9f",
                    "#ff8a75",
                    "#ff5533",
                    "#e2492d",
                    "#be3d26",
                    "#9a311f",
                    "#782618"
                ]);
        }
        else if (chartType === 'Air Pollution') {

            let formattedAirData = [];
            airData.forEach((row, index) => {
                let countryIndex = ISO3Codes.indexOf(row[6])
                if(countryIndex!==-1 ){
                    let newRowObj = {ISO3: row[6], Name: countryNames[countryIndex], 2015: row[9]}
                    // console.log(newRowObj);
                    formattedAirData.push(newRowObj)
                }
            })
            formattedAirData.columns = ['ISO3', "Name", '2015',]
            // console.log(formattedAirData);
            formattedAirData.push({ISO3: "RUS", Name: "Russian Federation", 2015: 9.8})

            setData(formattedAirData);

            colorScale = scaleQuantize()
                .domain([5, 150])
                // .domain([1000, 75000])
                .range([
                    "#ffedea",
                    "#ffcec5",
                    "#ffad9f",
                    "#ff8a75",
                    "#ff5533",
                    "#e2492d",
                    "#be3d26",
                    "#9a311f",
                    "#782618"
                ]);
        }
        else if (chartType === 'GDP Per Capita') {
            csv(`/score.csv`).then((data) => {
                // console.log(data);
                // console.log(data[191]);
                // console.log(data.columns);
                // console.log(typeof data);
                setData(data);
            });
            colorScale = scaleQuantize()
                // .domain([10000, 1500000000])
                .domain([1000, 75000])
                .range([
                    "#ffedea",
                    "#ffcec5",
                    "#ffad9f",
                    "#ff8a75",
                    "#ff5533",
                    "#e2492d",
                    "#be3d26",
                    "#9a311f",
                    "#782618"
                ]);
        }
        else if (chartType === 'Age Dependency') {
            csv(`/AgeDependency.csv`).then((data) => {
                setData(data);
            });
            colorScale = scaleQuantize()
                // .domain([10000, 1500000000])
                .domain([10, 99])
                .range([
                    "#ffedea",
                    "#ffcec5",
                    "#ffad9f",
                    "#ff8a75",
                    "#ff5533",
                    "#e2492d",
                    "#be3d26",
                    "#9a311f",
                    "#782618"
                ]);
        }
    }

    useEffect(() => {
        // console.log('setting data');
    }, [data])

    // console.log('running mapChart', chartType);

    return (
        <>
            <Zoom>
                <ComposableMap style={{ height: '70vh', width: '100%' }}
                    projectionConfig={{
                        rotate: [-10, 0, 0],
                        scale: 147
                    }}
                >
                    <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
                    <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
                    {data.length > 0 && (
                        <Geographies geography={geoUrl}>
                            {({ geographies }) =>
                                geographies.map((geo) => {
                                    const d = data.find((s) => s.ISO3 === geo.properties.ISO_A3);
                                    return (
                                        <Geography style={{
                                            default: {
                                                outline: 'none'
                                            },
                                            hover: {
                                                outline: 'none'
                                            },
                                            pressed: {
                                                outline: 'none'
                                            }
                                        }}
                                            onClick={() => handleClickCountry(geo.properties.NAME_LONG)}
                                            key={geo.rsmKey}
                                            geography={geo}
                                            fill={d ? colorScale(d["2015"]) : "#F5F4F6"}
                                        />
                                    );
                                })
                            }
                        </Geographies>
                    )}
                </ComposableMap>
            </Zoom>
        </>
    )
}

export default MapChart
