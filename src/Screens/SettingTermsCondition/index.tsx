// utils/generateTagStyles.ts
import { parseDocument } from "htmlparser2";
import { Element } from "domhandler";
import React, { FC, useMemo } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import RenderHTML from "react-native-render-html";
import { SafeAreaView } from "react-native-safe-area-context";
import ICONS from "../../Assets/icons";
import CustomIcon from "../../Components/CustomIcon";
import { CustomText } from "../../Components/CustomText";
import { useAppSelector } from "../../Redux/store";
import { SettingsTermsAndConditionProps } from "../../Typings/route";
import { wp } from "../../Utilities/Metrics";
import styles from "./style";

type TagStyleMap = {
  [tag: string]: {
    [styleKey: string]: any;
  };
};

const cssToReactNative: { [key: string]: string } = {
  "font-size": "fontSize",
  "text-align": "textAlign",
  color: "color",
  "font-weight": "fontWeight",
  "font-style": "fontStyle",
  "text-decoration": "textDecorationLine",
  "margin-bottom": "marginBottom",
  "padding-left": "paddingLeft",
};

function parseStyleAttribute(styleString: string): Record<string, any> {
  const styles: Record<string, any> = {};
  styleString.split(";").forEach((style) => {
    const [rawKey, rawValue] = style.split(":");
    if (!rawKey || !rawValue) return;

    const key = rawKey.trim();
    const value = rawValue.trim();
    const rnKey = cssToReactNative[key];

    if (rnKey) {
      if (value.endsWith("px")) {
        styles[rnKey] = parseInt(value.replace("px", ""), 10);
      } else {
        styles[rnKey] = value;
      }
    }
  });

  return styles;
}

export function generateTagStylesFromHTML(html: string): TagStyleMap {
  const document = parseDocument(html);
  const tagStyles: TagStyleMap = {};

  function traverse(node: any) {
    if (node.type === "tag") {
      const tagName = node.name;
      const styleAttr = node.attribs?.style;

      if (styleAttr) {
        const parsedStyles = parseStyleAttribute(styleAttr);
        tagStyles[tagName] = {
          ...(tagStyles[tagName] || {}),
          ...parsedStyles,
        };
      }

      if (node.children) {
        node.children.forEach(traverse);
      }
    }
  }

  document.children.forEach(traverse);
  return tagStyles;
}

const SettingTermsCondition: FC<SettingsTermsAndConditionProps> = ({
  navigation,
}) => {
  const { termsAndConditions } = useAppSelector((state) => state.setting);

  const dynamicTagStyles = useMemo(() => {
    if (termsAndConditions) {
      return generateTagStylesFromHTML(termsAndConditions);
    }
    return {};
  }, [termsAndConditions]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <CustomText type="title" fontFamily="bold">
          Terms and conditions
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

      <ScrollView>
        <RenderHTML
          contentWidth={wp(90)}
          source={{ html: termsAndConditions! }}
          tagsStyles={{
            ...dynamicTagStyles,
            h1: {
              ...dynamicTagStyles.h1,
              fontSize: 24, 
              marginBottom:10
            },
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingTermsCondition;
