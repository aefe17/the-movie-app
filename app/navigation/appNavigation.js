import * as React from 'react';
import {View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/homeScreen';
import MovieScreen from '../screens/movieScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" options={ {headerShown: false}} 
                component={HomeScreen}/>
                <Stack.Screen name="Movie" options={ {headerShown: false}} 
                component={MovieScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
