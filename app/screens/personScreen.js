import { Dimensions, Platform, ScrollView, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles, theme } from '../theme';
import MovieList from '../components/movieList';
import Loading from '../components/loading';

var { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const verticalMargin = ios ? '' : 'my-3';

export default function PersonScreen() {

    const navigation = useNavigation();
    const [isFavorite, toggleFavourite] = useState(false);
    const [personMovies, setPersonMovies] = useState([1, 2, 3, 4, 5]);
    const [loading, setLoading] = useState(false);

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
                                <Image source={require('../../assets/castImage.png')}
                                    style={{ width: width * 0.74, height: height * 0.43 }} />
                            </View>
                        </View>
                        <View className="mt-6">
                            <Text className="text-white text-center text-3xl font-bold">
                                Keanu Reeves
                            </Text>

                            <Text className="text-neutral-500 text-center text-base">
                                London, United Kingdom
                            </Text>
                        </View>
                        {/* person stats */}

                        <View className="mx-3 mt-6 p-4 flex-row justify-between items-center bg-neutral-700 rounded-full">
                            <View className="border-r-2 border-r-neutral-400 px-1 items-center">
                                <Text className="text-white font-semibold">Gender</Text>
                                <Text className="text-neutral-300 text-sm">Male</Text>
                            </View>
                            <View className="border-r-2 border-r-neutral-400 px-1 items-center">
                                <Text className="text-white font-semibold">Birthday</Text>
                                <Text className="text-neutral-300 text-sm">1964-09-02</Text>
                            </View>
                            <View className="border-r-2 border-r-neutral-400 px-1 items-center">
                                <Text className="text-white font-semibold">Known for</Text>
                                <Text className="text-neutral-300 text-sm">Acting</Text>
                            </View>
                            <View className="px-2 items-center">
                                <Text className="text-white font-semibold">Popularity</Text>
                                <Text className="text-neutral-300 text-sm">64.23</Text>
                            </View>
                        </View>


                        {/* person biography */}

                        <View className="my-6 mx-4 space-y-2">
                            <Text className="text-white text-lg">Biography</Text>
                            <Text className="text-neutral-400 tracking-wide">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dolor justo, bibendum vel eros congue, semper pretium lectus. Mauris tristique eros a ante euismod, vitae commodo nunc pellentesque. Vivamus ut ipsum id erat scelerisque cursus eget sed urna. Ut a mi posuere nibh porta rhoncus. Nam egestas posuere nunc in pharetra. Aliquam ultrices elementum nibh, id lobortis mi congue in. Curabitur rutrum dapibus metus, eu dictum tellus cursus eu.
                                Nunc nec lacinia lorem. Duis et pellentesque nulla, semper consectetur nisi. Mauris dignissim, tellus mollis maximus vulputate, elit justo imperdiet sapien, vitae semper diam mi gravida dolor. Vestibulum sodales ac neque in semper. Nam sollicitudin magna id fermentum suscipit. Nunc lobortis massa nunc, id mattis nulla feugiat nec. Etiam imperdiet, nisl in elementum ornare, metus massa placerat risus, non sodales est est sit amet leo. Quisque et facilisis nisi.
                                Suspendisse potenti. Nunc elit purus, varius scelerisque pellentesque vel, malesuada in nisl. Vivamus consectetur eros vitae pellentesque facilisis. In ullamcorper tortor vulputate viverra rhoncus. Vestibulum facilisis risus sit amet massa pretium, sed consectetur odio mattis. Duis luctus lacus urna, et fermentum augue luctus eget. Aenean quis facilisis enim.
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
