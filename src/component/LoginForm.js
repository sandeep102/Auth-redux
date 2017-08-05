import React from 'react';
import {Text} from 'react-native';
import firebase from 'firebase'
import { Button,Card,CardSection,Input, Spinner } from './common'

export default class LoginForm extends React.Component{

    state = {email: '',password:'',error: '',loading: false}


    onButtonPress(){
       const {email, password, error} = this.state

        this.setState({ error: '',loading: true})

        firebase.auth().signInWithEmailAndPassword(email,password)
            .then(()=>{
                this.onLoginSuccess().bind(this)
            })
            .catch(()=>{
                firebase.auth().createUserWithEmailAndPassword(email,password)
                    .then((response) => {
                        this.onLoginSuccess().bind(this)
                    })
                    .catch((error)=>{
                        this.onLoginFail().bind(this)
                    })
            })
    }

    // clear all state when login success

    onLoginSuccess(){
        this.setState({
            email: '',
            password: '',
            error: '',
            loading: false
        })
    }

    onLoginFail(){
        this.setState({error: "Auth error",loading: false})
    }

    // whether to show login button or Progress indicator
    renderButton(){
        if(this.state.loading){
            return <Spinner size="small" />
        }
        return(
            <Button onPress={this.onButtonPress.bind(this)}>Log In</Button>
        )
    }

    render(){
        return(
                <Card>
                    <CardSection>
                        <Input
                            label= "Email"
                            placeholder="user@gmail.com"
                            secureTextEntry={false}
                            value={this.state.email}
                               onChangeText={email => this.setState({email})} />
                    </CardSection>
                    <CardSection>
                        <Input
                            label= "Password"
                            placeholder="******"
                            secureTextEntry={true}
                            value={this.state.password}
                            onChangeText={password => this.setState({password})} />
                    </CardSection>
                    <Text>{this.state.error}</Text>
                    <CardSection>
                        {this.renderButton()}
                    </CardSection>
                </Card>
        )
    }
}