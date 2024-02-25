import Navbar from "../navbar/Navbar";
import Footer from "../body/Footer";
import "../../css/Map.css";
import { Map, Placemark} from '@pbe/react-yandex-maps';
import React from "react";

const Map_event = () => {


    return (
        <>
            <Navbar></Navbar>
<h2>Карта событий</h2>
            <Map className="YMap"
                defaultState={{
                    center: [54.642587, 83.306391],
                    zoom: 10,
                    controls: [],
                }}>
                    <Placemark defaultGeometry={[54.642587, 83.306391]} />
            </Map>

            <Footer></Footer>
        </>
    );
};

export default Map_event;