import { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from "react-native";
import { auth, db } from "../firebase/config.js";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      userName: "",
      registered: false,
      error: "",
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate("Login");
      }
    });
  }

  register() {
    auth
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((response) => {
        console.log("Usuario creado en Auth: ", response);
        return db.collection("users").doc(response.user.uid).set({
          email: this.state.email,
          contra: this.state.password,
          nombre: this.state.userName,
          createdAt: Date.now(),
        });
      })
      .then(() => {
        this.props.navigation.navigate("Login");
      })
      .catch((error) => {
        console.error("Error en el registro: ", error.message);
        this.setState({ error: error.message });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.heading}>Registro</Text>

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
            keyboardType="default"
            placeholder="Ingrese su nombre de usuario"
            placeholderTextColor="#ccc"
            onChangeText={(text) => this.setState({ userName: text })}
            value={this.state.userName}
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
          <TouchableOpacity
            onPress={() => this.register()}
            style={[styles.button, styles.buttonPrimary]}
          >
            <Text style={styles.buttonText}>Registrar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Login")}
            style={styles.button}
          >
            <Text style={styles.buttonTextSecondary}>Ya tengo cuenta</Text>
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

export default Register;