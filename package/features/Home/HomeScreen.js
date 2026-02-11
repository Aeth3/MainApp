import React from "react";
import { View } from "react-native";
import { useHomeController } from "./controllers/HomeController";
import Screen from "../../components/layout/Screen";


export default function HomeScreen({ route }) {
    const { sections, renderItem, paddingBottom } = useHomeController();

    return (sections.map((item) => (
        <View key={item.id} style={{ flex: item.type === "swiper" ? 1 : undefined }}>
            {renderItem({ item })}
        </View>
    )));
}
