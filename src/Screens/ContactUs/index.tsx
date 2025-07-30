import React, { FC, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Linking,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { fetchData } from "../../APIService/api";
import ENDPOINTS from "../../APIService/endPoints";
import ICONS from "../../Assets/icons";
import CustomButton from "../../Components/Buttons/CustomButton";
import CustomIcon from "../../Components/CustomIcon";
import CustomInput from "../../Components/CustomInput";
import { CustomText } from "../../Components/CustomText";
import { GetUserDataResponse } from "../../Typings/apiTypes";
import { ContactUsProps } from "../../Typings/route";
import STORAGE_KEYS from "../../Utilities/Constants";
import { horizontalScale, verticalScale } from "../../Utilities/Metrics";
import { deleteLocalStorageData } from "../../Utilities/Storage";
import styles from "./style";
import { KeyboardScrollView } from "../../Components/KeyboardScrollView";
import { KeyboardAvoidingContainer } from "../../Components/KeyboardAvoidingComponent";
import COLORS from "../../Utilities/Colors";

const ContactUs: FC<ContactUsProps> = ({ navigation }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    phone: "",
    reason: "",
  });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");

  const [getDataLoading, setGetDataLoading] = useState(false);

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = () => {
    const { firstName, lastName, email, phone, companyName, reason } = form;

    const to = "dan@inscape.life"; // Replace with your support email
    const subject = `Contact Request from ${firstName} ${lastName}`;
    const body = `
  Name: ${firstName} ${lastName}
  Email: ${email}
  Phone: ${phone || "N/A"}
  Company: ${companyName || "N/A"}
  
  Reason:
  ${reason}
    `;

    const mailto = `mailto:${to}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    Linking.openURL(mailto).catch((err) =>
      Toast.show({
        type: "error",
        text1: "Failed to open email app.",
        text2: err.message,
      })
    );
  };

  const getUserData = async () => {
    setGetDataLoading(true);

    try {
      const response = await fetchData<GetUserDataResponse>(
        ENDPOINTS.getUserData
      );

      if (response.data.success) {
        const { firstName, lastName, email, companyName } = response.data.data;
        setFirstName(firstName);
        setLastName(lastName);
        setEmail(email);
        setCompanyName(companyName);

        setForm({
          ...form,
          firstName,
          lastName,
          companyName,
          email,
        });
      }
    } catch (error: any) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: error.message || "Something went wrong.",
      });
      if (error.status === 404 || error.status === 401) {
        await deleteLocalStorageData(STORAGE_KEYS.token);
        await deleteLocalStorageData(STORAGE_KEYS.isAuth);
        await deleteLocalStorageData(STORAGE_KEYS.isRegistered);
        navigation.replace("authStack", { screen: "signIn" });
      }
    } finally {
      setGetDataLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <KeyboardScrollView bounce backgroundColor={COLORS.darkBlue}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <CustomText type="title" fontFamily="bold">
            Contact Us
          </CustomText>
          {navigation.canGoBack() && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.goBack()}
              style={styles.backArrowCont}
            >
              <CustomIcon Icon={ICONS.BackArrow} height={15} width={15} />
            </TouchableOpacity>
          )}
        </View>
        <ScrollView
          style={{
            flexGrow: 1,
          }}
          contentContainerStyle={{
            gap: verticalScale(10),
          }}
        >
          <View style={{ flexDirection: "row", gap: horizontalScale(10) }}>
            <CustomInput
              label="First Name"
              value={form.firstName}
              onChangeText={(text) => handleChange("firstName", text)}
              placeholder="First name"
              style={{ flex: 1 }}
            />
            <CustomInput
              label="Last Name"
              value={form.lastName}
              onChangeText={(text) => handleChange("lastName", text)}
              placeholder="Last name"
              style={{ flex: 1 }}
            />
          </View>
          <CustomInput
            label="Company Name"
            value={form.companyName}
            onChangeText={(text) => handleChange("companyName", text)}
            placeholder="Enter your company name"
          />
          <CustomInput
            label="Email Address"
            value={form.email}
            onChangeText={(text) => handleChange("email", text)}
            placeholder="Enter your email address"
          />
          <CustomInput
            label="Phone Number (optional)"
            value={form.phone}
            onChangeText={(text) => handleChange("phone", text)}
            placeholder="Enter your phone number"
            type="text"
          />
          <CustomInput
            label="Reason for contacting Inscape"
            value={form.reason}
            onChangeText={(text) => handleChange("reason", text)}
            placeholder="Explain your issue(s)"
            style={{
              minHeight: 100,
              textAlignVertical: "top",
              paddingBottom: verticalScale(20),
            }}
            multiline={true}
            numberOfLines={4}
            height={120}
          />
        </ScrollView>
        <CustomButton
          title="Submit"
          onPress={handleSubmit}
          style={{ marginTop: 24 }}
        />
      </SafeAreaView>
    </KeyboardScrollView>
  );
};

export default ContactUs;
