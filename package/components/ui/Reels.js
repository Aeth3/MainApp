import React, { useState } from 'react';
import { ScrollView, Dimensions, StyleSheet, View } from 'react-native';
import Reel from './Reel';

const { height } = Dimensions.get('window');

export default function Reels({ data }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const onScroll = (e) => {
        const offsetY = e.nativeEvent.contentOffset.y;
        const index = Math.round(offsetY / height);
        setCurrentIndex(index);
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                pagingEnabled
                showsVerticalScrollIndicator={false}
                onMomentumScrollEnd={(e) => {
                    const offsetY = e.nativeEvent.contentOffset.y;
                    const index = Math.round(offsetY / height);
                    setCurrentIndex(index);
                }}
            >
                {data.map((item, index) => (
                    <View key={index} style={styles.page}>
                        <Reel item={item} isActive={index === currentIndex} />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        height: height,
        width: '100%',
    },
});
