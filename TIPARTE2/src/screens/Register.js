import { Component } from "react";
import { StyleSheet, TextInput, TouchableOpacity, Text, View } from "react-native";
import { auth, db } from "../firebase/config";

class Register extends Component{
    constructor(props){
        super(props)
        this.state = {
            email: "",
            password: "",
            userName: "",
            registered: false,
            error: ""
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged( user => console.log("register: el usuario es: ", user.email))
    }

    register(){
        auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((response) => {
                this.setState({registered: true})
                db.collection("users").add({
                    owner: this.state.email, // creo que no hace falta
                    email: this.state.email,
                    nombre: this.state.userName, 
                    createdAt: Date.now()
                })
            })
            .then(()=> this.props.navigation.navigate("HomeMenu"))
            
            .catch((error) => console.error("Error en el registro: ", error.message))//this.setState({error: "fallo el registro", error})) 
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.titulo} >Registro</Text>

                {/* FORMULARIO DE REGISTER */}
                <TextInput style={styles.field}
                keyboardType="email-address"
                placeholder="Email"
                onChangeText={ text => this.setState({email: text})}
                value={this.state.email}
                />
                <TextInput style={styles.field}
                keyboardType="default"
                placeholder="Username"
                onChangeText={ text => this.setState({userName: text})}
                value={this.state.userName}
                />
                <TextInput style={styles.field}
                keyboardType="default"
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={ text => this.setState({password: text})}
                value={this.state.password}
                />
                <TouchableOpacity onPress={()=> this.register()} style={styles.boton}>
                    <Text style={styles.botonTexto}>Registrar</Text>
                  
                </TouchableOpacity>
                <Text><br></br></Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")} style={styles.botonLogin}>
                    <Text style={styles.botonTextoLogin}>Ya tengo cuenta</Text>
                </TouchableOpacity>
            </View>//el login de juli va aca adentro
        )
    }
}


const styles = StyleSheet.create({
    field: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        height: 20,
        paddingVertical: 15,
        paddingHorizontal:10,
        borderStyle: "solid",
        marginVertical: 10
    },
    container: {
        paddingHorizontal: 10,
        marginTop: 20,
        alignItems: "center"
    },
    boton: {
        backgroundColor: "#DC143C",
        paddingHorizontal:10,
        paddingVertical: 6,
        textAlign: "center",
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#DC143C"
    },
    botonTexto: {
        color: "DC143C"
    },
    titulo: {
        fontWeight: "bold",
        fontSize: 20
    },
    botonLogin: {
        backgroundColor: "#D3D3D3",
        paddingHorizontal:10,
        paddingVertical: 6,
        textAlign: "center",
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#D3D3D3"
    },
    botonTextoLogin: {
        color: "black",
    },

})

export default Register;