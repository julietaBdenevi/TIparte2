import React, { Component } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { db } from "../firebase/config";

export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      busqueda: ""
    };
  }

  componentDidMount() {
    db.collection("users").onSnapshot((docs) => {
      let users = [];

      docs.forEach((doc) => {
        users.push({ id: doc.id, data: doc.data() });
      });

      this.setState({
        users: users
      });

      console.log("Snapshot");
    });
  }

  handleSearch() {
    const { busqueda, users } = this.state;
    if (busqueda === "") {
      return []; 
    }
    return users.filter((usuario) => {
      return (
        usuario.data.nombre &&
        usuario.data.nombre.toLowerCase().includes(busqueda.toLowerCase())
      );
    });
  }

  render() {
    const resultadosBusqueda = this.handleSearch();

    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.titulo}>Buscar Usuarios</Text>
          <TextInput
            style={styles.field}
            placeholder="Busca un usuario"
            keyboardType="default"
            value={this.state.busqueda}
            onChangeText={(texto) => this.setState({ busqueda: texto })}
          />
          {resultadosBusqueda.length === 0 && this.state.busqueda !== "" ? (
            <Text style={styles.notFound}>No se encontraron resultados</Text>
          ) : (
            <FlatList
              data={resultadosBusqueda}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <Text style={styles.result}>{item.data.nombre}</Text>}
            />
          )}
          <TouchableOpacity style={styles.boton} onPress={() => this.setState({ busqueda: "" })}>
            <Text style={styles.botonTexto}>Limpiar búsqueda</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#121212", // Fondo oscuro similar al de TikTok
  },
  formContainer: {
    width: '90%', // Contenedor centrado con un 90% del ancho de la pantalla
   // Fondo más oscuro para el formulario
    borderRadius: 10,
    padding: 20,
    alignItems: 'center', // Centrado de todos los elementos dentro del formulario
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
    width: '100%', // Asegura que el campo ocupe todo el ancho del formulario
  },
  notFound: {
    fontSize: 16,
    color: "#ff4444", // Color rojo para mostrar el mensaje de error
    textAlign: "center",
    marginTop: 10,
  },
  result: {
    fontSize: 18,
    color: "#fff", // Texto blanco para los resultados
    textAlign: "center",
    paddingVertical: 10,
  },
  boton: {
    backgroundColor: "#fe2c55", // Rojo vibrante similar al de TikTok
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  botonTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default Search;

