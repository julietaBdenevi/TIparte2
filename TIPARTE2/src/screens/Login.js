import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { auth } from '../firebase/config'

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
  //rememberMe:
  componentDidMount() {
    auth.onAuthStateChanged(user => { if (user) { this.props.navigation.navigate("HomeMenu") } })
  }

  handleSubmit() {
    auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((response) => {
        console.log("Inicio de sesión exitoso: ", response);
        this.props.navigation.navigate("HomeMenu");
      })
      .catch((error) => {
        console.error("Error al iniciar sesión:", error); 
        this.setState({ error: error.message  });
      });
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
        {this.state.error !== "" && (
          <Text style={{ color: "red", marginTop: 10 }}>{this.state.error}</Text>
        )}

        <TouchableOpacity onPress={() => this.handleSubmit()} style={[styles.button, styles.buttonSecondary]}>
          <Text>Acceder</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Register")}
          style={styles.button}
        >
          <Text>No tengo cuenta</Text>
        </TouchableOpacity>
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
    backgroundColor: "#D3D3D3",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonSecondary: {
    backgroundColor: "#DC143C",
  },
});

export default Login;
