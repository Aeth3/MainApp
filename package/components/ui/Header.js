import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { useTheme } from "../../theme/Theme";

export default function Header({
    title,
    icons = [],
    secondaryIcons = [],
    uri = "",
    titleStyle,
    titleLogo,
    handleProfilePress,
    style,
    iconStyle,
    isPrimaryVisible = true
}) {
    const { colors } = useTheme();

    return (
        <>
            {isPrimaryVisible && (title || titleLogo || (icons && icons.length > 0)) && (
                <View
                    style={[{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        padding: 12,
                        backgroundColor: colors.cardBackground,
                    }, style]}
                >
                    {(title || titleLogo) && (
                        <View style={{ alignItems: "center" }}>
                            {titleLogo && (
                                <Image
                                    source={
                                        typeof titleLogo === "string"
                                            ? { uri: titleLogo }
                                            : titleLogo
                                    }
                                    style={{
                                        width: 40,
                                        height: 40,
                                        marginBottom: 4,
                                        resizeMode: "contain",
                                    }}
                                />
                            )}
                            {title && (
                                <Text
                                    style={[
                                        { fontSize: 18, fontWeight: "bold", color: colors.textPrimary },
                                        titleStyle,
                                    ]}
                                >
                                    {title}
                                </Text>
                            )}
                        </View>
                    )}

                    {icons && icons.length > 0 && (
                        <View style={{ flexDirection: "row" }}>
                            {icons.map((icon, index) => (
                                <TouchableOpacity key={index} onPress={icon.onPress}>
                                    <View
                                        style={[{
                                            backgroundColor: colors.backgroundHighlight,
                                            borderRadius: 50,
                                            padding: 8,
                                            marginLeft: index > 0 ? 12 : 0,
                                        }, iconStyle]}
                                    >
                                        <FontAwesomeIcon
                                            icon={icon.name}
                                            size={icon.size}
                                            color={colors.accent}
                                        />
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>
            )}

            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    paddingHorizontal: secondaryIcons && secondaryIcons.length > 0 ? 12 : null,
                    paddingVertical: secondaryIcons && secondaryIcons.length > 0 ? 10 : null,
                    backgroundColor: colors.cardBackground,
                }}
            >
                {secondaryIcons.map((icon, index) => {
                    if (icon.type === "icon") {
                        return (
                            <TouchableOpacity key={index} onPress={icon.onPress}>
                                <View
                                    style={{
                                        backgroundColor: colors.backgroundHighlight,
                                        borderRadius: 50,
                                        padding: 8,
                                        marginLeft: index > 0 ? 12 : 0,
                                    }}
                                >
                                    <FontAwesomeIcon
                                        icon={icon.name}
                                        size={icon.size}
                                        color={colors.accent}
                                    />
                                </View>
                            </TouchableOpacity>
                        )
                    }
                    else if (icon.type === "image") {
                        return (
                            <TouchableOpacity key={index} onPress={icon.onPress}>
                                <Image
                                    source={{ uri }}
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 20,
                                        marginLeft: 12,
                                    }}
                                    resizeMode="cover"
                                />
                            </TouchableOpacity>
                        )
                    }
                })}
                {/* {uri !== "" && (
                    <TouchableOpacity onPress={handleProfilePress}>
                        <Image
                            source={{ uri }}
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                                marginLeft: 12,
                            }}
                            resizeMode="cover"
                        />
                    </TouchableOpacity>
                )} */}
            </View>
        </>
    );
}
