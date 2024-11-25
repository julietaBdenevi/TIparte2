import { Component } from "react";
import { StyleSheet, TextInput, TouchableOpacity, Text, View } from "react-native";
import { auth, db } from "../firebase/config.js";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      userName: "",
      errors: [],
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate("Login");
      }
    });
  }

  validateFields() {
    const { email, password, userName } = this.state;
    let errors = [];

    if (!email) errors.push("El campo de email es obligatorio.");
    else if (!email.includes("@"))
      errors.push("El email debe contener un '@'.");

    if (!userName) errors.push("El nombre de usuario es obligatorio.");

    if (!password) errors.push("El campo de contraseña es obligatorio.");
    else if (password.length < 6)
      errors.push("La contraseña debe tener al menos 6 caracteres.");

    return errors;
  }

  register() {
    const errors = this.validateFields();

    if (errors.length > 0) {
      this.setState({ errors });
      return;
    }

    const { email, password, userName } = this.state;

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        console.log("Usuario creado en Auth: ", response);
        return db.collection("users").doc(response.user.uid).set({
          email: email,
          contra: password,
          nombre: userName,
          createdAt: Date.now(),
        });
      })
      .then(() => {
        this.props.navigation.navigate("Login");
      })
      .catch((error) => {
        console.error("Error en el registro: ", error.message);
        this.setState({ errors: [error.message] });
      });
  }

  render() {
    const { errors } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Registro</Text>

        {/* FORMULARIO DE REGISTRO */}
        <TextInput
          style={styles.field}
          keyboardType="email-address"
          placeholder="Email"
          onChangeText={(text) => this.setState({ email: text })}
          value={this.state.email}
        />
        <TextInput
          style={styles.field}
          keyboardType="default"
          placeholder="Username"
          onChangeText={(text) => this.setState({ userName: text })}
          value={this.state.userName}
        />
        <TextInput
          style={styles.field}
          keyboardType="default"
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
        />

        {errors.length > 0 && (
          <View style={styles.errorContainer}>
            {errors.map((error, index) => (
              <Text key={index} style={styles.errorText}>
                {error}
              </Text>
            ))}
          </View>
        )}

        <TouchableOpacity onPress={() => this.register()} style={styles.boton}>
          <Text style={styles.botonTexto}>Registrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Login")}
          style={styles.botonLogin}
        >
          <Text style={styles.botonTextoLogin}>Ya tengo cuenta</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  field: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    height: 40,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderStyle: "solid",
    marginVertical: 10,
    width: "100%",
  },
  container: {
    paddingHorizontal: 10,
    marginTop: 20,
    alignItems: "center",
  },
  boton: {
    backgroundColor: "#DC143C",
    paddingHorizontal: 10,
    paddingVertical: 6,
    textAlign: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#DC143C",
    marginTop: 10,
  },
  botonTexto: {
    color: "white",
  },
  titulo: {
    fontWeight: "bold",
    fontSize: 20,
  },
  botonLogin: {
    backgroundColor: "#D3D3D3",
    paddingHorizontal: 10,
    paddingVertical: 6,
    textAlign: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#D3D3D3",
    marginTop: 10,
  },
  botonTextoLogin: {
    color: "black",
  },
  errorContainer: {
    marginVertical: 10,
  },
  errorText: {
    color: "#DC143C",
    fontSize: 12,
  },
});

export default Register;
