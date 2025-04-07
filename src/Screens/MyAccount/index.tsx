import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import React, { FC, useEffect, useState } from "react";
import { Pressable, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { fetchData, putData } from "../../APIService/api";
import ENDPOINTS from "../../APIService/endPoints";
import ICONS from "../../Assets/icons";
import CustomButton from "../../Components/Buttons/CustomButton";
import CustomIcon from "../../Components/CustomIcon";
import CustomInput from "../../Components/CustomInput";
import { CustomText } from "../../Components/CustomText";
import { KeyboardAvoidingContainer } from "../../Components/KeyboardAvoidingComponent";
import Loader from "../../Components/Loader";
import { GetUserDataResponse } from "../../Typings/apiTypes";
import { myAccountProps } from "../../Typings/route";
import COLORS from "../../Utilities/Colors";
import { convertStringToDate } from "../../Utilities/Helpers";
import styles from "./style";
import { deleteLocalStorageData } from "../../Utilities/Storage";
import STORAGE_KEYS from "../../Utilities/Constants";

dayjs.extend(customParseFormat);

const MyAccount: FC<myAccountProps> = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [selectedGender, setSelectedGender] = useState<
    "Male" | "Female" | "Other"
  >("Male"); // Gender state

  const genderTypes: ("Male" | "Female" | "Other")[] = [
    "Male",
    "Female",
    "Other",
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [getDataLoading, setGetDataLoading] = useState(false);

  // Initial state of fields (to compare for changes)
  const [initialFirstName, setInitialFirstName] = useState("");
  const [initialLastName, setInitialLastName] = useState("");
  const [initialBirthDate, setInitialBirthDate] = useState("");
  const [initialGender, setInitialGender] = useState<
    "Male" | "Female" | "Other"
  >("Male");

  const hasChanges =
    firstName !== initialFirstName ||
    lastName !== initialLastName ||
    birthDate !== initialBirthDate ||
    selectedGender !== initialGender;

  const handleUpdateProfile = async () => {
    setIsLoading(true);
    try {
      const response = await putData(ENDPOINTS.updateUserData, {
        firstName,
        lastName,
        dob: dayjs(convertStringToDate(birthDate)).format("DD-MM-YYYY"),
        gender: selectedGender.toLowerCase(),
      });

      if (response.data.success) {
        Toast.show({
          type: "success",
          text1: response.data.message,
        });
        getUserData();
      }
    } catch (error: any) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: error.message || "Something went wrong.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getUserData = async () => {
    setGetDataLoading(true);

    try {
      const response = await fetchData<GetUserDataResponse>(
        ENDPOINTS.getUserData
      );

      if (response.data.success) {
        const { firstName, lastName, email, companyName, dob, gender } =
          response.data.data;
        setFirstName(firstName);
        setLastName(lastName);
        setEmail(email);
        setCompanyName(companyName);
        const formattedDob = dayjs(dob).format("D[th] MMM YYYY");
        setBirthDate(formattedDob);
        const normalizedGender =
          gender === "male" ? "Male" : gender === "female" ? "Female" : "Other";
        setSelectedGender(normalizedGender);

        // Set initial values for comparison
        setInitialFirstName(firstName);
        setInitialLastName(lastName);
        setInitialBirthDate(formattedDob);
        setInitialGender(normalizedGender);
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
    // <KeyboardAvoidingView behavior="padding" style={styles.keyboardView}>
    <KeyboardAvoidingContainer backgroundColor={COLORS.darkBlue}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <CustomText type="title" fontFamily="bold">
            My Account
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

        {getDataLoading ? (
          <Loader />
        ) : (
          <>
            <View style={styles.inputCont}>
              <View style={styles.row}>
                <CustomInput
                  value={firstName}
                  placeholder="First Name"
                  onChangeText={setFirstName}
                  style={styles.flexInput}
                  label="First Name"
                />
                <CustomInput
                  value={lastName}
                  placeholder="Last Name"
                  onChangeText={setLastName}
                  style={styles.flexInput}
                  label="Last Name"
                />
              </View>

              <CustomInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                label="Email"
                disabled
              />

              <CustomInput
                value={companyName}
                onChangeText={setCompanyName}
                placeholder="Company Name"
                label="Company Name"
                disabled
              />

              <CustomInput
                value={birthDate}
                onChangeText={setBirthDate}
                placeholder="Birthday"
                label="Birthday"
                type="date"
              />

              <View style={styles.genderCont}>
                <CustomText fontFamily="medium">Gender</CustomText>
                <View style={styles.genderRow}>
                  {genderTypes.map((gender) => {
                    const renderGenderIcon = () => {
                      if (gender === "Male") {
                        return ICONS.maleIcon;
                      }
                      if (gender === "Female") {
                        return ICONS.femaleIcon;
                      } else {
                        return ICONS.otherIcon;
                      }
                    };

                    const isSelected = gender === selectedGender;

                    return (
                      <Pressable
                        style={[
                          styles.genderOption,
                          isSelected && styles.selectedGenderOption,
                        ]}
                        onPress={() => setSelectedGender(gender)}
                      >
                        <CustomIcon
                          Icon={renderGenderIcon()}
                          width={20}
                          height={20}
                        />
                        <CustomText>{gender}</CustomText>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            </View>

            <CustomButton
              title="Save"
              onPress={handleUpdateProfile}
              style={styles.btn}
              isLoading={isLoading}
              disabled={!hasChanges}
            />
          </>
        )}
      </SafeAreaView>
    </KeyboardAvoidingContainer>
  );
};

export default MyAccount;
