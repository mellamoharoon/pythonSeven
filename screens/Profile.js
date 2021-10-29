import React, { useState } from 'react'
import { StyleSheet, Text, View, StatusBar, TextInput, Button, Keyboard } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import {db} from '../firebase'
import {collection, getDocs, addDoc} from 'firebase/firestore'

const Profile = ({navigation}) => {
    const [imageUrl, setImageUrl] = useState('')
    const moviesCollectionRef = collection(db, "movies")
    const [successText, setSuccessText] = useState('')

    const onSubmit = async () => {
        await addDoc(moviesCollectionRef, {image: imageUrl})
        setImageUrl('')
        setSuccessText('Movie added')
        Keyboard.dismiss()
    }

    return (
        <View style={{marginTop: StatusBar.currentHeight, backgroundColor: 'black', flex: 1}}>
            <Text style={tw`text-white font-bold text-xl m-3`}>Enter Movie Poster Url</Text>
            <TextInput style={tw`border-2 border-white m-3 text-white`} placeholder="Image url" value={imageUrl} onChangeText={(text) => setImageUrl(text)} />
            <Text style={tw`text-xl text-white font-bold text-xl mx-auto`}>{successText}</Text>
            <Button onPress={onSubmit} title="Submit" style={tw`m-5 rounded-xl`} />
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({})
