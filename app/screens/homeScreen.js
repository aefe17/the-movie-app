import { StatusBar } from 'expo-status-bar';
import {React, useState} from 'react';
import { View, Text, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Bars3Icon, MagnifyingGlassIcon } from 'react-native-heroicons/outline' 
import { styles } from '../theme';
import TrendingMovies from '../components/TrendingMovies';
import MovieList from '../components/movieList';

const ios = Platform.OS === 'ios';

const HomeScreen = () => {

    const [trending, setTrending] = useState([1,2,3,4]);
    const [upcoming, setUpcoming] = useState([1,2,3,4]);
    const [topRated, setTopRated] = useState([1,2,3,4]);
    
    return (
        <View className="flex-1 bg-neutral-800">
            <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
                <StatusBar style="light" />
                <View className="flex-row justify-between items-center mx-4 mt-3">
                    <Bars3Icon size="30" strokeWidth={2} color="white" />
                    <Text className="text-white text-3xl font-bold"><Text style={styles.text}>M</Text>ovies</Text>
                    <TouchableOpacity>
                        <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 10}}
            >
                {/*Trending movies carousel */}

                <TrendingMovies data={trending}/>

                {/* upcoming movies row */}
                <MovieList title="Upcoming" data={upcoming} />

                {/* upcoming movies row */}
                <MovieList title="Top Rated" data={topRated} />

            </ScrollView>

        </View>
    );
};

export default HomeScreen;