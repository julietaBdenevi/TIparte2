import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import {auth} from '../firebase/config'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      logued: false,
      error: "",
    };
  }

  componentDidMount(){
    auth.onAuthStateChanged(user => console.log('El usuario es:', JSON.stringify(user,null,4)))
  }

  handleSubmit() {
    
    auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((response) => this.setState({ logued: true }))
      .then( ()=>  this.props.navigation.navigate("HomeMenu"))
      .catch((error) => this.setState({ error: "Fallo el login" }));    
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Ingresar</Text>
        <TextInput
          keyboardType="email-address"
          placeholder="Ingrese su email"
          onChangeText={(text) => this.setState({ email: text })}
          value={this.state.email}
        />
        <TextInput
          placeholder="Ingrese su contrasena"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
        />
        <TouchableOpacity onPress={() => this.handleSubmit() }  style={[styles.button, styles.buttonSecondary]}>
          <Text>Acceder</Text>
        </TouchableOpacity>
        <Text>Navegación cruzada a Register: </Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Register")}
          style={styles.button}
        >
          <Text>No tengo cuenta</Text>
        </TouchableOpacity>
        <Text>
          Navegación cruzada a ingresar a la app. Este paso se hará
          automaticamente cuando veamos la funcionalidad de login{" "}
        </Text>      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: 700,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#51b9e9",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonSecondary: {
    backgroundColor: "#ffa500",
  },
});

export default Login;
