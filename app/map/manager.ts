import { Coordinate, Route, Schedule, Segment, Stop, Vehicle } from '@/types';
import { distance, secondsSinceMidnight } from './utils';

export class RouteManager {
  private routes: Map<string, Route> = new Map();

  addRoute(route: Route): void {
    console.log(`Adding route: ${route.id}`);
    this.routes.set(route.id, this.preprocessRoute(route));
  }

  private preprocessRoute(route: Route): Route {
    console.log(`Preprocessing route: ${route.id}`);
    const segments = route.segments.map((segment: Segment, index: number) => {
      console.log(`Processing segment ${index} of route ${route.id}`);
      const cumulativeDistances: number[] = [0];
      let totalDistance = 0;
      for (let i = 1; i < segment.path.length; i++) {
        totalDistance += distance(segment.path[i - 1], segment.path[i]);
        cumulativeDistances.push(totalDistance);
      }

      console.log(`Segment ${index} total distance: ${totalDistance}`);
      return { ...segment, cumulativeDistances, totalDistance };
    });

    return { ...route, segments };
  }

  getRoute(routeId: string): Route | undefined {
    console.log(`Getting route: ${routeId}`);
    return this.routes.get(routeId);
  }
}

export class VehicleManager {
  private vehicles: Map<string, Vehicle> = new Map();
  private routeManager: RouteManager;

  constructor(routeManager: RouteManager) {
    this.routeManager = routeManager;
    console.log('VehicleManager initialized');
  }

  addVehicle(vehicle: Vehicle): void {
    console.log(`Adding vehicle: ${vehicle.id}`);
    this.vehicles.set(vehicle.id, vehicle);
  }

  updateVehiclePositions(currentTime: Date): void {
    console.log(`Updating vehicle positions at ${currentTime}`);
    const currentSeconds = secondsSinceMidnight(currentTime);
    console.log(`Current seconds since midnight: ${currentSeconds}`);

    this.vehicles.forEach((vehicle, vehicleId) => {
      console.log(`Processing vehicle: ${vehicleId}`);
      const route = this.routeManager.getRoute(vehicle.routeId);
      if (!route) {
        console.log(`Route not found for vehicle ${vehicleId}`);
        return;
      }

      // The approach schedule index is the first schedule entry with a departure time greater than the current time
      // so is the first stop that the vehicle will reach
      let approachScheduleIndex = vehicle.schedule.findIndex(
        (s: Schedule) => { 
          console.log(`s.departureTime: ${s.departureTime}, currentsSeconds: ${currentSeconds}`);
          return s.departureTime > currentSeconds}
      );
      console.log(`Approach Schedule Index: ${approachScheduleIndex}`);

      // If we're past the last scheduled stop, use the last stop
      if (approachScheduleIndex === -1) {
        approachScheduleIndex = vehicle.schedule.length - 1;
        console.log("We passed the last stop, so we use the last stop in the schedule.");
      }

      // prende currentScheduleIndex - 1 perché il veicolo è in viaggio tra currentScheduleIndex - 1 e currentScheduleIndex
      // e gli serve avere la departureTime precedente per calcolare il progresso
      // Determine the current and next stops
      /* const scheduleIndex = currentScheduleIndex - 1;
      const currentStop = vehicle.schedule[scheduleIndex]; // currentStop è l'ultima partenza prima di currentTime
      const nextStop = vehicle.schedule[(scheduleIndex + 1) % vehicle.schedule.length];*/

      // prende currentScheduleIndex - 1 perché il veicolo è in viaggio tra currentScheduleIndex - 1 e currentScheduleIndex
      const leavingStop = vehicle.schedule[(approachScheduleIndex - 1)]; // il minimo serve per evitare che currentScheduleIndex - 1 sia -1 (quando currentScheduleIndex è 0, cioè all'inizio)
      const approachingStop = vehicle.schedule[approachScheduleIndex];
      // Nota: se scheduleIndex è l'ultimo, allora nextStop è il primo. Bisogna capire se questo è corretto o no.
      console.log(`Leaving stop: ${leavingStop.stopId}, Approacching stop: ${approachingStop.stopId}`);

      // Nota. C'è una forte relazione tra route.stops e route.segments. Sono due liste, infatti, che hanno lo stesso numero di elementi.
      const segmentIndex = route.stops.findIndex((stop: Stop) => stop.id === leavingStop.stopId);
       // If we can't find the segment, skip this vehicle
      if (segmentIndex === -1) {
        console.warn(`Cannot find segment for vehicle ${vehicleId}`);
        return;
      } else {
        console.log(`Current segment index for ${vehicleId}: ${segmentIndex}`);
      }
      // const segment = route.segments[segmentIndex];

      // Get the departure time from the current stop in seconds since midnight
      const departureTime = leavingStop.departureTime;

      // Get the arrival time at the next stop in seconds since midnight
      const arrivalTime = approachingStop.arrivalTime;
      console.log(`Departure time: ${departureTime}, Arrival time: ${arrivalTime}`);

      let progress: number;
      if (arrivalTime > departureTime) {
        // Calculate the total travel time between the current stop and the next stop
        // Handle cases where a trip crosses midnight by adding 24 * 60 * 60 (86400 seconds in a day) if needed
        // Example: departureTime 23:30:00 (84600 secs), arrivalTime 00:30:00 (1800 secs)
        //          (1800 + 86400) - 84600 = 3600 seconds travel time
        const totalTravelTime = (arrivalTime < departureTime ? arrivalTime + 86400 : arrivalTime) - departureTime;
        console.log(`Total travel time: ${totalTravelTime} seconds`);

        // Calculate how much time has elapsed since the departure from the current stop
        // Handle cases where current time has crossed midnight since departure
        // Example: departureTime 23:30:00 (84600 secs), currentTime 00:15:00 (900 secs)
        //          (900 + 86400) - 84600 = 2700 seconds elapsed
        const elapsedTime = (currentSeconds < departureTime ? currentSeconds + 86400 : currentSeconds) - departureTime;
        console.log(`Elapsed time: ${elapsedTime} seconds`);

        // Calculate the progress along the current segment as a value between 0 and 1
        // 0: vehicle just left the current stop
        // 1: vehicle has arrived at the next stop
        // Values in between represent proportional progress along the segment
        // Math.min() ensures progress never exceeds 1, even if there's a small time discrepancy
        progress = Math.min(elapsedTime / totalTravelTime, 1);
        console.log(`Progress on segment: ${progress}`);
      } else {
        // We're at the last stop
        progress = 1;
      }

      this.vehicles.set(vehicleId, {
        ...vehicle,
        currentSegmentIndex: segmentIndex,
        progressOnSegment: progress
      });
    });
  }

