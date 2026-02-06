import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';
import { ThemeProvider } from './src/context/ThemeContext';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <ThemeProvider>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <RootNavigator />
    </ThemeProvider>
  );
}

export default App;
