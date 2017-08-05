import React from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import firebase from 'firebase'
import {Button, Header} from './src/component/common'
import LoginForm from './src/component/LoginForm';


export default class App extends React.Component{

    state = {loggedIn: null}

    componentWillMount(){
        firebase.initializeApp({
            apiKey: 'AIzaSyDkDzFVMvLInX2o7dwLdheVZuEn_YujvhQ',
            authDomain: 'auth-44adb.firebaseapp.com',
            databaseURL: 'https://auth-44adb.firebaseio.com',
            projectId: 'auth-44adb',
            storageBucket: 'auth-44adb.appspot.com',
            messagingSenderId: '638335726678'
        });

        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                this.setState({loggedIn: true})
            }else{
                this.setState({loggedIn: false})
            }
        })
    }

    renderContent(){
        if(this.state.loggedIn){
            return (
                <TouchableOpacity  style={styles.ButtonStyle} onPress={()=>{ firebase.auth().signOut()}} >
                    <Text style={{color:'#fff',fontWeight:'bold'}}>Log Out</Text>
                </TouchableOpacity>
            )
        }
        return <LoginForm />
    }


    render(){
        return(
            <View>
                <Header headerText="FirebaseAuth"></Header>
                {this.renderContent()}
            </View>
        );
    }
}
const styles ={
    ButtonStyle:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center' ,
        backgroundColor:'#4dbeff',
        height: 40,
        borderRadius:5
    }
}