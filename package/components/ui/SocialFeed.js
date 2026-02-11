import React from "react";
import { FlatList, View } from "react-native";
import SocialPost from "./SocialPost"; // import the component from before

export default function SocialFeed({ posts }) {
    return (
        <View style={{ flex: 1 }}>
            {posts.map((post, id) => <SocialPost key={id} {...post} />)}
        </View>
    );
}
