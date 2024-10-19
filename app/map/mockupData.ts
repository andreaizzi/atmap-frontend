import { bus69 } from "@/data/sample/bus-69";
import { Schedule, Vehicle } from "@/types";
import { secondsSinceMidnight } from "./utils";

const addSeconds = (date: Date, seconds: number): Date => {
    return new Date(date.getTime() + seconds * 1000);
}

const generateDynamicSchedule = (baseTime: Date): Schedule[] => {
    return [
        { stopId: "stop1", arrivalTime: secondsSinceMidnight(baseTime), departureTime: secondsSinceMidnight(baseTime) },
        { stopId: "stop2", arrivalTime: secondsSinceMidnight(addSeconds(baseTime, 50)), departureTime: secondsSinceMidnight(addSeconds(baseTime, 60)) },
        { stopId: "stop3", arrivalTime: secondsSinceMidnight(addSeconds(baseTime, 100)), departureTime: secondsSinceMidnight(addSeconds(baseTime, 120)) },
        { stopId: "stop4", arrivalTime: secondsSinceMidnight(addSeconds(baseTime, 180)), departureTime: secondsSinceMidnight(addSeconds(baseTime, 200)) },
        { stopId: "stop5", arrivalTime: secondsSinceMidnight(addSeconds(baseTime, 250)), departureTime: secondsSinceMidnight(addSeconds(baseTime, 260)) },
        { stopId: "stop6", arrivalTime: secondsSinceMidnight(addSeconds(baseTime, 300)), departureTime: secondsSinceMidnight(addSeconds(baseTime, 350)) },
        { stopId: "stop7", arrivalTime: secondsSinceMidnight(addSeconds(baseTime, 400)), departureTime: secondsSinceMidnight(addSeconds(baseTime, 500)) }
    ];
};

export const getBus69Vehicle = (): Vehicle => {
    const now = new Date();
    const dynamicSchedule = generateDynamicSchedule(now);

    return {
        id: "bus69",
        lineId: "bus69",
        routeId: "69|0",
        schedule: dynamicSchedule,
        currentSegmentIndex: 0,
        progressOnSegment: 0
    };
};

export const mockupRoutes = [bus69.routes[0]];
export const getMockupVehicles = () => [getBus69Vehicle()];