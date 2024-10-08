/* eslint-disable react-native/no-inline-styles */
import { View, Text, TextInput, Pressable, Alert, FlatList} from 'react-native';
import React, {useState} from 'react';

const TodoList = () => {
  const [title, setTitle] = useState<string>('');
  const [todo, setTodo] = useState<any[]>([
    {
      id: 1,
      title: 'Learn React Native',
      completed: false,
    },
  ]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleAddTodo = () => {
    if (!title) {
      Alert.alert('Error', 'Please enter your todo');
      return;
    }
    if (isEditing && editingId !== null) {
      handleEditTodo();
      return;
    }

    const newTodo = {
      id: todo.length + 1,
      title: title,
      completed: false,
    };
    setTodo([...todo, newTodo]);
    setTitle('');
  };

  const handleDeleteTodo = (id: number) => {
    const newTodos = todo.filter(item => item.id !== id);
    setTodo(newTodos);
  };

  const startEditing = (item: any) => {
    setIsEditing(true);
    setTitle(item.title);
    setEditingId(item.id);
  };

  const handleEditTodo = () => {
    const updateTodos = todo.map(item => {
      if (item.id === editingId) {
        return {...item, title: title};
      }
      return item;
    });

    setTodo(updateTodos);
    setIsEditing(false);
    setTitle('');
    setEditingId(null);
  };

  return (
    <View
    style={{
      flex: 1,
      paddingHorizontal: 10,
      marginTop: 10,
      backgroundColor: '#87CEFA',
    }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#001f3f',
          marginBottom: 20,
        }}>
        To Do List
      </Text>
      <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        gap: 10,
      }}>
        <TextInput
        placeholder="Enter your todo"
        style={{
          flex: 1,
          borderColor: '#C0C0C0',
          borderWidth: 1,
          padding: 10,
          backgroundColor: '#FFFFFF',
          // margin: 10,
        }}
        value={title}
        onChangeText={setTitle}
        />
        <Pressable
        style={{
          backgroundColor: '#4169E1',
          padding: 10,
          borderRadius: 5,
          height: 40,
        }}
        onPress={handleAddTodo}>
          <Text
          style={{
            color: '#FFFFFF',
          }}>
            {isEditing ? 'Edit' : 'Add'}
          </Text>
        </Pressable>
      </View>

      {/* Daftar Todo */ }
      <FlatList
        data={todo}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 10,
              borderBottomWidth: 1,
              borderBottomColor: '#00BFFF',
            }}>
              <Text
                style={{
                  fontSize: 18,
                  color: '#001f3f',
                }}>
                  {item.title}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                  }}>

                    {/* Tombol Edit */}
                    <Pressable
                      style={{
                        backgroundColor: '#40E0D0',
                        padding: 5,
                        borderRadius: 5,
                      }}
                      onPress={() => startEditing(item)}>
                        <Text
                          style={{
                            color: '#FFFFFF',
                          }}>
                          Edit
                        </Text>
                      </Pressable>

                      {/* Hapus */}
                      <Pressable
                        style={{
                          backgroundColor: '#FFD700',
                          padding: 5,
                        }}
                        onPress={() => handleDeleteTodo(item.id)}>
                          <Text
                            style={{
                              color: '#000000',
                            }}>
                            Delete
                          </Text>
                        </Pressable>
                    </View>
                </View>
             )}
          />
      </View>
   );
};

export default TodoList;
