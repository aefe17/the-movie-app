import { Text, View, Dimensions, TextInput, TouchableOpacity, ScrollView, Image, TouchableWithoutFeedback } from 'react-native'
import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
import { debounce } from 'lodash';
import { fallbackMoviePoster, searchMovies } from '../api/moviedb';
import { image185 } from '../api/moviedb';

const { width, height } = Dimensions.get('window');

export default function SearchScreen() {

    const navigation = useNavigation();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = value =>{
        // console.log('value: ', value)
        if (value && value.length > 2) {
            setLoading(true)
            searchMovies({
                query: value,
                page: '1'
            }).then(data => {
                setLoading(false);
                // console.log('got movies: ', data)
                if (data && data.results) setResults(data.results);
            })
            //fetch search results
            // const data = await fetchSearchResults(value);
            setLoading(false)
            // if (data) setResults(data.results)
        } else{
            setLoading(false);
            setResults([]);
        }
    }
    
    const handleTextDebounce = useCallback(debounce(handleSearch, 400), [])

    return (
        <SafeAreaView className="bg-neutral-800 flex-1">
            <View className="mx-4 mb-3 mt-5 flex-row justify-between border border-neutral-500 rounded-full">
                <TextInput
                onChangeText={handleTextDebounce}
                    placeholder='Search Movie'
                    placeholderTextColor={'lightgray'}
                    className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
                />
                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                    className="rounded-full p-3 m-1 bg-neutral-500">
                    <XMarkIcon size="25" color="white" />
                </TouchableOpacity>
            </View>

            {/* search results */}
            {
                loading ? (
                    <Loading />
                ) : (
                    results.length > 0 ? (
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 15 }}
                            className="space-y-3"
                        >
                            <Text className="text-white font-semibold ml-1"> Results ({results.length})</Text>
                            <View className="flex-row justify-between flex-wrap">
                                {
                                    results.map((item, index) => {
                                        return (
                                            <TouchableWithoutFeedback
                                                key={index}
                                                onPress={() => navigation.push("Movie", item)}>

                                                <View className="space-y-2 mb-4">
                                                    <Image className="rounded-3xl"
                                                        source = {{uri: image185(item.poster_path) || fallbackMoviePoster}}
                                                        //source={require('../../assets/movie.png')}
                                                        style={{ width: width * 0.44, height: height * 0.3 }} />
                                                    <Text className="text-neutral-300 ml-1 items-center">
                                                        {
                                                            item.original_title.length > 22 ? item.original_title.slice(0, 22) + '...' : item.original_title
                                                        }
                                                    </Text>
                                                </View>

                                            </TouchableWithoutFeedback>
                                        )
                                    })
                                }
                            </View>

                        </ScrollView>
                    ) : (
                        <View className="flex-row justify-center m-5 mr-1 mt-60">
                            <Image source={require('../../assets/popcorn.png')}
                                className="h-60 w-60"
                            />

                        </View>
                    )
                )
            }



        </SafeAreaView>
    )
}
