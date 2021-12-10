
import { ADD_COUNTRIES, CHOOSE_COUNTRY_1, CHOOSE_COUNTRY_2, ADD_CITIES, ADD_FLAGS, ADD_CAPITALS, ADD_POP_CSV, ADD_DOC_CSV, ADD_AIR_CSV } from "../actions/types";

const initialState = {
    countries: [],
    country1: 114,
    country2: 207,
    countryChoices: [
        {
            code: "AD",
            label: "Andorra",
            index: 50
        },
        {
            code: "AE",
            label: "United Arab Emirates",
            index: 250
        },
        {
            code: "AF",
            label: "Afghanistan",
            index: 46
        },
        {
            code: "AG",
            label: "Antigua and Barbuda",
            index: 52
        },
        {
            code: "AL",
            label: "Albania",
            index: 47
        },
        {
            code: "AM",
            label: "Armenia",
            index: 54
        },
        {
            code: "AO",
            label: "Angola",
            index: 51
        },
        {
            code: "AR",
            label: "Argentina",
            index: 53
        },
        {
            code: "AS",
            label: "American Samoa",
            index: 49
        },
        {
            code: "AT",
            label: "Austria",
            index: 57
        },
        {
            code: "AU",
            label: "Australia",
            suggested: true,
            index: 56
        },
        {
            code: "AW",
            label: "Aruba",
            index: 55
        },
        {
            code: "AZ",
            label: "Azerbaijan",
            index: 58
        },
        {
            code: "BA",
            label: "Bosnia and Herzegovina",
            index: 70
        },
        {
            code: "BB",
            label: "Barbados",
            index: 62
        },
        {
            code: "BD",
            label: "Bangladesh",
            index: 61
        },
        {
            code: "BE",
            label: "Belgium",
            index: 64
        },
        {
            code: "BF",
            label: "Burkina Faso",
            index: 76
        },
        {
            code: "BG",
            label: "Bulgaria",
            index: 75
        },
        {
            code: "BH",
            label: "Bahrain",
            index: 60
        },
        {
            code: "BI",
            label: "Burundi",
            index: 77
        },
        {
            code: "BJ",
            label: "Benin",
            index: 66
        },
        {
            code: "BM",
            label: "Bermuda",
            index: 67
        },
        {
            code: "BN",
            label: "Brunei Darussalam",
            index: 74
        },
        {
            code: "BO",
            label: "Bolivia",
            index: 69
        },
        {
            code: "BR",
            label: "Brazil",
            index: 72
        },
        {
            code: "BT",
            label: "Bhutan",
            index: 68
        },
        {
            code: "BW",
            label: "Botswana",
            index: 71
        },
        {
            code: "BY",
            label: "Belarus",
            index: 63
        },
        {
            code: "BZ",
            label: "Belize",
            index: 65
        },
        {
            code: "CA",
            label: "Canada",
            suggested: true,
            index: 81
        },
        {
            code: "CF",
            label: "Central African Republic",
            index: 83
        },
        {
            code: "CH",
            label: "Switzerland",
            index: 234
        },
        {
            code: "CI",
            label: "Cote d'Ivoire",
            index: 93
        },
        {
            code: "CL",
            label: "Chile",
            index: 86
        },
        {
            code: "CM",
            label: "Cameroon",
            index: 80
        },
        {
            code: "CN",
            label: "China",
            index: 87
        },
        {
            code: "CO",
            label: "Colombia",
            index: 88
        },
        {
            code: "CR",
            label: "Costa Rica",
            index: 92
        },
        {
            code: "CU",
            label: "Cuba",
            index: 95
        },
        {
            code: "CW",
            label: "Curacao",
            index: 96
        },
        {
            code: "CY",
            label: "Cyprus",
            index: 97
        },
        {
            code: "CZ",
            label: "Czech Republic",
            index: 98
        },
        {
            code: "DE",
            label: "Germany",
            suggested: true,
            index: 119
        },
        {
            code: "DJ",
            label: "Djibouti",
            index: 100
        },
        {
            code: "DK",
            label: "Denmark",
            index: 99
        },
        {
            code: "DM",
            label: "Dominica",
            index: 101
        },
        {
            code: "DO",
            label: "Dominican Republic",
            index: 102
        },
        {
            code: "DZ",
            label: "Algeria",
            index: 48
        },
        {
            code: "EC",
            label: "Ecuador",
            index: 103
        },
        {
            code: "EE",
            label: "Estonia",
            index: 108
        },
        {
            code: "ER",
            label: "Eritrea",
            index: 107
        },
        {
            code: "ES",
            label: "Spain",
            index: 225
        },
        {
            code: "ET",
            label: "Ethiopia",
            index: 110
        },
        {
            code: "FI",
            label: "Finland",
            index: 113
        },
        {
            code: "FJ",
            label: "Fiji",
            index: 112
        },
        {
            code: "FO",
            label: "Faroe Islands",
            index: 111
        },
        {
            code: "FR",
            label: "France",
            suggested: true,
            index: 114
        },
        {
            code: "GA",
            label: "Gabon",
            index: 116
        },
        {
            code: "GB",
            label: "United Kingdom",
            index: 251
        },
        {
            code: "GD",
            label: "Grenada",
            index: 124
        },
        {
            code: "GE",
            label: "Georgia",
            index: 118
        },
        {
            code: "GH",
            label: "Ghana",
            index: 120
        },
        {
            code: "GI",
            label: "Gibraltar",
            index: 121
        },
        {
            code: "GL",
            label: "Greenland",
            index: 123
        },
        {
            code: "GN",
            label: "Guinea",
            index: 127
        },
        {
            code: "GQ",
            label: "Equatorial Guinea",
            index: 106
        },
        {
            code: "GR",
            label: "Greece",
            index: 122
        },
        {
            code: "GT",
            label: "Guatemala",
            index: 126
        },
        {
            code: "GU",
            label: "Guam",
            index: 125
        },
        {
            code: "GW",
            label: "Guinea-Bissau",
            index: 128
        },
        {
            code: "GY",
            label: "Guyana",
            index: 129
        },
        {
            code: "HN",
            label: "Honduras",
            index: 131
        },
        {
            code: "HR",
            label: "Croatia",
            index: 94
        },
        {
            code: "HT",
            label: "Haiti",
            index: 130
        },
        {
            code: "HU",
            label: "Hungary",
            index: 133
        },
        {
            code: "ID",
            label: "Indonesia",
            index: 136
        },
        {
            code: "IE",
            label: "Ireland",
            index: 139
        },
        {
            code: "IL",
            label: "Israel",
            index: 141
        },
        {
            code: "IM",
            label: "Isle of Man",
            index: 140
        },
        {
            code: "IN",
            label: "India",
            index: 135
        },
        {
            code: "IQ",
            label: "Iraq",
            index: 138
        },
        {
            code: "IS",
            label: "Iceland",
            index: 134
        },
        {
            code: "IT",
            label: "Italy",
            index: 142
        },
        {
            code: "JM",
            label: "Jamaica",
            index: 143
        },
        {
            code: "JO",
            label: "Jordan",
            index: 145
        },
        {
            code: "JP",
            label: "Japan",
            suggested: true,
            index: 144
        },
        {
            code: "KE",
            label: "Kenya",
            index: 147
        },
        {
            code: "KH",
            label: "Cambodia",
            index: 79
        },
        {
            code: "KI",
            label: "Kiribati",
            index: 148
        },
        {
            code: "KM",
            label: "Comoros",
            index: 89
        },
        {
            code: "KW",
            label: "Kuwait",
            index: 152
        },
        {
            code: "KY",
            label: "Cayman Islands",
            index: 82
        },
        {
            code: "KZ",
            label: "Kazakhstan",
            index: 146
        },
        {
            code: "LB",
            label: "Lebanon",
            index: 156
        },
        {
            code: "LI",
            label: "Liechtenstein",
            index: 160
        },
        {
            code: "LK",
            label: "Sri Lanka",
            index: 226
        },
        {
            code: "LR",
            label: "Liberia",
            index: 158
        },
        {
            code: "LS",
            label: "Lesotho",
            index: 157
        },
        {
            code: "LT",
            label: "Lithuania",
            index: 161
        },
        {
            code: "LU",
            label: "Luxembourg",
            index: 162
        },
        {
            code: "LV",
            label: "Latvia",
            index: 155
        },
        {
            code: "LY",
            label: "Libya",
            index: 159
        },
        {
            code: "MA",
            label: "Morocco",
            index: 179
        },
        {
            code: "MC",
            label: "Monaco",
            index: 176
        },
        {
            code: "ME",
            label: "Montenegro",
            index: 178
        },
        {
            code: "MG",
            label: "Madagascar",
            index: 164
        },
        {
            code: "MH",
            label: "Marshall Islands",
            index: 170
        },
        {
            code: "ML",
            label: "Mali",
            index: 168
        },
        {
            code: "MM",
            label: "Myanmar",
            index: 181
        },
        {
            code: "MN",
            label: "Mongolia",
            index: 177
        },
        {
            code: "MP",
            label: "Northern Mariana Islands",
            index: 192
        },
        {
            code: "MR",
            label: "Mauritania",
            index: 171
        },
        {
            code: "MT",
            label: "Malta",
            index: 169
        },
        {
            code: "MU",
            label: "Mauritius",
            index: 172
        },
        {
            code: "MV",
            label: "Maldives",
            index: 167
        },
        {
            code: "MW",
            label: "Malawi",
            index: 165
        },
        {
            code: "MX",
            label: "Mexico",
            index: 173
        },
        {
            code: "MY",
            label: "Malaysia",
            index: 166
        },
        {
            code: "MZ",
            label: "Mozambique",
            index: 180
        },
        {
            code: "NA",
            label: "Namibia",
            index: 182
        },
        {
            code: "NC",
            label: "New Caledonia",
            index: 186
        },
        {
            code: "NE",
            label: "Niger",
            index: 189
        },
        {
            code: "NG",
            label: "Nigeria",
            index: 190
        },
        {
            code: "NI",
            label: "Nicaragua",
            index: 188
        },
        {
            code: "NL",
            label: "Netherlands",
            index: 185
        },
        {
            code: "NO",
            label: "Norway",
            index: 193
        },
        {
            code: "NP",
            label: "Nepal",
            index: 184
        },
        {
            code: "NR",
            label: "Nauru",
            index: 183
        },
        {
            code: "NZ",
            label: "New Zealand",
            index: 187
        },
        {
            code: "OM",
            label: "Oman",
            index: 194
        },
        {
            code: "PA",
            label: "Panama",
            index: 197
        },
        {
            code: "PE",
            label: "Peru",
            index: 200
        },
        {
            code: "PF",
            label: "French Polynesia",
            index: 115
        },
        {
            code: "PG",
            label: "Papua New Guinea",
            index: 198
        },
        {
            code: "PH",
            label: "Philippines",
            index: 201
        },
        {
            code: "PK",
            label: "Pakistan",
            index: 195
        },
        {
            code: "PL",
            label: "Poland",
            index: 202
        },
        {
            code: "PR",
            label: "Puerto Rico",
            index: 204
        },
        {
            code: "PT",
            label: "Portugal",
            index: 203
        },
        {
            code: "PW",
            label: "Palau",
            index: 196
        },
        {
            code: "PY",
            label: "Paraguay",
            index: 199
        },
        {
            code: "QA",
            label: "Qatar",
            index: 205
        },
        {
            code: "RO",
            label: "Romania",
            index: 206
        },
        {
            code: "RS",
            label: "Serbia",
            index: 214
        },
        {
            code: "RU",
            label: "Russian Federation",
            index: 207
        },
        {
            code: "RW",
            label: "Rwanda",
            index: 208
        },
        {
            code: "SA",
            label: "Saudi Arabia",
            index: 212
        },
        {
            code: "SB",
            label: "Solomon Islands",
            index: 221
        },
        {
            code: "SC",
            label: "Seychelles",
            index: 215
        },
        {
            code: "SD",
            label: "Sudan",
            index: 231
        },
        {
            code: "SE",
            label: "Sweden",
            index: 233
        },
        {
            code: "SG",
            label: "Singapore",
            index: 217
        },
        {
            code: "SI",
            label: "Slovenia",
            index: 220
        },
        {
            code: "SL",
            label: "Sierra Leone",
            index: 216
        },
        {
            code: "SM",
            label: "San Marino",
            index: 210
        },
        {
            code: "SN",
            label: "Senegal",
            index: 213
        },
        {
            code: "SO",
            label: "Somalia",
            index: 222
        },
        {
            code: "SR",
            label: "Suriname",
            index: 232
        },
        {
            code: "SS",
            label: "South Sudan",
            index: 224
        },
        {
            code: "ST",
            label: "Sao Tome and Principe",
            index: 211
        },
        {
            code: "SV",
            label: "El Salvador",
            index: 105
        },
        {
            code: "SX",
            label: "Sint Maarten (Dutch part)",
            index: 218
        },
        {
            code: "SY",
            label: "Syrian Arab Republic",
            index: 235
        },
        {
            code: "TC",
            label: "Turks and Caicos Islands",
            index: 246
        },
        {
            code: "TD",
            label: "Chad",
            index: 84
        },
        {
            code: "TG",
            label: "Togo",
            index: 240
        },
        {
            code: "TH",
            label: "Thailand",
            index: 238
        },
        {
            code: "TJ",
            label: "Tajikistan",
            index: 236
        },
        {
            code: "TL",
            label: "Timor-Leste",
            index: 239
        },
        {
            code: "TM",
            label: "Turkmenistan",
            index: 245
        },
        {
            code: "TN",
            label: "Tunisia",
            index: 243
        },
        {
            code: "TO",
            label: "Tonga",
            index: 241
        },
        {
            code: "TR",
            label: "Turkey",
            index: 244
        },
        {
            code: "TT",
            label: "Trinidad and Tobago",
            index: 242
        },
        {
            code: "TV",
            label: "Tuvalu",
            index: 247
        },
        {
            code: "UA",
            label: "Ukraine",
            index: 249
        },
        {
            code: "UG",
            label: "Uganda",
            index: 248
        },
        {
            code: "US",
            label: "United States",
            suggested: true,
            index: 252
        },
        {
            code: "UY",
            label: "Uruguay",
            index: 253
        },
        {
            code: "UZ",
            label: "Uzbekistan",
            index: 254
        },
        {
            code: "VG",
            label: "British Virgin Islands",
            index: 73
        },
        {
            code: "VN",
            label: "Vietnam",
            index: 257
        },
        {
            code: "VU",
            label: "Vanuatu",
            index: 255
        },
        {
            code: "WS",
            label: "Samoa",
            index: 209
        },
        {
            code: "XK",
            label: "Kosovo",
            index: 151
        },
        {
            code: "ZA",
            label: "South Africa",
            index: 223
        },
        {
            code: "ZM",
            label: "Zambia",
            index: 261
        },
        {
            code: "ZW",
            label: "Zimbabwe",
            index: 262
        }
    ]
}

