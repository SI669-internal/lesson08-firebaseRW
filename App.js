import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import firebase from 'firebase';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAOFAGqFifSkvI4jRvR8Nq3Dus2JAyvPfQ",
  authDomain: "lesson07-firebasedemo.firebaseapp.com",
  databaseURL: "https://lesson07-firebasedemo.firebaseio.com",
  projectId: "lesson07-firebasedemo",
  storageBucket: "lesson07-firebasedemo.appspot.com",
  messagingSenderId: "1085673325819",
  appId: "1:1085673325819:web:9f32eac784f4117e825c5e"
};

export default class App extends React.Component {
  constructor(props) {
    super(props);

    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
    this.userDocRef = db.collection("settings").doc("currentuser");

    this.userDocRef.get().then((doc) => {
      console.log(doc);
      this.setState(doc.data());
    });

    this.state = {
      firstName: 'Mark',
      lastName: 'Newman'
    }
  }

  handleButtonPress = (firstName, lastName) => {
    let fullName = {
      firstName: firstName, 
      lastName: lastName
    }
    this.userDocRef.set(fullName);
    this.setState(fullName)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.greeting}>
          Hello {this.state.firstName} {this.state.lastName}!</Text>
        <Button
          title="I am Mark"
          onPress={() => this.handleButtonPress("Mark", this.state.lastName)}
        />    
        <Button
          title="I am Groot"
          onPress={() => this.handleButtonPress("Groot", this.state.lastName)}
        />  
        <Button
          title="I am a Newman"
          color="red"
          onPress={() => this.handleButtonPress(this.state.firstName, "Newman")}
        />    
        <Button
          title="I am a Tree"
          color="red"
          onPress={() => this.handleButtonPress(this.state.firstName, "Tree")}
        />  
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    padding: 20,
    fontSize: 24
  }
});


