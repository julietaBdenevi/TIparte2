import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { db, auth } from "../firebase/config";
import firebase from "firebase";


class Post extends Component {

    constructor(props) {
        super(props)
        this.state = {
            likes: this.props.postInfo.data.likes.length,
            miLike: false
        }
    }

    handleLike() {
        db.collection("posts").doc(this.props.postInfo.id).update({ likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email) })
            .then(() => this.setState({
                likes: this.props.postInfo.data.likes.length,
                miLike: true
            }))
    }

    handleDislike() {
        db.collection("posts").doc(this.props.postInfo.id).update({ likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email) })
            .then(() => this.setState({
                likes: this.props.postInfo.data.likes.length,
                miLike: false
            }))
    }

    // handleDeletePost(){
    //     db.collection('posts').doc(this.props.postInfo.id).delete().then()
    // }


    render() {
        return (
            <View >
                <Text>Post</Text>
                <Text>{this.props.postInfo.data.descripcion}</Text>
                <Text>Usuario: {this.props.postInfo.data.user} </Text>
                <Text>Likes: {this.props.postInfo.data.likes.length} </Text>
                <Text>Creado el: {Date(this.props.postInfo.data.createdAt)} </Text>

                {this.state.miLike == true ? <TouchableOpacity onPress={() => this.handleDislike()}><Text>Dislike</Text></TouchableOpacity> : <TouchableOpacity onPress={() => this.handleLike()}><Text>Like</Text></TouchableOpacity>}

                {/* <TouchableOpacity onPress={this.handleDeletePost()}>
                    <Text>Eliminar publicacion</Text>
                </TouchableOpacity> */}
            </View>

        )
    }
}




export default Post