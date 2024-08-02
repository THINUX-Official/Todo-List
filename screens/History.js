import React from "react";
import {StyleSheet, Text, View} from "react-native";

const History = (props) => {

    return (
        <View style={styles.container}>
            <Text>History Page</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default History;