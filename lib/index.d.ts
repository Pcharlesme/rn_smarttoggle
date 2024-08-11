import React from 'react';
import { StyleProp, ViewStyle, AccessibilityProps } from 'react-native';
interface Props extends AccessibilityProps {
    testID?: string;
    switchOn?: boolean;
    onPress: (newState: boolean) => void;
    containerStyle?: StyleProp<ViewStyle>;
    circleStyle?: StyleProp<ViewStyle>;
    backgroundColorOn?: string;
    backgroundColorOff?: string;
    backgroundImageOn?: React.ReactElement;
    backgroundImageOff?: React.ReactElement;
    circleColorOff?: string;
    circleColorOn?: string;
    duration?: number;
    animationType?: 'timing' | 'spring' | 'decay';
    easing?: (value: number) => number;
    smartTheme?: boolean;
    customLabels?: {
        onLabel?: string;
        offLabel?: string;
    };
    persistState?: boolean;
}
declare const SmartToggle: React.FC<Props>;
export default SmartToggle;
