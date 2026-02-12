import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { SvgXml } from "react-native-svg";
import CustomButton from "../../components/CustomButton";
import { GlobalStyleSheet } from "../../constants/StyleSheet";
import { COLORS, FONTS, SIZES, ICONS, IMAGES } from "../../constants/theme";

const ForgotPassword = ({
  handleSubmit = () => {},
  handleBack = () => {},
}) => {
  const [email, setEmail] = useState("");

  const onNext = () => {
    handleSubmit(email);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.headerContainer}>
            <LinearGradient colors={["#F7F5FF", "rgba(255,255,255,0)"]} style={styles.topGradient} />
            <LinearGradient colors={["#F7F5FF", "rgba(255,255,255,0)"]} style={styles.bottomGradient} />
            <Image style={styles.logo} source={IMAGES.appLogo} />
            <Image style={styles.shape} source={IMAGES.loginShape} />
          </View>

          <View style={{ backgroundColor: "#332A5E" }}>
            <View style={[GlobalStyleSheet.container, { paddingTop: 5 }]}>
              <View style={{ marginBottom: 30 }}>
                <Text style={[FONTS.h2, { textAlign: "center", color: COLORS.white }]}>Forgot Password</Text>
                <Text style={[FONTS.font, { textAlign: "center", color: COLORS.white, opacity: 0.7 }]}>
                  Enter your email and we will send a recovery code.
                </Text>
              </View>

              <View style={{ marginBottom: 15 }}>
                <View style={styles.inputIcon}>
                  <SvgXml xml={ICONS.email} />
                </View>
                <TextInput
                  style={styles.inputStyle}
                  placeholder="Email"
                  placeholderTextColor={"rgba(255,255,255,.6)"}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <View style={{ paddingBottom: 10, flexDirection: "row" }}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                  <SvgXml style={{ marginLeft: 6 }} xml={ICONS.back} />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                  <CustomButton onPress={onNext} title="NEXT" />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 200,
  },
  topGradient: {
    height: 135,
    width: 135,
    borderRadius: 135,
    position: "absolute",
    top: 20,
    right: -50,
    transform: [{ rotate: "-120deg" }],
  },
  bottomGradient: {
    height: 135,
    width: 135,
    borderRadius: 135,
    position: "absolute",
    bottom: 0,
    left: -50,
    transform: [{ rotate: "120deg" }],
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 40,
    resizeMode: "contain",
  },
  shape: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    resizeMode: "stretch",
    height: 65,
  },
  inputStyle: {
    ...FONTS.fontLg,
    height: 50,
    paddingLeft: 60,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    color: COLORS.white,
    backgroundColor: "rgba(255,255,255,.05)",
    borderColor: "rgba(255,255,255,.3)",
  },
  inputIcon: {
    height: 40,
    width: 40,
    borderRadius: 10,
    position: "absolute",
    left: 10,
    top: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    backgroundColor: "rgba(255,255,255,.1)",
    width: 50,
    borderRadius: SIZES.radius,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
});

export default ForgotPassword;
