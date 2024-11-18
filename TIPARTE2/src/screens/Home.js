import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import {auth, db} from "../firebase/config"
import Post from "../components/Post"

class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
          posts: [],
          loading: true
        };
    }

    componentDidMount(){
        db.collection("posts").onSnapshot(
            (docs) => {
                let arrayDocs = []
                docs.forEach( doc => {
                    arrayDocs.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({
                    posts: arrayDocs,
                    loading: false
                }, ()=> console.log("posteos en el home: ", JSON.stringify(this.state.posts, null, 4)) )
            }
        )
    }


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
                <Text>{`Bienvenido `}</Text> {/*${auth.currentUser.email} ESTO VA DESPJUES DE BIENVENIDO*/}
                <Text style={styles.heading}>Home</Text>  
                {
                    this.state.posts.length === 0 ? (
                        <Text> No hay posts aun</Text>
                    ) : (
                    <FlatList 
                    data={this.state.posts}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => <Post postInfo={item}/>}
                    />
                    )

                }
            <TouchableOpacity style={styles.logoutButton} onPress={() => this.logout()}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
        )
    }


   
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
      },
      heading: {
        fontSize: 30,
        fontWeight: "700",
        marginBottom: 20,
      },  
      logoutButton: {
        backgroundColor: "#ff4444",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
      },
      logoutText: {
        color: "white",
        textAlign: "center",
      },

});

export default Home;