const grabData = async () => {
    console.log('making fetch request')
    let results = await fetch('https://countriesnow.space/api/v0.1/countries/population', {headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
        method: "GET",
    })
    let data = await results.json();
    // console.log(data)
    return {
        countries: data
    }
}

const populationReducer = (state=initialState, action) => {
    
    switch (action.type) {

        case ADD_CITIES:
            return {
                ...state,
                cities: {...action.cities}
            }

        case ADD_COUNTRIES:
            return {
                ...state,
                countries: {...action.countries}
            }
        case ADD_FLAGS:
            return {
                ...state,
                flags: {...action.flags}
            }
        case ADD_CAPITALS:
            return {
                ...state,
                capitals: {...action.capitals}
            }
        case CHOOSE_COUNTRY_1:
            // console.log('reducer country1 name: ', action.countryName)
            // console.log(action)
            return {
                ...state,
                country1: action.countryName
            }
        case CHOOSE_COUNTRY_2:
            // console.log('reducer country2 name: ', action.countryName)
            // console.log(action)
            return {
                ...state,
                country2: action.countryName
            }
        case ADD_POP_CSV:
            
            return {
                ...state,
                popData: action.popData
            }
        case ADD_DOC_CSV:
            
            return {
                ...state,
                docData: action.docData
            }
        case ADD_AIR_CSV:
            
            return {
                ...state,
                airData: action.airData
            }
    
        default:
            return state;
    }
}

export default populationReducer;




