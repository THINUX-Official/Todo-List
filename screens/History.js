import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useHistory } from '../components/HistoryContext';

export default function History() {
    const { historyItems } = useHistory();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>History</Text>
            <ScrollView style={styles.scrollView}>
                {historyItems.length > 0 ? (
                    historyItems.map((item, index) => (
                        <View key={index} style={styles.task}>
                            <Text style={styles.taskText}>{item}</Text>
                        </View>
                    ))
                ) : (
                    <Text style={styles.noTaskText}>No tasks to display</Text>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    scrollView: {
        marginTop: 20,
    },
    task: {
        padding: 15,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 5,
    },
    taskText: {
        fontSize: 18,
    },
    noTaskText: {
        fontSize: 18,
        color: '#C0C0C0',
    },
});
