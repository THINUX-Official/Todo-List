import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Task from './components/Task'
import React, { useState } from 'react';
import ToastManager, { Toast } from 'toastify-react-native'
import { ScrollView } from 'react-native';


export default function App() {

    const [task, setTask] = useState();
    const [taskItems, setTaskItems] = useState([]);

    const handleAddTask = () => {
        // Keyboard.dismiss();
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
        Toast.success('Successfully saved!')
    }

    return (
        <View style={styles.container}>
            <ToastManager />

            {/* today's tasks */}
            <View style={styles.tasksWrapper}>
                <View style={styles.topTitle}>
                    <TouchableOpacity onPress={() => console.log('TASKS button pressed')}>
                        <Text style={styles.sectionTitle}>TASKS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => console.log('HISTORY button pressed')}>
                        <Text style={styles.sectionTitle}>HISTORY</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.items}>
                    {/*    this is the where the tasks go*/}

                    {taskItems.map((item, index) => {
                        return (
                            <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                                <Task text={item} />
                            </TouchableOpacity>
                        )
                    }
                    )}
                </ScrollView>
            </View>

            {/* write a task */}
            <KeyboardAvoidingView
                style={styles.writeTaskWrapper}>
                <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)} />

                <TouchableOpacity onPress={() => handleAddTask()}>
                    <View style={styles.addWrapper}>
                        <Text style={styles.addText}>+</Text>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // fontFamily: 'Poppins',
        flex: 1,
        backgroundColor: '#E8EAED',
    },
    tasksWrapper: {
        paddingTop: 80,
        paddingHorizontal: 20
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
        // paddingHorizontal: 20,
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
        borderColor: '#C0C0C0',
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
    }
});
