import React, {useEffect, useState} from 'react';
import { SafeAreaView, StatusBar, FlatList, StyleSheet } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import MessageBox from './MessageBox'
import MessageCard from './MessageCard'

const fcmToken = async () => {
  const token = await messaging().getToken();
  if (token) {
     console.log(token);
  } else {
     
  }
}

const App = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {   
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const jsonValue = {
        id: remoteMessage.messageId,
        title: remoteMessage.notification?.title,
        body: remoteMessage.notification?.body,
        accepted: remoteMessage.data?.accepted,
      }      
      setData([...data, jsonValue])
      console.log(remoteMessage.data?.accepted)
    });   
    return unsubscribe;
  });

  useEffect(() => {   
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      const jsonValue = {
        id: remoteMessage.messageId,
        title: remoteMessage.notification?.title,
        body: remoteMessage.notification?.body,
        accepted: remoteMessage.data?.accepted,        
      }      
      setData([...data, jsonValue])
      console.log(remoteMessage.data?.accepted)
    });
  });

  const _renderItem = ({ item }) => (
    <MessageCard title={item.title} body={item.body} accepted={item.accepted}/>
  );  

  return (
    <SafeAreaView>
       <StatusBar
        backgroundColor="#61dafb"/>      
      <MessageBox/>
      <FlatList
        data={data}
        extraData={data}
        removeClippedSubviews={true}
        inverted
        scrollEnabled={true}
        renderItem={_renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default App;