  getVehiclePositions(): { id: string; position: Coordinate }[] {
    console.log('Getting vehicle positions');
    const positions: { id: string; position: Coordinate }[] = [];
    this.vehicles.forEach((vehicle, vehicleId) => {
      console.log(`Calculating position for vehicle: ${vehicleId}`);
      const route = this.routeManager.getRoute(vehicle.routeId);
      if (!route) {
        console.log(`Route not found for vehicle ${vehicleId}`);
        return;
      }

      const segment = route.segments[vehicle.currentSegmentIndex];
      const targetDistance = segment.totalDistance * vehicle.progressOnSegment;
      console.log(`Target distance: ${targetDistance}`);
      const pathIndex = segment.cumulativeDistances.findIndex(d => d > targetDistance);
      console.log(`Path index: ${pathIndex}`);

      let position: Coordinate;
      if (pathIndex === -1) {
        // qua potrebbe non andare bene.
        // se pathIndex = -1, allora non è detto che il veicolo sia arrivato a destinazione
        // anzi forse in questo caso va bene, perché siamo nella get, e quindi OK
        // nella update però invece no, perché se pathIndex = -1, siginifica
        // che non ha trovato l'index nel segmento corrente, ma può essere che il veicolo
        // sia entrato nel segmento successivo, e quindi cambiare segmentIndex e progressOnSegment
        position = segment.path[segment.path.length - 1];
        console.log(`Vehicle at end of segment: ${JSON.stringify(position)}`);
      } else if (pathIndex === 0) {
        // Vehicle is at the start of the segment
        position = segment.path[0];
      } else {
        const prevDistance = segment.cumulativeDistances[pathIndex - 1]; // TODO: check if pathIndex is 0
        const nextDistance = segment.cumulativeDistances[pathIndex];
        const segmentProgress = (targetDistance - prevDistance) / (nextDistance - prevDistance);
        console.log(`Segment progress: ${segmentProgress}`);
        const prevPoint = segment.path[pathIndex - 1];
        const nextPoint = segment.path[pathIndex];
        position = {
          lat: prevPoint.lat + (nextPoint.lat - prevPoint.lat) * segmentProgress,
          lng: prevPoint.lng + (nextPoint.lng - prevPoint.lng) * segmentProgress
        };
        console.log(`Calculated position: ${JSON.stringify(position)}`);
      }

      positions.push({ id: vehicleId, position });
    });
    return positions;
  }
}