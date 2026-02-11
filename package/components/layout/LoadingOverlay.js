import React, { useCallback, useEffect, useRef } from "react"
import { View, Text, ActivityIndicator, Animated, StyleSheet, Dimensions } from "react-native"
import LinearGradient from "react-native-linear-gradient" // 👈 install if not yet: npm i react-native-linear-gradient

const { width } = Dimensions.get("window")

export default function LoadingOverlay({ visible, text = "Please wait..." }) {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const shimmerAnim = useRef(new Animated.Value(0)).current

  const startShimmer = useCallback(() => {
    shimmerAnim.setValue(0)
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      })
    ).start()
  }, [shimmerAnim])

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start()
      startShimmer()
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start()
    }
  }, [fadeAnim, startShimmer, visible])

  if (!visible) return null

  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  })

  return (
    <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
      {/* Shimmer background */}
      <View style={styles.shimmerContainer}>
        <Animated.View
          style={[
            styles.shimmerOverlay,
            {
              transform: [{ translateX }],
            },
          ]}
        >
          <LinearGradient
            colors={["rgba(255,255,255,0)", "rgba(255,255,255,0.4)", "rgba(255,255,255,0)"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.gradient}
          />
        </Animated.View>
      </View>

      {/* Centered loader */}
      <View style={styles.loaderBox}>
        <ActivityIndicator size="large" color="#1877f2" />
        <Text style={styles.text}>{text}</Text>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    elevation: 9999, // 👈 important for Android layering
  },
  shimmerContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },
  shimmerOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  gradient: {
    flex: 1,
  },
  loaderBox: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.95)",
    paddingVertical: 25,
    paddingHorizontal: 40,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  text: {
    marginTop: 15,
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
})
