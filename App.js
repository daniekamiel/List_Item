import React,{ useState} from 'react';
import { StyleSheet, Text, View,FlatList,Alert, TouchableWithoutFeedback,Keyboard } from 'react-native';
import Header from './component/header';
import TodoItem from './component/todoitem';
import AddTodo from './component/addTodo';
import Sandbox from './component/sandbox';



export default function App() {
  const [todos, setTodos] = useState([
    { text: 'Tido Contoh', key: '1' },
    { text: 'Makan Contoh', key: '2' },

  ]);

  const pressHandler = (key) => {
    setTodos((prevTodos) =>{
      return prevTodos.filter(todo =>todo.key!= key);
    });
  }

  const submitHandler = (text)=>{
    if(text.length >3){
      setTodos((prevTodos) =>{
        return [
          { text: text, key:Math.random().toString() },
          ...prevTodos
        ];
      });
    } else { 
      Alert.alert('Must Be Over 3 Chars','text'[
        {text: 'Understood', onPress:() => console.log('alert closed')}
      ]);
    }

  }

  return (
    //<Sandbox/>
    <TouchableWithoutFeedback onPress={() =>{
      Keyboard.dismiss();
      console.log('dismissed keyboard')
    }}>
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <AddTodo submitHandler={submitHandler}/>
          <View style={styles.list}>
            <FlatList
              data={todos}
              renderItem={({ item }) => (
                <TodoItem item={item} pressHandler={pressHandler}/>
              )}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    },
    content:{
      padding:40,
      flex:1,
    },
    list:{
      flex:1,
      marginTop:20,
    }

});