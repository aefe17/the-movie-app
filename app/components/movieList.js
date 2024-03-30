import { View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image, Dimensions, Platform } from 'react-native'
import React from 'react'
import { styles } from '../theme'
import { useNavigation } from '@react-navigation/native'

var {width, height} = Dimensions.get('window');
const ios = Platform.OS === 'ios';

export default function MovieList({title, data, hideSeeAll}) {
    let movieName = 'Ant-Man and the Wasp: Quantumania'
    const navigation = useNavigation()
  return (
    <View className="mb-8 space-y-4">
        <View className="mx-4 flex-row justify-between items-center">
            <Text className="text-white text-xl">{title}</Text>
            {
                !hideSeeAll && (
                    <TouchableOpacity>
                        <Text style={styles.text} className="text-lg">See all</Text>
                    </TouchableOpacity>
                )
            }
        </View>
        {/* Movie  row */}
        <ScrollView horizontal 
                    showsHorizontalScrollIndicator={false} 
                    contentContainerStyle={{paddingHorizontal: 15}}
                    className={ios ? "px-4" : ""}> 
            {
                data.map((item, index) => (
                    <TouchableWithoutFeedback key={index} 
                                                onPress={() => navigation.navigate('Movie', item)}>

                        <View className="space-y-1 mr-4">
                            <Image source={require('../../assets/movie.png')} 
                                    style={{width: width*0.33, height: height *0.22}} 
                                    className="rounded-3xl"/>
                            <Text className="text-neutral-300 ml-1">
                                {
                                    movieName.length > 14 ? movieName.slice(0, 14) + '...' : movieName
                                }
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                ))
            }
        </ScrollView>
    </View>
  )
}