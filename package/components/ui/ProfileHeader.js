import { Image, StyleSheet, Text, View } from "react-native";

export default function ProfileHeader({ name = 'John Doe', email = 'johndoe@email.com', uri = "https://i.pravatar.cc/150?img=15", propStyles }) {
    return <View style={[styles.header, propStyles]}>
        <Image
            source={{ uri }}
            style={styles.avatar}
        />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
    </View>
}

const styles = StyleSheet.create({
    header: {
        paddingTop: 50,
        paddingBottom: 20,
        backgroundColor: "#f2f2f7",
        alignItems: "center",
        borderRadius: 10,
        elevation: 3,
        marginHorizontal: 10,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: "600",
        color: "#111",
    },
    email: {
        fontSize: 13,
        color: "#555",
        marginTop: 2,
    },
})