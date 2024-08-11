
react-native-smarttoggles is a customizable and smart toggle button component for React Native. 
It offers various customization options, including themes, custom labels, and persistent state handling.


## Usage

Here's a simple example demonstrating how to use the `SmartToggle` component in your React Native project:

```tsx


const ExampleComponent = () => {
  const [isOn, setIsOn] = useState(false);

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <SmartToggle
        switchOn={isOn}
        onPress={(newState) => setIsOn(newState)}
        smartTheme={true}
        customLabels={{ onLabel: 'Active', offLabel: 'Inactive' }}
        persistState={true}
      />
      <Text style={{ marginTop: 20 }}>
        The switch is {isOn ? 'On' : 'Off'}
      </Text>
    </View>
  );
};

export default ExampleComponent;
```

## Props

- **`switchOn`** (`boolean`) - The current state of the switch.
- **`onPress`** (`function`) - Callback function triggered when the switch is pressed, returns the new state.
- **`smartTheme`** (`boolean`) - Enables automatic theme adjustment.
- **`customLabels`** (`object`) - Define custom labels for the "On" and "Off" states.
  - **`onLabel`** (`string`) - Label for the "On" state.
  - **`offLabel`** (`string`) - Label for the "Off" state.
- **`persistState`** (`boolean`) - If true, the toggle state is saved across sessions.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Created by Emmanuel Charles. Feel free to reach out at [opeyemicharlese@gmail.com](mailto:opeyemicharlese@gmail.com).
```

