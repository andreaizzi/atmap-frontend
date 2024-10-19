import L from 'leaflet';
import React, { useEffect, useRef, useState } from 'react';
import { RouteManager, VehicleManager } from './manager';
import { getMockupVehicles, mockupRoutes} from './mockupData';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false });
const Polyline = dynamic(() => import('react-leaflet').then((mod) => mod.Polyline), { ssr: false });


const Map: React.FC = () => {
    const [vehiclePositions, setVehiclePositions] = useState<{ id: string; position: { lat: number; lng: number } }[]>([]);
    const routeManagerRef = useRef<RouteManager>(new RouteManager());
    const vehicleManagerRef = useRef<VehicleManager>(new VehicleManager(routeManagerRef.current));

    useEffect(() => {
        // Initialize routes and vehicles
        mockupRoutes.forEach(route => routeManagerRef.current.addRoute(route));
        getMockupVehicles().forEach(vehicle => vehicleManagerRef.current.addVehicle(vehicle));

        // Update simulation every second
        const intervalId = setInterval(() => {
            const currentTime = new Date();
            vehicleManagerRef.current.updateVehiclePositions(currentTime);
            const newPositions = vehicleManagerRef.current.getVehiclePositions();
            setVehiclePositions(newPositions);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const busIcon = new L.Icon({
        iconUrl: '/markers/vehicles/bus.png',
        iconSize: [25, 25],
        iconAnchor: [12, 12],
        popupAnchor: [0, -12],
    });

    const stopIcon = new L.Icon({
        iconUrl: '/markers/stops/bus-stop.png',
        iconSize: [25, 25],
        iconAnchor: [12, 12],
        popupAnchor: [0, -12],
    });

    return (
        <MapContainer center={[45.4642, 9.1900]} zoom={13} style={{ height: '100vh', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {mockupRoutes.map(route => (
                <React.Fragment key={route.id}>
                    {route.segments.map((segment, index) => (
                        <Polyline
                            key={`${route.id}-${index}`}
                            positions={segment.path.map(coord => [coord.lat, coord.lng])}
                            color="blue"
                        />
                    ))}
                    {route.stops.map(stop => (
                        <Marker
                            key={stop.id}
                            position={[stop.position.lat, stop.position.lng]}
                            icon={stopIcon}
                        >
                            <Popup>{stop.name}</Popup>
                        </Marker>
                    ))}
                </React.Fragment>
            ))}
            {vehiclePositions.map(vehicle => (
                <Marker
                    key={vehicle.id}
                    position={[vehicle.position.lat, vehicle.position.lng]}
                    icon={busIcon}
                >
                    <Popup>Vehicle {vehicle.id}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;