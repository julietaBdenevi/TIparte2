import React, { Component } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
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
    console.log(this.state.users);

    const resultadosBusqueda = this.handleSearch();

    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Buscador de usuarios</Text>
        <TextInput
          style={styles.input}
          placeholder="Buscador"
          keyboardType="default"
          value={this.state.busqueda}
          onChangeText={(texto) => this.setState({ busqueda: texto })}
        />
        {resultadosBusqueda.length === 0 && this.state.busqueda !== "" ? (
          <Text style={styles.notFound}>El user name no existe</Text>
        ) : (
          <FlatList
            data={resultadosBusqueda}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Text style={styles.result}>{item.data.nombre}</Text>}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    color: "#DC143C",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "white",
  },
  notFound: {
    fontSize: 16,
    color: "#ff4444",
    textAlign: "center",
    marginTop: 10,
  },
  result: {
    fontSize: 18,
    color: "#555",
    paddingVertical: 5,
  },
});

export default Search;
