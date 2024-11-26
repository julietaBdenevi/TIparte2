import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from "react-native";
import { auth } from '../firebase/config';

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

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate("HomeMenu");
      }
    });
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
        this.setState({ error: error.message });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.heading}>Ingresar</Text>
          
          {/* Campos de ingreso */}
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            placeholder="Ingrese su email"
            placeholderTextColor="#ccc"
            onChangeText={(text) => this.setState({ email: text })}
            value={this.state.email}
          />
          <TextInput
            style={styles.input}
            placeholder="Ingrese su contrasena"
            secureTextEntry={true}
            placeholderTextColor="#ccc"
            onChangeText={(text) => this.setState({ password: text })}
            value={this.state.password}
          />
          
          {/* Mensaje de error */}
          {this.state.error !== "" && (
            <Text style={styles.errorText}>{this.state.error}</Text>
          )}

          {/* Botones */}
          <TouchableOpacity onPress={() => this.handleSubmit()} style={[styles.button, styles.buttonPrimary]}>
            <Text style={styles.buttonText}>Acceder</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Register")}
            style={styles.button}
          >
            <Text style={styles.buttonTextSecondary}>No tengo cuenta</Text>
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
    backgroundColor: "#121212", // Fondo oscuro
  },
  formContainer: {
    width: "90%",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff", // Texto blanco
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    height: 50,
    width: "100%",
    paddingHorizontal: 15,
    marginVertical: 10,
    backgroundColor: "#1C1C1C", // Fondo oscuro para los campos
    color: "#fff", // Texto en blanco
    fontSize: 16,
  },
  button: {
    backgroundColor: "#D3D3D3", // Gris claro para el botón secundario
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 15,
    width: "100%",
    alignItems: "center",
  },
  buttonPrimary: {
    backgroundColor: "#DC143C", // Rojo vibrante para el botón principal
  },
  buttonText: {
    color: "#fff", // Blanco para el texto de los botones
    fontWeight: "700",
    fontSize: 18,
  },
  buttonTextSecondary: {
    color: "#000", // Negro para el texto del botón secundario
    fontWeight: "700",
    fontSize: 18,
  },
  errorText: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
});

export default Login;