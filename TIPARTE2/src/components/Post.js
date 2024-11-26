import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { db, auth } from "../firebase/config";
import firebase from "firebase";

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            likes: this.props.postInfo.data.likes.length,
            miLike: false,
        };
    }

    handleLike() {
        db.collection("posts")
            .doc(this.props.postInfo.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
            })
            .then(() =>
                this.setState({
                    likes: this.props.postInfo.data.likes.length,
                    miLike: true,
                })
            );
    }

    handleDislike() {
        db.collection("posts")
            .doc(this.props.postInfo.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email),
            })
            .then(() =>
                this.setState({
                    likes: this.props.postInfo.data.likes.length,
                    miLike: false,
                })
            );
    }

    handleDelete = () => {
        db.collection("posts")
            .doc(this.props.postInfo.id)
            .delete()
            .then(() => {
                console.log("Post eliminado!");
            })
            .catch((error) => {
                console.error("Error al eliminar el post: ", error);
            });
    };

    render() {
        return (
            <View style={styles.postContainer}>
                <Text style={styles.userText}>@{this.props.postInfo.data.user}</Text>
                <Text style={styles.description}>{this.props.postInfo.data.descripcion}</Text>
                <Text style={styles.dateText}>
                    {new Date(this.props.postInfo.data.createdAt).toLocaleDateString()}
                </Text>

                <View style={styles.actionsContainer}>
                    {this.state.miLike ? (
                        <TouchableOpacity style={styles.dislikeButton} onPress={() => this.handleDislike()}>
                            <Text style={styles.actionText}>👎 Dislike</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.likeButton} onPress={() => this.handleLike()}>
                            <Text style={styles.actionText}>❤️ Like</Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity style={styles.deleteButton} onPress={this.handleDelete}>
                        <Text style={styles.actionText}>🗑️ Eliminar</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.likesText}>Likes: {this.state.likes}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    postContainer: {
        backgroundColor: "#2e2e2e", // Color oscuro similar al fondo de ChatGPT
        borderRadius: 10,
        padding: 20,
        margin: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 5,
    },
    userText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#ff0050",
        marginBottom: 10,
    },
    description: {
        fontSize: 18,
        color: "#fff",
        marginBottom: 10,
    },
    dateText: {
        fontSize: 12,
        color: "#888",
        marginBottom: 15,
    },
    actionsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    likeButton: {
        backgroundColor: "#ff0050",
        padding: 10,
        borderRadius: 5,
    },
    dislikeButton: {
        backgroundColor: "#444",
        padding: 10,
        borderRadius: 5,
    },
    deleteButton: {
        backgroundColor: "#d32f2f", // Rojo para el botón de eliminar
        padding: 10,
        borderRadius: 5,
    },
    actionText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
    },
    likesText: {
        fontSize: 14,
        color: "#fff",
        marginTop: 10,
        textAlign: "right",
    },
});

export default Post;
