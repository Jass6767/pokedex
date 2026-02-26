import {useEffect, useState} from "react";
import {ScrollView, View, Text, Image, StyleSheet, Pressable} from "react-native";
import {Link} from 'expo-router'


interface Pokemon {
    name: string;
    image: string;
    imageBack: string;
    types: PokemonType[];
}

interface PokemonType {
    type: {
        name: string;
        url: string;
    }
}

export default function Index() {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    useEffect(() => {
        fetchPokemons()
    }, []);

    async function fetchPokemons() {
        try {
            const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=10");
            const data = await response.json();

            const detailedPokemons = await Promise.all(
                data.results.map(async (pokemon: any) => {
                    const res = await fetch(pokemon.url);
                    const detail = await res.json();
                    return {
                        name: pokemon.name,
                        image: detail.sprites.front_default,
                        imageBack: detail.sprites.back_default,
                        types: detail.types,
                    }
                })
            )
            setPokemons(detailedPokemons);
        } catch (e) {
            console.log(e);
        }
    };
    const colorsByType = {
        grass: "green",
        fire: "orange",
        water: "blue",
        bug: "green",
    };

    return (
        <ScrollView contentContainerStyle={{
            gap: 16,
            padding: 16,
        }}>
            {pokemons ? pokemons.map(pokemon => (
                <Link key={pokemon.name}
                      href={{
                          pathname: "/details",
                          params: {name: pokemon.name}
                      }}
                      style={{
                          //@ts-ignore
                          backgroundColor: colorsByType[pokemon.types[0].type.name],
                          padding: 20,
                          borderRadius: 20,

                      }}>
                    <View>
                        <Text style={styles.name}>{pokemon.name}</Text>
                        <Text style={styles.type}>{pokemon.types[0].type.name}</Text>
                        <View style={{
                            flexDirection: "row"
                        }}>
                            <Image
                                source={{uri: pokemon.image}}
                                style={{width: 150, height: 150}}
                            />
                            <Image
                                source={{uri: pokemon.imageBack}}
                                style={{width: 150, height: 150}}
                            />
                        </View>

                    </View>
                </Link>
            )) : null}
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    name: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center"
    },
    type: {
        fontSize: 20,
        fontWeight: "bold",
        color: "gray",
        textAlign: "center"
    }
})