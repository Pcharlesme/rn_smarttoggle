import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Text, TouchableWithoutFeedback, useColorScheme, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const SmartToggle = (props) => {
    const { testID, switchOn = false, onPress, containerStyle, circleStyle, backgroundColorOn = '#4cd137', backgroundColorOff = '#ecf0f1', backgroundImageOn, backgroundImageOff, circleColorOff = 'white', circleColorOn = 'white', duration = 300, animationType = 'timing', easing = Easing.linear, smartTheme = false, customLabels = { onLabel: 'On', offLabel: 'Off' }, persistState = false, ...accessibilityProps } = props;
    const colorScheme = useColorScheme();
    const [isOn, setIsOn] = React.useState(switchOn);
    const animatedValue = useRef(new Animated.Value(switchOn ? 1 : 0)).current;
    useEffect(() => {
        if (persistState) {
            const loadState = async () => {
                try {
                    const savedState = await AsyncStorage.getItem(testID || 'smartToggle');
                    if (savedState !== null) {
                        setIsOn(JSON.parse(savedState));
                    }
                }
                catch (error) {
                    console.error('Failed to load toggle state', error);
                }
            };
            loadState();
        }
    }, [persistState, testID]);
    useEffect(() => {
        const animationConfig = animationType === 'spring'
            ? { useNativeDriver: false }
            : { duration, easing, useNativeDriver: false };
        const startAnimation = animationType === 'spring'
            ? Animated.spring(animatedValue, { toValue: isOn ? 1 : 0, ...animationConfig })
            : Animated.timing(animatedValue, { toValue: isOn ? 1 : 0, ...animationConfig });
        startAnimation.start();
    }, [isOn, animatedValue, duration, easing, animationType]);
    useEffect(() => {
        if (persistState) {
            const saveState = async () => {
                try {
                    await AsyncStorage.setItem(testID || 'smartToggle', JSON.stringify(isOn));
                }
                catch (error) {
                    console.error('Failed to save toggle state', error);
                }
            };
            saveState();
        }
    }, [isOn, persistState, testID]);
    const handlePress = () => {
        const newState = !isOn;
        setIsOn(newState);
        onPress(newState);
    };
    const interpolateColor = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [
            smartTheme && colorScheme === 'dark' ? '#2c3e50' : backgroundColorOff,
            backgroundColorOn,
        ],
    });
    const circlePosition = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [2, 22],
    });
    const currentLabel = isOn ? customLabels.onLabel : customLabels.offLabel;
    return (<TouchableWithoutFeedback onPress={handlePress} testID={testID} accessibilityLabel={currentLabel} accessibilityHint={`Toggles the switch ${isOn ? 'off' : 'on'}`} {...accessibilityProps}>
      <Animated.View style={[
            {
                backgroundColor: interpolateColor,
                width: 50,
                height: 30,
                borderRadius: 15,
                padding: 2,
            },
            containerStyle,
        ]}>
        {isOn ? backgroundImageOn : backgroundImageOff}
        <Animated.View style={[
            {
                height: 26,
                width: 26,
                borderRadius: 13,
                backgroundColor: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [circleColorOff, circleColorOn],
                }),
                transform: [{ translateX: circlePosition }],
            },
            circleStyle,
        ]}/>
        {currentLabel && (<Text style={{ textAlign: 'center', marginTop: 5, color: isOn ? 'white' : 'black' }}>
            {currentLabel}
          </Text>)}
      </Animated.View>
    </TouchableWithoutFeedback>);
};
SmartToggle.defaultProps = {
    containerStyle: {
        marginTop: 16,
        width: 69,
        height: 40,
        borderRadius: 20,
        padding: 2,
    },
    circleStyle: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
        backgroundColor: 'white',
    },
    switchOn: false,
    duration: 300,
    animationType: 'timing',
    easing: Easing.linear,
    smartTheme: false,
    customLabels: { onLabel: 'On', offLabel: 'Off' },
    persistState: false,
};
export default SmartToggle;
