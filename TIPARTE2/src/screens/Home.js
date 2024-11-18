import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import {auth} from "../firebase/config"

function HomeMenu(props) {
   
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Home</Text>
            <TouchableOpacity></TouchableOpacity>
            <Text>BIENVENIDO</Text>
        </View>
    );
}
const styles = StyleSheet.create({

});

export default HomeMenu;