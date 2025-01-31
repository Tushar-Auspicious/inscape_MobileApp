import React, { FC } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import ICONS from "../../Assets/icons";
import IMAGES from "../../Assets/images";
import CustomIcon from "../../Components/CustomIcon";
import { CustomText } from "../../Components/CustomText";
import { PlayerListProps } from "../../Typings/route";
import COLORS from "../../Utilities/Colors";
import { hp } from "../../Utilities/Metrics";
import styles from "./style";
import { getGreeting } from "../../Utilities/Helpers";

const PlayerList: FC<PlayerListProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const handleGoToPLayer = () => {
    navigation.navigate("player", {
      img: "https://s3-alpha-sig.figma.com/img/a4a0/2628/cabd302ddee9cc5565d23c4c13f71025?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Au~eVSsLWRALf3h90BUuA-omOYOwLSip-CIgk8WmzeXMJGkQcUPjtA-6EH4z4iPrKyeZVNJ9VWtGky4Bacsf4i-7~a3WzaPIzgBedgUmbD7jCxU2dJG4LytdSDiqaqlLSGSW1sxHfygsTLlq3czuW4XJKYbFpswyS6MSOSBMrKkeuW6gYSm5MgGGR4plMNPo8kyWITaUk9d3x-mYyGifcN2UtpnKtXoqk947dmXFctLh3P53ChTnkDa4ubSXsAdH~AxHebS317skrOvCmDXD1YSKhAQaj3VP-LkViHp8w505tPUldbJ~-zbtIA9nOUMV2xyKbYvSdvUrUG~P5yL~9g__",
      artist: "juice world",
      title: "Lucid Dreams",
    });
  };

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={[styles.container, { paddingBottom: insets.bottom }]}
    >
      <View
        style={[
          styles.curvedCont,
          {
            bottom: Platform.OS === "ios" ? hp(15) : hp(12),
          },
        ]}
      >
        <Image
          source={IMAGES.curvedView}
          style={styles.topCurvedImage}
          resizeMode="contain"
        />

        <Image
          source={IMAGES.curvedView}
          style={styles.bottomCurvedImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.content}>
        <View style={styles.mainHeader}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <CustomIcon Icon={ICONS.BackArrow} height={12} width={12} />
          </TouchableOpacity>

          <View style={styles.headerTextCont}>
            <CustomText type="subHeading">{getGreeting()}</CustomText>

            <CustomText>
              We want to acquaint you with the most effective mantras and you
              will choose the ones that like best
            </CustomText>
          </View>
        </View>

        <View>
          <FlatList
            data={Array.from({ length: 10 })}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <View
                  style={[
                    styles.listCard,
                    {
                      height: hp(Platform.OS === "ios" ? 50 : 60),
                    },
                  ]}
                >
                  <ImageBackground
                    source={IMAGES.pinkBg}
                    style={styles.cardImage}
                    imageStyle={styles.cardImageStyle}
                  >
                    <View style={styles.cardContent}>
                      <Image
                        source={IMAGES.curvedView}
                        style={styles.cardContentImage}
                        resizeMode="contain"
                      />
                      <View style={styles.cardTextCont}>
                        <CustomText type="subTitle" color={COLORS.darkPink}>
                          Universal Mantras
                        </CustomText>
                        <CustomText type="small" color={COLORS.darkPink}>
                          7 mantras for your for happy life balance
                        </CustomText>
                      </View>
                      <TouchableOpacity
                        onPress={handleGoToPLayer}
                        style={styles.cardPlayButton}
                      >
                        <CustomIcon
                          Icon={ICONS.playIcon}
                          height={14}
                          width={14}
                        />
                      </TouchableOpacity>
                    </View>
                  </ImageBackground>
                </View>
              );
            }}
          />
        </View>

        <View style={styles.footerCont}>
          <View style={styles.footerContent}>
            <View style={styles.footerLeftCont}>
              <Image source={IMAGES.pinkBg} style={styles.footerLeftImage} />
              <CustomText>Cracking Fire</CustomText>
            </View>

            <View style={styles.footerRight}>
              <CustomIcon
                Icon={ICONS.playPreviousIcon}
                height={15}
                width={15}
              />
              <CustomIcon Icon={ICONS.playIcon} height={20} width={20} />
              <CustomIcon Icon={ICONS.playNextIcon} height={15} width={15} />
            </View>
          </View>

          <View style={styles.footerProgressBar}>
            <View
              style={[
                styles.footerProgressComplete,
                {
                  width: "60%",
                },
              ]}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PlayerList;
