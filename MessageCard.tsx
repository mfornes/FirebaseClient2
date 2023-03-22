import React, { FC } from "react";
import { StyleSheet, View, Text} from 'react-native';

type ItemProps = {
    title: string;
    body: string;
    accepted: number
};

const MessageCard: FC<ItemProps> = ({ title, body, accepted }): JSX.Element => {  
    return (
        <View style={(accepted==1) ? styles.itemAccept : styles.itemCancel}>
            <View style={styles.container}>
                <Text>{(accepted==1) ? "Accepted" : "Canceled"}</Text>                
            </View>    
            <Text style={styles.title}>{title}</Text>        
            <Text style={styles.body}>{body}</Text>            
        </View>
    );
};

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    itemAccept: {
      backgroundColor: '#1b5e20',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    itemCancel: {
        backgroundColor: '#d50000',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },
    title: {
      fontSize: 32,
    },
    body: {
        fontSize: 16,
      },
  });

  export default MessageCard;