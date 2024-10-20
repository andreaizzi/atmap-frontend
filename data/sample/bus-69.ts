import { Line } from "@/types";

export const bus69: Line = {
    id: "bus69",
    number: "69",
    description: "Bus 69 Bicocca - Bicocca",
    transportMode: "bus",
    routes: [
        {
            id: "69|0",
            name: "Bicocca to Bicocca",
            direction: "0",
            stops: [
                {
                    id: "stop1",
                    name: "Torre Breda",
                    position: { lat: 45.5217495, lng: 9.2122373 }
                },
                {
                    id: "stop2",
                    name: "U7 Civitas",
                    position: { lat: 45.5171903, lng: 9.2122051 }
                },
                {
                    id: "stop3",
                    name: "Stazione Greco",
                    position: { lat: 45.5133749, lng: 9.2139915 }
                },
                {
                    id: "stop4",
                    name: "Teatro Arcimboldi",
                    position: { lat: 45.5159395, lng: 9.2138346 }
                },
                {
                    id: "stop5",
                    name: "Via Chiese (HangarBicocca)",
                    position: { lat: 45.5201146, lng: 9.2181663 }
                },
                {
                    id: "stop6",
                    name: "Bicocca Village",
                    position: { lat: 45.522443, lng: 9.214367 }
                },
                {
                    id: "stop7",
                    name: "Ponale M5",
                    position: { lat: 45.522473, lng: 9.2096543 }
                }
            ],
            segments: [
                {
                    fromStopId: "stop1",
                    toStopId: "stop2",
                    path: [
                        { lat: 45.5217495, lng: 9.2122373 },
                        { lat: 45.5178199, lng: 9.2100084 },
                        { lat: 45.5171903, lng: 9.2122051 }
                    ],
                    cumulativeDistances: [],
                    totalDistance: 0
                },
                {
                    fromStopId: "stop2",
                    toStopId: "stop3",
                    path: [
                        { lat: 45.5171903, lng: 9.2122051 },
                        { lat: 45.5139783, lng: 9.210341 },
                        { lat: 45.5133693, lng: 9.2122936 },
                        { lat: 45.513046, lng: 9.213388 },
                        { lat: 45.513046, lng: 9.2136347 },
                        { lat: 45.5131287, lng: 9.2138064 },
                        { lat: 45.5133749, lng: 9.2139915 }
                    ],
                    cumulativeDistances: [],
                    totalDistance: 0
                },
                {
                    fromStopId: "stop3",
                    toStopId: "stop4",
                    path: [
                        { lat: 45.5133749, lng: 9.2139915 },
                        { lat: 45.5136174, lng: 9.2141819 },
                        { lat: 45.5137302, lng: 9.2142677 },
                        { lat: 45.5138241, lng: 9.2142999 },
                        { lat: 45.5139519, lng: 9.2142811 },
                        { lat: 45.5147131, lng: 9.2141256 },
                        { lat: 45.5153954, lng: 9.2139861 },
                        { lat: 45.5156303, lng: 9.2138815 },
                        { lat: 45.5157544, lng: 9.2137715 },
                        { lat: 45.5158507, lng: 9.2137762 },
                        { lat: 45.5159395, lng: 9.2138346 }
                    ],
                    cumulativeDistances: [],
                    totalDistance: 0
                },
                {
                    fromStopId: "stop4",
                    toStopId: "stop5",
                    path: [
                        { lat: 45.5159395, lng: 9.2138346 },
                        { lat: 45.5160664, lng: 9.2138493 },
                        { lat: 45.5162393, lng: 9.2139405 },
                        { lat: 45.5187671, lng: 9.2153835 },
                        { lat: 45.5187746, lng: 9.2154506 },
                        { lat: 45.5187389, lng: 9.2155954 },
                        { lat: 45.5185509, lng: 9.2162687 },
                        { lat: 45.5203795, lng: 9.2172772 },
                        { lat: 45.520248, lng: 9.2176849 },
                        { lat: 45.5201146, lng: 9.2181663 }
                    ],
                    cumulativeDistances: [],
                    totalDistance: 0
                },
                {
                    fromStopId: "stop5",
                    toStopId: "stop6",
                    path: [
                        { lat: 45.5201146, lng: 9.2181663 },
                        { lat: 45.520029, lng: 9.2184104 },
                        { lat: 45.5199952, lng: 9.2186384 },
                        { lat: 45.5199905, lng: 9.2187309 },
                        { lat: 45.5199426, lng: 9.2187953 },
                        { lat: 45.5199266, lng: 9.2188798 },
                        { lat: 45.5199492, lng: 9.218967 },
                        { lat: 45.5200018, lng: 9.21903 },
                        { lat: 45.5200619, lng: 9.2190407 },
                        { lat: 45.5201287, lng: 9.218975 },
                        { lat: 45.5201512, lng: 9.2188905 },
                        { lat: 45.5202226, lng: 9.2188382 },
                        { lat: 45.5202677, lng: 9.2187497 },
                        { lat: 45.5203203, lng: 9.2185512 },
                        { lat: 45.5203777, lng: 9.2183581 },
                        { lat: 45.5204463, lng: 9.2182951 },
                        { lat: 45.5205036, lng: 9.2182803 },
                        { lat: 45.5205736, lng: 9.2183293 },
                        { lat: 45.5206032, lng: 9.2183433 },
                        { lat: 45.5206412, lng: 9.2183433 },
                        { lat: 45.5206736, lng: 9.2183132 },
                        { lat: 45.5207178, lng: 9.2182072 },
                        { lat: 45.5211162, lng: 9.2169392 },
                        { lat: 45.5211181, lng: 9.2168641 },
                        { lat: 45.5211049, lng: 9.2168279 },
                        { lat: 45.5210852, lng: 9.2167977 },
                        { lat: 45.521058, lng: 9.2167803 },
                        { lat: 45.5210223, lng: 9.2167763 },
                        { lat: 45.520793, lng: 9.2168909 },
                        { lat: 45.521244, lng: 9.2152467 },
                        { lat: 45.5215936, lng: 9.2139968 },
                        { lat: 45.5216255, lng: 9.2139566 },
                        { lat: 45.5216875, lng: 9.2139244 },
                        { lat: 45.522443, lng: 9.214367 }
                    ],
                    cumulativeDistances: [],
                    totalDistance: 0
                },
                {
                    fromStopId: "stop6",
                    toStopId: "stop7",
                    path: [
                        { lat: 45.522443, lng: 9.214367 },
                        { lat: 45.5231533, lng: 9.2147666 },
                        { lat: 45.523221, lng: 9.2146955 },
                        { lat: 45.523298, lng: 9.2144823 },
                        { lat: 45.523578, lng: 9.2134121 },
                        { lat: 45.5236485, lng: 9.2133263 },
                        { lat: 45.5257052, lng: 9.2144984 },
                        { lat: 45.5263028, lng: 9.212299 },
                        { lat: 45.5263225, lng: 9.2122145 },
                        { lat: 45.5263244, lng: 9.2121287 },
                        { lat: 45.5263423, lng: 9.2120388 },
                        { lat: 45.5263902, lng: 9.2118725 },
                        { lat: 45.522473, lng: 9.2096543 }
                    ],
                    cumulativeDistances: [],
                    totalDistance: 0
                }
            ]
        }
    ]
};