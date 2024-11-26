import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { auth, db } from "../firebase/config";
import Post from "../components/Post";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            loading: true
        };
    }

    componentDidMount() {
        // Obtener los posts desde la base de datos
        db.collection("posts").onSnapshot(
            (docs) => {
                let arrayDocs = [];
                docs.forEach((doc) => {
                    arrayDocs.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });
                this.setState({
                    posts: arrayDocs,
                    loading: false
                }, () => console.log("posteos en el home: ", JSON.stringify(this.state.posts, null, 4)));
            }
        );
    }

    // Función para cerrar sesión
    logout() {
        auth
            .signOut()
            .then(() => {
                this.props.navigation.navigate("Login");
            })
            .catch((error) => console.log(error));
    }

    render() {
        return (
            <View style={styles.container}>
                {/* Texto de bienvenida al usuario */}
                <Text style={styles.welcomeText}>{`Bienvenido${auth.currentUser.email}`}</Text>

                {/* Título principal de la sección */}
                <Text style={styles.heading}>Tik Tok </Text>
                <Text style={styles.heading}>Comment page </Text> 

                {/* Mostrar mensaje si no hay posts */}
                {
                    this.state.posts.length === 0 ? (
                        <Text style={styles.noPostsText}>No hay posts aún</Text>
                    ) : (
                        // Mostrar la lista de posts si existen
                        <FlatList
                            data={this.state.posts}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => <Post postInfo={item} />}
                        />
                    )
                }

                {/* Botón de cierre de sesión */}
                <TouchableOpacity style={styles.logoutButton} onPress={() => this.logout()}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#121212", // Fondo oscuro para la pantalla principal
    },
    welcomeText: {
        fontSize: 18,
        color: "#fff", // Texto blanco para buen contraste con el fondo oscuro
        marginBottom: 10,
    },
    heading: {
        fontSize: 32,
        fontWeight: "700",
        color: "#ff0050", // Color de título similar a TikTok (rojo)
        marginBottom: 30,
        textAlign: "center",
    },
    noPostsText: {
        fontSize: 18,
        color: "#fff", // Texto blanco para el mensaje de "No hay posts"
        textAlign: "center",
        marginTop: 50,
    },
    logoutButton: {
        backgroundColor: "#ff4444", // Rojo vibrante para el botón de logout
        padding: 12,
        borderRadius: 5,
        marginTop: 20,
        alignItems: "center",
    },
    logoutText: {
        color: "white",
        fontWeight: "bold",
    },
});

export default Home;