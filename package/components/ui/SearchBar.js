import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({
  value,
  onChangeText,
  placeholder = "Search",
  onClear,
  containerStyle,
  inputStyle,
  autoFocus = false,
}) => {
  const handleClear = () => {
    onChangeText("");
    if (onClear) onClear();
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        size={18}
        color="#8E8E93"
        style={styles.searchIcon}
      />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#8E8E93"
        style={[styles.input, inputStyle]}
        autoCorrect={false}
        autoCapitalize="none"
        autoFocus={autoFocus}
        returnKeyType="search"
      />

      {value?.length > 0 && (
        <TouchableOpacity
          onPress={handleClear}
          hitSlop={10}
          accessibilityRole="button"
        >
          <FontAwesomeIcon
            icon={faXmark}
            size={18}
            color="#8E8E93"
            style={styles.clearIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: "#F2F2F7",

    // iOS shadow
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },

    // Android
    elevation: 3,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#1C1C1E",
    paddingVertical: 0, // Android fix
  },
  clearIcon: {
    marginLeft: 8,
  },
});

export default SearchBar;
