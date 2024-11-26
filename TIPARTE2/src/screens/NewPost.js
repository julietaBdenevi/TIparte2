import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { auth, db } from "../firebase/config";

class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            mensaje: "",
            error: null,
        };
    }

    onSubmit(mensaje) {
        if (!auth.currentUser) {
            this.setState({ error: "Usuario no logueado" });
            return;
        }
        if (mensaje === "") {
            this.setState({ error: "El post esta vacio" });
            return;
        }
        db.collection("posts")
            .add({
                user: auth.currentUser.email,
                descripcion: mensaje,
                createdAt: Date.now(),
                likes: [],
            })
            .then(() => {
                this.setState({ mensaje: "", error: null });
                this.props.navigation.navigate("Home");
            })
            .catch((err) => {
                console.log(err);
                this.setState({ error: "Error en la creacion" });
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>New post</Text>

                {this.state.error && <Text style={styles.errorTexto}>{this.state.error}</Text>}

                <TextInput
                    style={styles.field}
                    keyboardType="default"
                    placeholder="Escribe tu mensaje..."
                    onChangeText={(text) => this.setState({ mensaje: text })}
                    value={this.state.mensaje}
                />

                <TouchableOpacity
                    onPress={() => this.onSubmit(this.state.mensaje)}
                    style={styles.boton}
                >
                    <Text style={styles.botonTexto}>Subir post</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        backgroundColor: "#121212", // Fondo oscuro similar al de TikTok
    },
    titulo: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#fff", // Texto blanco para buen contraste
        marginBottom: 20,
        textAlign: "center",
    },
    field: {
        borderWidth: 1,
        borderColor: "#ccc", // Color claro para el borde del campo de texto
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        backgroundColor: "#1C1C1C", // Fondo oscuro para el campo de texto
        color: "#fff", // Texto en blanco dentro del campo
        fontSize: 16,
    },
    boton: {
        backgroundColor: "#fe2c55", // Rojo vibrante similar al de TikTok
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
    },
    botonTexto: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18,
    },
    errorTexto: {
        color: "red",
        marginBottom: 10,
        textAlign: "center",
    },
});

export default NewPost;
