import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Task from './components/Task';
import History from './screens/History';
import ToastManager, {Toast} from 'toastify-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {HistoryProvider, useHistory} from './components/HistoryContext'; // Import HistoryContext

const Stack = createStackNavigator();

function HomeScreen({navigation}) {
    const {historyItems, addHistoryItem} = useHistory();
    const [task, setTask] = useState('');
    const [taskItems, setTaskItems] = useState([]);

    const handleAddTask = () => {
        setTaskItems([...taskItems, task]);
        setTask('');
        Toast.success('Successfully saved!');
    };

    const handleCompleteTask = (index) => {
        const completedTask = taskItems[index];
        setTaskItems((prevTasks) => prevTasks.filter((_, i) => i !== index));
        addHistoryItem(completedTask); // Add to history
    };

    return (
        <View style={styles.container}>
            <ToastManager/>
            <View style={styles.tasksWrapper}>
                <ScrollView style={styles.items}>
                    {taskItems.map((item, index) => (
                        <TouchableOpacity key={index} onPress={() => handleCompleteTask(index)}>
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
                <TouchableOpacity onPress={handleAddTask}>
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
        <HistoryProvider>
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
                            headerTitle: '',
                            headerStyle: '',
                        })}
                    />
                    <Stack.Screen
                        name="History"
                        component={History}
                        options={({navigation}) => ({
                            headerLeft: () => (
                                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
                                    <Icon name="arrow-left" size={20} color="#000"/>
                                </TouchableOpacity>
                            ),
                            headerTitle: '',
                            headerStyle: '',
                        })}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </HistoryProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED',
    },
    headerButton: {
        marginHorizontal: 20,
    },
    tasksWrapper: {
        paddingHorizontal: 20,
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
