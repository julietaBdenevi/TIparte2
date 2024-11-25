import React, { Component } from 'react';
import { View, Text, TextInput, FlatList } from 'react-native';
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
    if (busqueda.trim() === "") {
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
      <View>
        <Text>Buscador de usuarios</Text>
        <TextInput
          placeholder="Buscador"
          keyboardType="default"
          value={this.state.busqueda}
          onChangeText={(texto) => this.setState({ busqueda: texto })}
        />
        {resultadosBusqueda.length === 0 && this.state.busqueda.trim() !== "" ? (
          <Text>El user name no existe</Text>
        ) : (
          <FlatList
            data={resultadosBusqueda}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Text>{item.data.nombre}</Text>}
          />
        )}
      </View>
    );
  }
}

export default Search;
