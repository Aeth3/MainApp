import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const FilterBar = ({
  filters = [],
  selectedId,
  onChange,
  style,
}) => {
  return (
    <View style={[styles.wrapper, style]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {filters.map((item) => {
          const active = item.id === selectedId;

          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => onChange(item)}
              activeOpacity={0.85}
              style={[
                styles.chip,
                active && styles.chipActive,
              ]}
            >
              <Text
                style={[
                  styles.label,
                  active && styles.labelActive,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 8,
  },
  container: {
    paddingHorizontal: 12,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F2F2F7",
    justifyContent: "center",
    alignItems: "center",

    // iOS shadow
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },

    // Android
    elevation: 2,
  },
  chipActive: {
    backgroundColor: "#1C1C1E",
  },
  label: {
    fontSize: 14,
    color: "#1C1C1E",
    fontWeight: "500",
  },
  labelActive: {
    color: "#FFFFFF",
  },
});

export default FilterBar;
