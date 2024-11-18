import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import {auth} from "../firebase/config"

function Profile(props) {
   
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>PROFILE</Text>
            <TouchableOpacity></TouchableOpacity>
            <Text>ESTO ES PROFILE</Text>
        </View>
    );
}
const styles = StyleSheet.create({

});

export default Profile;