import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import NewPost from "../screens/NewPost";
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Search from "../screens/Search";

const Tab = createBottomTabNavigator();

function HomeMenu (){
    return(
        <Tab.Navigator screenOptions={{tabBarShowLabel: false}}>
            <Tab.Screen name="Home" component={Home} options={{headerShown: false, tabBarIcon: () => <Entypo name="home" size={24} color="black" />}}/>
            <Tab.Screen name="Profile" component={Profile} options={{headerShown: false, tabBarIcon: () => <FontAwesome5 name="users" size={24} color="black" />}}/>
            <Tab.Screen name="NewPost" component={NewPost} options={{headerShown: false, tabBarIcon: () => <MaterialIcons name="post-add" size={24} color="black" />}}/> 
            <Tab.Screen name= "Search" component={Search} options={{headerShown: false, tabBarIcon: () => <MaterialIcons name="post-add" size={24} color="black" />}}/> 
        </Tab.Navigator>
    )
}

export default HomeMenu;