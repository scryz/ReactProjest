import Navbar from "../navbar/Navbar";
import Footer from "../body/Footer";
import "../../css/Map.css";
import { YMaps, Map} from '@pbe/react-yandex-maps';
import { GeolocationControl } from '@pbe/react-yandex-maps';

const Map_event = () => {

    const handleGeolocationChange = (event) => {
        const coordinates = event.get('coords'); // Получаем координаты
        console.log('Геопозиция пользователя:', coordinates);
    }

    const handleMapLoad = (ymaps) => {
        if (ymaps.geolocation) {
            ymaps.geolocation.get({
                provider: 'auto',
            }).then(handleGeolocationChange);
            // Если нужно обновлять геопозицию по мере перемещения пользователя
            ymaps.geolocation.events.add('change', handleGeolocationChange);
        }
    }

    return (
        <>
            <Navbar></Navbar>

            <YMaps>
                <h2>Карта мероприятий</h2>
                <Map
                    defaultState={{
                        center: [55.751574, 37.573856],
                        zoom: 9,
                        controls: [],
                    }}
                    modules={['geolocation']}
                    onLoad={handleMapLoad}
                >
                    <GeolocationControl options={{ float: "left" }} />
                </Map>
            </YMaps>

            <Footer></Footer>
        </>
    );
};

export default Map_event;