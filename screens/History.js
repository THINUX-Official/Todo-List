import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Dialog from 'react-native-dialog';
import { useHistory } from '../components/HistoryContext';

export default function History() {
    const { historyItems, clearHistory } = useHistory();
    const [dialogVisible, setDialogVisible] = useState(false);

    const handleClearHistory = () => {
        setDialogVisible(true);
    };

    const handleConfirmClear = () => {
        clearHistory();
        setDialogVisible(false);
    };

    const handleCancelClear = () => {
        setDialogVisible(false);
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.historyList}>
                {historyItems.length > 0 ? (
                    historyItems.map((item, index) => (
                        <View key={index} style={styles.item}>
                            <Text>{item}</Text>
                        </View>
                    ))
                ) : (
                    <Text style={styles.emptyText}>No history items</Text>
                )}
            </ScrollView>
            <TouchableOpacity style={styles.clearButton} onPress={handleClearHistory}>
                <Text style={styles.clearButtonText}>Clear All</Text>
            </TouchableOpacity>

            {/* Confirmation Dialog */}
            <Dialog.Container visible={dialogVisible}>
                <Dialog.Title>Warning</Dialog.Title>
                <Dialog.Description>
                    Do you really want to clear all items from history?
                </Dialog.Description>
                <Dialog.Button label="No" onPress={handleCancelClear} />
                <Dialog.Button label="Yes" onPress={handleConfirmClear} />
            </Dialog.Container>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED',
        padding: 20,
    },
    historyList: {
        flex: 1,
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#C0C0C0',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
        color: '#C0C0C0',
    },
    clearButton: {
        backgroundColor: '#FF6347', // Example color
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    clearButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
