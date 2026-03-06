import React from 'react';
import { View, Text } from 'react-native';

export default function MessagingScreen({ route }) {
    const { paddingTop = 0 } = route?.params || {};

    return (
        <View style={{ flex: 1, paddingTop, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#16A085' }}>
                Messaging
            </Text>
            <Text style={{ marginTop: 10, color: '#666' }}>
                Screen coming soon
            </Text>
        </View>
    );
}
