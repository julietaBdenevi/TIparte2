import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import {auth} from "../firebase/config"

function NewPost(props) {
   
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>NEWPOST</Text>
            <TouchableOpacity></TouchableOpacity>
            <Text>ESTO ES NEWPOST</Text>
        </View>
    );
}
const styles = StyleSheet.create({

});

export default NewPost;