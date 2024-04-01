import { Dimensions, Platform, ScrollView, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles, theme } from '../theme';
import MovieList from '../components/movieList';
import Loading from '../components/loading';
import { fallbackPersonImage, fetchPersonDetails, fetchPersonMovies, image185, image342, image500 } from '../api/moviedb';

var { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const verticalMargin = ios ? '' : 'my-3';

export default function PersonScreen() {

    const { params: item } = useRoute();
    const navigation = useNavigation();
    const [isFavorite, toggleFavourite] = useState(false);
    const [personMovies, setPersonMovies] = useState([]);
    const [person, setPerson] = useState({});
    const [loading, setLoading] = useState(false);

    const getPersonDetails = async (id) => {
        const data = await fetchPersonDetails(id);
        console.log(id)
        console.log('got person details: ', data);
        if (data) setPerson(data);
        setLoading(false);
    }

    const getPersonMovies = async (id) => {
        const data = await fetchPersonMovies(id);
        console.log('got person movies: ', data);
        if (data && data.cast) setPersonMovies(data.cast);
    }

    useEffect(() => {
        setLoading(true)
        // console.log('person data: ', item)
        getPersonDetails(item.id)
        getPersonMovies(item.id)
    }, [item])

    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            className="flex-1 bg-neutral-900">
            {/* back button and movie poster*/}
            <SafeAreaView className={"z-20 w-full flex-row justify-between items-center px-4 " + verticalMargin}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.background} className="rounded-xl p-1">
                    <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleFavourite(!isFavorite)}>
                    <HeartIcon size="35" color={isFavorite ? theme.background : "white"} />
                </TouchableOpacity>
            </SafeAreaView>


            {/* person details */}

            {
                loading ? (
                    <Loading />
                ) : (
                    <>
                        <View className="flex-row justify-center"
                            style={{
                                shadowColor: "gray",
                                shadowRadius: 40,
                                shadowOffset: { width: 0, height: 5 },
                                shbadowOpacity: 1
                            }}
                        >
                            <View className="items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500">
                                <Image
                                    source={{ uri: image342(person?.profile_path) || fallbackPersonImage }}
                                    //source={require('../../assets/castImage.png')}
                                    style={{ width: width * 0.74, height: height * 0.43 }} />
                            </View>
                        </View>
                        <View className="mt-6">
                            <Text className="text-white text-center text-3xl font-bold">
                                {person?.name}
                            </Text>

                            <Text className="text-neutral-500 text-center text-base">
                                {person?.place_of_birth}
                            </Text>
                        </View>
                        {/* person stats */}

                        <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
                            <View className="border-r-2 border-r-neutral-400 px-1 items-center">
                                <Text className="text-white font-semibold">Gender</Text>
                                <Text className="text-neutral-300 text-sm">
                                    {person?.gender === 1 ? 'Female':'Male'}
                                </Text>
                            </View>
                            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                                <Text className="text-white font-semibold">Birthday</Text>
                                <Text className="text-neutral-300 text-sm">{person?.birthday}</Text>
                            </View>
                            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                                <Text className="text-white font-semibold">Known for</Text>
                                <Text className="text-neutral-300 text-sm">{person?.known_for_department}</Text>
                            </View>
                            <View className="px-2 items-center">
                                <Text className="text-white font-semibold">Popularity</Text>
                                <Text className="text-neutral-300 text-sm">{person?.popularity?.toFixed(2)}%</Text>
                            </View>
                        </View>


                        {/* person biography */}

                        <View className="my-6 mx-4 space-y-2">
                            <Text className="text-white text-lg">Biography</Text>
                            <Text className="text-neutral-400 tracking-wide">
                                {
                                    person?.biography || 'No biography available'
                                }
                            </Text>
                        </View>

                        {/* person movies */}

                        <MovieList title="Movies" hideSeeAll={true} data={personMovies} />
                    </>
                )
            }
        </ScrollView>
    )
}
