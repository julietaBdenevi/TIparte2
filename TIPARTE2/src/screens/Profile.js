import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from "react-native";
import { auth, db } from "../firebase/config";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            posts: [],
            totalPosts: 0
        };
    }

    componentDidMount() {
        const currentUser = auth.currentUser;

        if (currentUser) {
            db.collection("users")
                .where("email", "==", currentUser.email)
                .onSnapshot(snapshot => {
                    snapshot.forEach(doc => { 
                        this.setState({ user: doc.data() });
                    });
                });

            db.collection("posts")
                .where("user", "==", currentUser.email)
                .onSnapshot(snapshot => {
                    const posts = snapshot.docs.map(doc => ({
                        id: doc.id,
                        description: doc.data().descripcion
                    }));
                    this.setState({ posts, totalPosts: posts.length });
                }, (error) => {
                    console.error(error);
                });
        }
    }

    eliminarPost = (postId) => {
        db.collection("posts").doc(postId).delete(); //eliminar post
    };

    logout = () => {
        auth.signOut() //función de deslogueo
            .then(() => this.props.navigation.navigate("Login"))
            .catch(error => console.log(error));
    };

    render() {
        const { user, posts, totalPosts } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.titulo}>Mi Perfil</Text>
                    <Text style={styles.info}>Nombre de usuario: {user.nombre}</Text>
                    <Text style={styles.info}>Email: {user.email}</Text>
                    <Text style={styles.info}>Total de posteos: {totalPosts}</Text>

                    <FlatList
                        data={posts}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.postContainer}>
                                <Text style={styles.postText}>{item.description}</Text>
                                <TouchableOpacity
                                    onPress={() => this.eliminarPost(item.id)}
                                    style={styles.botonEliminar}
                                >
                                    <Text style={styles.botonTexto}>Eliminar post</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />

                    <TouchableOpacity onPress={this.logout} style={styles.botonLogout}>
                        <Text style={styles.botonTextoLogout}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#121212", // Fondo oscuro similar al de TikTok
    },
    formContainer: {
        width: '90%', // Contenedor centrado con un 90% del ancho de la pantalla
      
        borderRadius: 10,
        padding: 20,
        alignItems: 'center', // Centrado de todos los elementos dentro del formulario
    },
    titulo: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#fff", // Texto blanco para buen contraste
        marginBottom: 20,
        textAlign: "center",
    },
    info: {
        fontSize: 16,
        color: "#fff", // Blanco para el texto
        marginBottom: 10,
        textAlign: "center",
    },
    postContainer: {
        backgroundColor: "#F5F5F5", // Gris claro para destacar los posts
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        width: "100%",
    },
    postText: {
        fontSize: 14,
        color: "#000000", // Negro para el texto de los posts
    },
    botonEliminar: {
        backgroundColor: "#fe2c55", // Rojo vibrante para el botón de eliminar
        borderRadius: 5,
        padding: 10,
        alignItems: "center",
        marginTop: 10,
    },
    botonTexto: {
        color: "#FFFFFF", // Blanco para el texto de los botones
        fontWeight: "700",
    },
    botonLogout: {
        backgroundColor: "#fe2c55", // Rojo vibrante para el botón de logout
        borderRadius: 5,
        padding: 10,
        alignItems: "center",
        marginTop: 20,
        width: "100%",
    },
    botonTextoLogout: {
        color: "#fff", // Blanco para el texto del botón de logout
        fontWeight: "700",
        textAlign: "center",
    },
});

export default Profile;