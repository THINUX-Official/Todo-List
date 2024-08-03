import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Dialog from 'react-native-dialog';
import { useHistory } from '../components/HistoryContext';

export default function History() {
    const { historyItems, clearHistory, removeItemFromHistory } = useHistory();
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

    const handleItemClick = (item) => {
        // removeItemFromHistory(item); // Remove item from history
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.historyList}>
                {historyItems.length > 0 ? (
                    historyItems.map((item, index) => (
                        <TouchableOpacity key={index} onPress={() => handleItemClick(item)}>
                            <View style={styles.items}>
                                <View style={styles.itemLeft}>
                                    <View style={styles.square}></View>
                                    <Text style={styles.itemText}>{item}</Text>
                                </View>
                                <View style={styles.circular}></View>
                            </View>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text style={styles.emptyText}>No History Items!</Text>
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
    items: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: '#FF6347',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15,
    },
    itemText: {
        maxWidth: '80%',
    },
    circular: {
        width: 12,
        height: 12,
        borderColor: '#FF6347',
        borderWidth: 2,
        borderRadius: 5,
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
