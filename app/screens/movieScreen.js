import { View, Text, ScrollView, TouchableOpacity, Platform, Dimensions } from 'react-native'
import React, {useEffect} from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { styles } from '../theme';

var {width, height} = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const topMargin = ios ? "" : "mt-3";

export default function MovieScreen() {

    const navigation = useNavigation();

    const {params: item} = useRoute();
    useEffect(() => {
        // call the movie details api
    }, [item])

  return (
    <ScrollView contentContainerStyle={{paddingBottom:20}}
        className="flex-1 bg-neutral-900">
        <View className="w-full">
            <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4" + topMargin}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.background} className="rounded-xl p-1">
                    <ChevronLeftIcon size="28" strokeWidth={2.5} color="white"/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <HeartIcon size="35" color="white"/>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    </ScrollView>
  )
}