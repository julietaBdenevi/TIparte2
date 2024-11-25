import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { db, auth } from "../firebase/config";
import firebase from "firebase";

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: this.props.posts,
            likes: this.props.posts.data.likes.length,
            miLike: this.props.posts.data.likes.includes(auth.currentUser.email)
        }
    }

    handleLike(){
        db.collection("posts").doc(this.props.posts.id).update({likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)})
        .then(() => this.setState({
            likes: this.props.posts.data.likes.length,
            miLike: true
        }))
    }

    handleDislike(){
        db.collection("posts").doc(this.props.posts.id).update({likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)})
        .then(() => this.setState({
            likes: this.props.posts.data.likes.length,
            miLike: false
        }))
    }

    render() {
        console.log(this.props.posts);
        
        const { posts } = this.state;
        const createdAt = new Date(posts.createdAt).toLocaleDateString();

        return (
            <View style={styles.container}>
                <Text>Post</Text>
                <Text>{this.props.posts.data.description}</Text>
                <Text>Usuario: {posts.data.owner} </Text>
                <Text>Likes: {posts.data.likes} </Text>
                <Text>Creado el: {createdAt} </Text>

                {this.state.miLike == true ? <TouchableOpacity onPress={() => this.handleDislike()}><Text>Dislike</Text></TouchableOpacity> : <TouchableOpacity onPress={() => this.handleLike()}><Text>Like</Text></TouchableOpacity>}

                <TouchableOpacity onPress={this.handleDeletePost()}>
                    <Text>Eliminar publicacion</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
   
});

export default Post;