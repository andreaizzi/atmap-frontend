export type VehicleType = 'bus' | 'tram' | 'metro';

export interface Coordinate {
    lat: number;
    lng: number;
}

export interface Stop {
    id: string;
    name: string;
    position: Coordinate;
}

export interface Segment {
    fromStopId: string;
    toStopId: string;
    path: Coordinate[];
    cumulativeDistances: number[];
    totalDistance: number;
}

export interface Route {
    id: string;
    name: string;
    stops: Stop[];
    segments: Segment[];
    direction: string;
}

export interface Line {
    id: string;
    number: string;
    description: string;
    transportMode: VehicleType;
    routes: Route[];
}

export interface Schedule {
    stopId: string;
    arrivalTime: number;
    departureTime: number;
}

export interface Vehicle {
    id: string;
    lineId: string;
    routeId: string;
    schedule: Schedule[];
    currentSegmentIndex: number;
    progressOnSegment: number;
}