import React, { FC, useState } from "react";
import { StyleSheet, TouchableOpacity, View, TextInput, Text} from 'react-native';

const MessageBox: FC = (): JSX.Element => {
    const [title, setTitle] = useState("Title");
    const [text, setText] = useState("Write the Message");
    const _handlePress = () => {
        const token = "dLEfyt4OSvSw4Hroa4aMdT:APA91bE15sXs5wNxEJHhePskV0lbSuDsh5SENIDON8mc4l25NIooHvj1EQym6V7FYEjTJcSqGbcQePOSRqobvlLue0ILqaklCG38DMfpoC6Evrk0CsxAE0bI7E10ERXP-JSh77bWz0j1";
        fetch('https://firebasebackend.herokuapp.com/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: {
                    notification:{
                            title: title,
                            body: text
                        },
                    token: token
                }
            }),
                
        }).then((response) => {
            console.log(response)
            
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <View> 
             <TextInput
                style={styles.inputitle}
                onChangeText={title => setTitle(title)}
                onFocus={() => setTitle("")}
                value={title}
            />
            <TextInput
                style={styles.input}
                onChangeText={text => setText(text)}
                onFocus={() => setText("")}
                value={text}
            />
            <TouchableOpacity
                style={styles.button}             
                onPress={_handlePress}>
              <Text>Send</Text>  
            </TouchableOpacity>   
        </View>      
    );
};

const styles = StyleSheet.create({
    input: {
      height: 100,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      textAlignVertical: 'top',
    },
    inputitle: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        textAlignVertical: 'top',
      },
    button: {
        alignItems: "center",
        backgroundColor: "#61dafb",
        padding: 10,
      },
});

export default MessageBox;