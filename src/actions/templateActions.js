

/**
 *  Multiple actions in this file
 * This is not a named export
 */
import { ADD_COUNTRIES, CHOOSE_COUNTRY_1, CHOOSE_COUNTRY_2, ADD_CITIES, ADD_FLAGS, ADD_CAPITALS, ADD_POP_CSV, ADD_DOC_CSV, ADD_AIR_CSV } from "./types"

export const addCountries = (data) => {
    return {
        type: ADD_COUNTRIES,
        countries: data
    }
}
export const addCities = (data) => {
    return {
        type: ADD_CITIES,
        cities: data
    }
}
export const addFlags = (data) => {
    return {
        type: ADD_FLAGS,
        flags: data
    }
}
export const addCapitals = (data) => {
    return {
        type: ADD_CAPITALS,
        capitals: data
    }
}

export const chooseCountry1 = (data) => {
    return {
        type: CHOOSE_COUNTRY_1,
        countryName: data
    }
}
export const chooseCountry2 = (data) => {
    return {
        type: CHOOSE_COUNTRY_2,
        countryName: data
    }
}
export const addPopCSV = (data) => {
    return {
        type: ADD_POP_CSV,
        popData: data
    }
}
export const addDocCSV = (data) => {
    return {
        type: ADD_DOC_CSV,
        docData: data
    }
}
export const addAirCSV = (data) => {
    return {
        type: ADD_AIR_CSV,
        airData: data
    }
}


