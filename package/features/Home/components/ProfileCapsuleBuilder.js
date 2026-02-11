import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Card from "../../../components/ui/Card";
import { iconMap } from "../../../assets/icons/iconMap";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export function ProfileCapsuleBuilder(config) {
    console.log("config", config);

    const { name = "User", profileUri, onPress, profileCapsuleIcon } = config;
    console.log(profileCapsuleIcon);

    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    const resolvedRightIcon =
        typeof profileCapsuleIcon === "string" ? iconMap[profileCapsuleIcon] : profileCapsuleIcon;
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
            <Card
                style={{
                    marginHorizontal: 10,
                    marginVertical: 6,
                    padding: 12,
                    borderRadius: 12,
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                {/* Profile Picture / Placeholder */}
                {profileUri ? (
                    <Image
                        source={{ uri: profileUri }}
                        style={{
                            width: 55,
                            height: 55,
                            borderRadius: 27.5,
                            marginRight: 10,
                        }}
                    />
                ) : (
                    <View
                        style={{
                            width: 55,
                            height: 55,
                            borderRadius: 27.5,
                            marginRight: 10,
                            backgroundColor: "#ddd",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#666" }}>
                            {initials}
                        </Text>
                    </View>
                )}

                {/* Name */}
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 16, fontWeight: "600", color: "#222" }}>
                        {name}
                    </Text>
                </View>

                {/* Right Icon */}
                {resolvedRightIcon && (
                    <View style={{ marginLeft: 10 }}>
                        {typeof resolvedRightIcon === "object" ? (
                            <FontAwesomeIcon icon={resolvedRightIcon} size={18} color="#666" />
                        ) : (
                            resolvedRightIcon
                        )}
                    </View>
                )}
            </Card>
        </TouchableOpacity>
    );
}
