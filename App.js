import { StyleSheet, Text, View } from 'react-native';
import Task from './components/Task'

export default function App() {
    return (
        <View style={styles.container}>

            {/* today's tasks */}
            <View style={styles.tasksWrapper}>
                <Text style={styles.sectionTitle}>Today's Tasks</Text>

                <View style={styles.items}>
                    {/*    this is the where the tasks go*/}
                    <Task text={'task 1'} />
                    <Task text={'task 2'} />
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED',
    },
    tasksWrapper: {
        paddingTop: 80,
        paddingHorizontal: 20
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    items: {
        marginTop: 30,
    },
});
