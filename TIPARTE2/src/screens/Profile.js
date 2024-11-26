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
                    console.log(posts); 
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
            </View> //botón de deslogueo
        );
    }
}
const styles = StyleSheet.create({
    container: {
        margin: 20,
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    titulo: {
        fontSize: 30,
        fontWeight: "700",
        marginBottom: 10,
        color: "#DC143C", // Rojo vibrante para el título
    },
    info: {
        fontSize: 16,
        color: "#333333", // Gris oscuro para texto
        marginBottom: 5,
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
        backgroundColor: "#DC143C", // Rojo vibrante para el botón de eliminar
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
        backgroundColor: "#D3D3D3", // Gris claro para el botón de logout
        borderRadius: 5,
        padding: 10,
        alignItems: "center",
        marginTop: 20,
        width: "100%",
    },
    botonTextoLogout: {
        color: "#000000", // Negro para el texto del botón de logout
        fontWeight: "700",
    },
});

export default Profile;