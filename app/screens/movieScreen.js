import { View, Text, ScrollView, TouchableOpacity, Platform, Dimensions, Image } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { styles, theme } from '../theme';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '../components/cast';
import MovieList from '../components/movieList';

var {width, height} = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const topMargin = ios ? "" : "mt-3";

export default function MovieScreen() {

    let movieName = 'Test Name'
    const {params: item} = useRoute();
    const [isFavorite, toggleFavourite] = useState(false);
    const [cast, setCast] = useState([1,2,3,4,5]);
    const [similarMovies, setSimilarMovies] = useState([1,2,3,4,5]);   
    const navigation = useNavigation();

    useEffect(() => {
        // call the movie details api
    }, [item])

  return (
    <ScrollView contentContainerStyle={{paddingBottom: 20}} className="flex-1 bg-neutral-900">
            {/* back button and movie poster*/}
            <View className="w-full">
                <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4 " + topMargin}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.background} className="rounded-xl p-1">
                        <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleFavourite(!isFavorite)}>
                        <HeartIcon size="35" color={isFavorite ? theme.background : "white"} />
                    </TouchableOpacity>
                </SafeAreaView>
                
                <View>
                    <Image source={require('../../assets/movie.png')} 
                    style={{width: width, height: height * 0.55}} 
                    className="rounded-2xl"/>

                    {/* gradient overlay */}
                    <LinearGradient 
                        colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']} 
                        style={{width, height: height * 0.4}}
                        start={{x:0.5, y:0}}
                        end={{x:0.5, y:1}}
                        className="absolute bottom-0"/>

                </View>

                {/* movie details */}
                <View style-={{marginTop: -(height*0.09)}} className="space-y-3">
                    {/* movie title */}
                    <Text className="text-white text-center text-3xl font-bold tracking wider">
                        {movieName}
                    </Text>
                    {/* movie status, release, runtime */}
                    <Text className="text-neutral-400 font-semibold text-base text-center">
                        Released • 2021 • 2h 30m
                    </Text>
                    {/* movie genres */}
                    <View className="flex-row justify-center mx-4 space-x-2">
                        <Text className="text-neutral-400 font-semibold text-base text-center">Action •</Text>
                        <Text className="text-neutral-400 font-semibold text-base text-center">Adventure •</Text>
                        <Text className="text-neutral-400 font-semibold text-base text-center">Fantasy</Text>  
                    </View>
                    {/* movie description */}
                    <Text className="text-neutral-400 font-semibold text-base text-center mx-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
                        totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                    </Text>
                </View>
            </View>

            <Cast navigation={navigation} cast={cast} />

            {/* similar movies */}
            <MovieList title="Similar Movies" hideSeeAll={true} data={similarMovies}/>

    </ScrollView>
  )
}