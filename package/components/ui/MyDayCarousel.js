import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../theme/Theme";

const carouselSize = {
    width: 110,
    height: 170
}

export default function MyDayCarousel({ stories }) {
    const { colors } = useTheme();

    // 🧠 Render story item
    const renderStory = ({ item }) => {
        if (item.isAddButton) {
            return (
                <TouchableOpacity
                    style={{
                        alignItems: "center",
                        marginRight: 12,
                    }}
                >
                    <View
                        style={{
                            width: carouselSize.width,
                            height: carouselSize.height,
                            borderRadius: 20,
                            backgroundColor: colors.backgroundHighlight,
                            alignItems: "center",
                            justifyContent: "center",

                        }}
                    >
                        <FontAwesomeIcon icon={faPlus} size={24} color={colors.accent} />
                    </View>
                    <Text
                        style={{
                            color: colors.textPrimary,
                            fontSize: 12,
                            marginTop: 6,
                            fontWeight: "600",
                        }}
                    >
                        Add Story
                    </Text>
                </TouchableOpacity>
            );
        }

        return (
            <TouchableOpacity
                style={{
                    alignItems: "center",
                    marginRight: 12,
                }}
            >
                <View
                    style={{
                        width: carouselSize.width,
                        height: carouselSize.height,
                        borderRadius: 20,
                        overflow: "hidden",
                        shadowColor: "#000",
                        shadowOpacity: 0.1,
                        shadowRadius: 3,
                        elevation: 3,
                    }}
                >
                    <Image
                        source={{ uri: item.image }}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="cover"
                    />
                </View>
                <Text
                    numberOfLines={1}
                    style={{
                        color: colors.textPrimary,
                        fontSize: 12,
                        marginTop: 6,
                        fontWeight: "500",
                        width: 70,
                        textAlign: "center",
                    }}
                >
                    {item.name}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View
            style={{
                paddingVertical: 10,
                backgroundColor: colors.cardBackground,
                marginVertical: 5
            }}
        >
            <FlatList
                data={stories}
                renderItem={renderStory}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 12,
                }}
            />
        </View>
    );
}
