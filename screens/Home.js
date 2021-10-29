import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, StatusBar, Image, ScrollView } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { Entypo } from '@expo/vector-icons';
import {db} from '../firebase'
import {collection, getDocs} from 'firebase/firestore'

const Home = () => {
    const moviesCollectionRef = collection(db, "movies")
    const [movies, setMovies] = useState('')

    useEffect(() => {
        const getMovies = async () => {
            const data = await getDocs(moviesCollectionRef)
            setMovies(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }
        getMovies()
        console.log(movies);
    }, [])

    return (
        <View style={{marginTop: StatusBar.currentHeight, backgroundColor: 'black', flex: 1}}>
            <View style={tw`flex flex-row items-center justify-between`}>
                <Entypo name="menu" size={35} color="white" />
                <Image source={require('../assets/logo.png')} style={tw`h-12 w-12 m-2`} />
            </View>
            <Text style={tw`text-white font-bold text-2xl mt-5 ml-5 mb-8`}>Trending Now</Text>
            <Image source={require('../assets/banner.png')} style={tw`h-48 w-full`} />
            <View style={tw`flex flex-row items-center justify-center m-5`}>
            <Entypo name="dots-three-horizontal" size={30} color="white" />
            <Entypo name="dots-three-horizontal" size={30} color="white" />
            </View>
            <Text style={tw`text-white font-bold text-2xl ml-5 mb-3`}>Continue</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {movies && movies.map(movie => (
                <Image key={movie.id} source={{uri: movie.image}} style={tw`h-44 w-32 m-3`} />
            ))}
            </ScrollView>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({})
