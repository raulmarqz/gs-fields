import { Dimensions } from "react-native";

export const WinDiag = () => {
    const { width: winWidth, height: winHeight } = Dimensions.get('window');
    const winDiag = (Math.sqrt((winWidth * winWidth) + (winHeight * winHeight))) / 100.00;
    return winDiag;
};

export const INITIAL_REGION = {
    latitude: 0,
    latitudeDelta:0,
    longitude: 0,
    longitudeDelta:0
};