import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Task from './components/Task';
import History from './screens/History';
import ToastManager, {Toast} from 'toastify-react-native';

const Stack = createStackNavigator();

function HomeScreen({navigation}) {
    const [task, setTask] = useState();
    const [taskItems, setTaskItems] = useState([]);

    const handleAddTask = () => {
        setTaskItems([...taskItems, task]);
        setTask(null);
        showToasts();
    };

    const completeTask = (index) => {
        let itemsCopy = [...taskItems];
        itemsCopy.splice(index, 1);
        setTaskItems(itemsCopy);
    };

    const showToasts = () => {
        Toast.success('Successfully saved!');
    };

    return (
        <View style={styles.container}>
            <ToastManager/>

            <View style={styles.tasksWrapper}>
                <ScrollView style={styles.items}>
                    {taskItems.map((item, index) => (
                        <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                            <Task text={item}/>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <KeyboardAvoidingView style={styles.writeTaskWrapper}>
                <TextInput
                    style={styles.input}
                    placeholder={'Write a task'}
                    value={task}
                    onChangeText={(text) => setTask(text)}
                />
                <TouchableOpacity onPress={() => handleAddTask()}>
                    <View style={styles.addWrapper}>
                        <Text style={styles.addText}>+</Text>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={({navigation}) => ({
                        headerLeft: () => (
                            <TouchableOpacity onPress={() => console.log('TASKS button pressed')}
                                              style={styles.headerButton}>
                                <Text style={styles.sectionTitle}>TASKS</Text>
                            </TouchableOpacity>
                        ),
                        headerRight: () => (
                            <TouchableOpacity onPress={() => navigation.navigate('History')}
                                              style={styles.headerButton}>
                                <Text style={styles.sectionTitle}>HISTORY</Text>
                            </TouchableOpacity>
                        ),
                        headerTitle: '', // To remove default title and make space for left and right buttons
                        headerStyle: {paddingHorizontal: 20} // Apply padding to header
                    })}
                />
                <Stack.Screen name="History" component={History}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED',
    },
    headerButton: {
        marginHorizontal: 20, // Horizontal margin for buttons
    },
    tasksWrapper: {
        // paddingTop: 80,
        paddingHorizontal: 20,
    },
    topTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    items: {
        marginTop: 30,
    },
    writeTaskWrapper: {
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        borderRadius: 10,
        borderColor: '#C0C0C0',
        width: '80%',
    },
    addWrapper: {
        width: 60,
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
    },
    addText: {
        fontSize: 20,
        color: '#C0C0C0',
    },
});
