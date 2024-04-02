import { View, Text, ScrollView, TouchableOpacity, Platform, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { styles, theme } from '../theme';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '../components/cast';
import MovieList from '../components/movieList';
import Loading from '../components/loading';
import { fallbackMoviePoster, fetchMovieCredits, fetchMovieDetails, image500, fetchMovieSimilar } from '../api/moviedb';


var { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const topMargin = ios ? "" : "mt-3";

export default function MovieScreen() {

    let movieName = 'Test Name'
    const { params: item } = useRoute();
    const [isFavorite, toggleFavourite] = useState(false);
    const [cast, setCast] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState({});

    const navigation = useNavigation();

    const getMovieDetails = async (id) => {
        const data = await fetchMovieDetails(id);
        if (data) setMovie(data);
        setLoading(false);
    }

    const getMovieCredits = async (id) => {
        const data = await fetchMovieCredits(id);
        if (data && data.cast) setCast(data.cast);
    }

    const getSioilarMovies = async (id) => {
        const data = await fetchMovieSimilar(id);
        if (data && data.results) setSimilarMovies(data.results);
        
    }

    useEffect(() => {
        // call the movie details api
        setLoading(true);
        getMovieDetails(item.id);
        getMovieCredits(item.id);
        getSioilarMovies(item.id);
    }, [item])


    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }} className="flex-1 bg-neutral-900">
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

                {
                    loading ? (
                        <Loading />
                    ) : (
                        <View>
                            <Image
                                source={{ uri: image500(movie.poster_path) || fallbackMoviePoster }}
                                style={{ width: width, height: height * 0.55 }}
                                className="rounded-2xl" />

                            {/* gradient overlay */}
                            <LinearGradient
                                colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                                style={{ width, height: height * 0.4 }}
                                start={{ x: 0.5, y: 0 }}
                                end={{ x: 0.5, y: 1 }}
                                className="absolute bottom-0" />
                        </View>
                    )
                }

                {/* movie details */}

                <View style-={{ marginTop: -(height * 0.09) }} className="space-y-3">
                    <Text className="text-white text-center text-3xl font-bold tracking wider">
                        {movie?.title}
                    </Text>

                    {/* status, release, runtime */}

                    {
                        movie?.id ? (
                            <Text className="text-neutral-400 font-semibold text-base text-center">
                                {movie.status} • {movie.release_date ? movie.release_date.split('-')[0] : ''} • {movie.runtime} mins
                            </Text>
                        ) : null
                    }

                    <View className="flex-row justify-center mx-4 space-x-2">


                        {
                            movie?.genres?.map((genre, index) => {
                                let showDot = index + 1 != movie.genres.length;
                                return (
                                    <Text key={index} className="text-neutral-400 font-semibold text-base text-center">
                                        {genre.name} {showDot ? "•" : null}
                                    </Text>
                                )

                            })
                        }

                    </View>

                    {/* movie description */}
                    <Text className="text-neutral-400 font-semibold text-base text-center mx-4">
                        {movie?.overview}
                    </Text>


                </View>

            </View>

            <Cast navigation={navigation} cast={cast} />

            {/* similar movies */}
            <MovieList title="Similar Movies" hideSeeAll={true} data={similarMovies} />

        </ScrollView>
    )
}