

import React from 'react'
import Fade from 'react-reveal/Fade';

export default function Information() {
    return (
        <>
            <Fade left>
                <div className="row">
                    <div className="col-12 info-header my-2">
                        <h2>Information on Data Used</h2>
                    </div>
                    <div className="col-10 offset-1">
                        <div className="row info-text border my-2 align-items-center">
                            <div className="col-4 col-md-2 my-3">GDP Per Capita:</div>
                            <div className="col-8 col-md-10 my-3">A measure of a country's economic output relative to its population. Higher numbers are a result of more economically productive countries on a per person basis.</div>
                        </div>
                        <div className="row info-text border my-2 align-items-center">
                            <div className="col-4 col-md-2 my-3">Age Dependency:</div>
                            <div className="col-8 col-md-10 my-3">A measure of how much of a country's population is outside of the working age (15 to 65) relative to the population inside the working age. A higher percentage means the average person will spend more of their economic output towards supporting dependents (people not working due to age). This is vital in predicting the economic future of a country.</div>
                        </div>
                        <div className="row info-text border my-2 align-items-center">
                            <div className="col-4 col-md-2 my-3">Doctors Per 10,000 people:</div>
                            <div className="col-8 col-md-10 my-3">The number of medical doctors in a country relative to it's population.</div>
                        </div>
                        <div className="row info-text border my-2 align-items-center">
                            <div className="col-4 col-md-2 my-3">Air Pollution:</div>
                            <div className="col-8 col-md-10 my-3">A measure of the average concentration of fine particulate matter in the air. A larger amount means more pollution, which can lead to health effects when inhaled.</div>
                        </div>
                    </div>
                </div>
            </Fade>
        </>
    )
}
