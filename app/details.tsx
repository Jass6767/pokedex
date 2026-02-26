import {useEffect, useState} from "react";
import {ScrollView, View, Text, Image, StyleSheet} from "react-native";
import {useLocalSearchParams} from "expo-router";


export default function Details() {
    const params = useLocalSearchParams();

    return (
        <ScrollView contentContainerStyle={{
            gap: 16,
            padding: 16,
        }}>

        </ScrollView>
    );
}
const styles = StyleSheet.create({

})