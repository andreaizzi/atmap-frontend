"use client";
import dynamic from 'next/dynamic';
// Dynamically import the MapComponent with ssr: false
const Map = dynamic(() => import('./Map'), {
    ssr: false,
    loading: () => <p>Loading map...</p>
});

export default function Home() {
    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <Map />
        </div>
    );
}