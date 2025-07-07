import React, { FC } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ICONS from "../../Assets/icons";
import CustomIcon from "../../Components/CustomIcon";
import { CustomText } from "../../Components/CustomText";
import { SettingsPrivacyPolicyProps } from "../../Typings/route";
import COLORS from "../../Utilities/Colors";
import { verticalScale, wp } from "../../Utilities/Metrics";
import styles from "./style";
import { useAppSelector } from "../../Redux/store";
import RenderHTML from "react-native-render-html";

const SettingsPrivacyPolicy: FC<SettingsPrivacyPolicyProps> = ({
  navigation,
}) => {

  const { privacyPolicy} = useAppSelector(state => state.setting)

console.log(privacyPolicy);


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <CustomText type="title" fontFamily="bold">
          Privacy Policy
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
      <ScrollView contentContainerStyle={{ paddingBottom: verticalScale(10) }}>
        <RenderHTML contentWidth={wp(90)} source={{ html: privacyPolicy! ,}} baseStyle={{color: "white"}} />
        
        {/* <CustomText fontFamily="regular" type="title" color={COLORS.white}>
          1. Introduction
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="small"
          color={COLORS.white}
          style={{ marginTop: 15, lineHeight: 16.5 }}
        >
          This Privacy Policy outlines how Inscape ("the Company") collects,
          uses, discloses, and protects the personal information of users of the
          Sawtiyat application ("the App"). By using the App, you consent to the
          collection and use of your personal information as described in this
          Privacy Policy.
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="title"
          color={COLORS.white}
          style={{ marginTop: 25 }}
        >
          2. Information We Collect
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="small"
          color={COLORS.white}
          style={{ marginTop: 15, lineHeight: 16.5 }}
        >
          Email address: We collect your email address to create and manage your
          account, send you important notifications about your account, and
          communicate with you regarding the App.
          {"\n\n"}
          Password: We collect your chosen password to secure your account and
          authenticate your identity when you log in to the App.
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="title"
          color={COLORS.white}
          style={{ marginTop: 25 }}
        >
          3. How We Use Your Information
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="small"
          color={COLORS.white}
          style={{ marginTop: 15, lineHeight: 16.5, textAlign: "justify" }}
        >
          To create and manage your account.
          {"\n"}
          To provide you with access to the features and functionalities of the
          App.
          {"\n"}
          To communicate with you about your account, updates to the App, and
          promotional offers.
          {"\n"}
          To personalize your experience with the App and provide tailored
          content and recommendations.
          {"\n"}
          To improve the quality and usability of the App and develop new
          features and functionalities.
          {"\n"}
          To comply with legal obligations and enforce our Terms and Conditions.
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="title"
          color={COLORS.white}
          style={{ marginTop: 25 }}
        >
          4. Information Sharing and Disclosure
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="small"
          color={COLORS.white}
          style={{ marginTop: 15, lineHeight: 16.5 }}
        >
          With service providers: We may share your information with third-party
          service providers who assist us in operating the App, processing
          payments, and delivering services to you.
          {"\n\n"}
          With affiliates: We may share your information with our affiliated
          companies for marketing and promotional purposes, but we will not
          share your information with third-party advertisers without your
          consent.
          {"\n\n"}
          With legal authorities: We may disclose your information to comply
          with legal obligations, respond to lawful requests from law
          enforcement agencies, or protect the rights, property, or safety of
          our users or others.
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="title"
          color={COLORS.white}
          style={{ marginTop: 25 }}
        >
          5. Data Security
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="small"
          color={COLORS.white}
          style={{ marginTop: 15, lineHeight: 16.5 }}
        >
          We implement appropriate technical and organizational measures to
          protect your personal information against unauthorized access,
          disclosure, alteration, or destruction. However, no method of
          transmission over the internet or electronic storage is 100% secure,
          and we cannot guarantee the absolute security of your information.
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="title"
          color={COLORS.white}
          style={{ marginTop: 25 }}
        >
          Privacy Policy
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="small"
          color={COLORS.white}
          style={{ marginTop: 15, lineHeight: 16.5 }}
        >
          INSCAPE, ("the Company"), respects the privacy rights of our users and
          is committed to protecting the information collected through its
          online products, online services and websites including, but not
          limited to INSCAPE’s mobile app (together “Services”). INSCAPE has
          adopted this privacy policy (“Privacy Policy”) to explain how INSCAPE
          collects, stores, and uses the information collected in connection
          with INSCAPE’s Services. By installing, using, registering to or
          otherwise accessing the services, you agree to this privacy policy and
          give explicit and informed consent to the processing of your personal
          data in accordance with this privacy policy. if you do not agree to
          this privacy policy, please do not install, use, register to or
          otherwise access the services. INSCAPE reserves the right to modify
          this Privacy Policy at reasonable times, so please review it
          frequently. If INSCAPE makes material or significant changes to this
          Privacy Policy, INSCAPE may post a notice on INSCAPE’s website along
          with the updated Privacy Policy.  Your continued use of Services will
          signify your acceptance of the changes to this Privacy Policy.
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="title"
          color={COLORS.white}
          style={{ marginTop: 25 }}
        >
          Non-personal data
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="small"
          color={COLORS.white}
          style={{ marginTop: 15, lineHeight: 16.5 }}
        >
          For purposes of this Privacy Policy, “non-personal data” means
          information that does not directly identify you. Additionally,
          non-personal data means “aggregate” and “de-personalized” information,
          which is data INSCAPE collects about the use of INSCAPE Services, from
          which any personally identifiable data has been removed.
          {"\n"}
          INSCAPE may use tools or third-party analytical software to
          automatically collect and use certain non-personal data that does not
          directly enable INSCAPE to identify you. The types of non-personal
          data INSCAPE may collect and use include but are not limited to: (i)
          device properties, including, but not limited to unique device
          identifier or other device identifier (“UDID”); (ii) device software
          platform and firmware; (iii) mobile phone carrier; (iv) geographical
          data such as zip code, area code and location; (v) game score and
          achievements; (vi) other non-personal data as reasonably required by
          INSCAPE to enhance the Services and other INSCAPE products and
          services.
          {"\n"}
          INSCAPE may use and disclose to INSCAPE’s partners and contractors the
          collected non-personal data for purposes of analyzing usage of the
          Services, advertisement serving, managing and providing the Services
          and to further develop the Services and other INSCAPE services and
          products.
          {"\n"}
          You recognize and agree that the analytics companies utilized by
          INSCAPE may combine the information collected with other information
          they have independently collected from other services or products
          relating to your activities. These companies collect and use
          information under their own privacy policies.
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="title"
          color={COLORS.white}
          style={{ marginTop: 15 }}
        >
          Ad Serving Technology
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="small"
          color={COLORS.white}
          style={{ marginTop: 15, lineHeight: 16.5 }}
        >
          INSCAPE reserves the right to use and disclose the collected
          non-personal data for purposes of advertisement by INSCAPE or
          INSCAPE’s partners and contractors. INSCAPE may employ third-party
          ad-serving technologies that use certain methods to collect
          information as a result of ad-serving through Services. INSCAPE or
          third parties operating the ad-serving technology may use demographic
          and location information as well as information logged from your
          hardware or device to ensure that appropriate advertising is presented
          within the Service. INSCAPE or third parties may collect and use data
          for this purpose including, but not limited to IP address (including
          for purposes of determining your approximate geographic location),
          UDID, software, applications, hardware, browser information, internet
          and on-line usage information and in-game information. The foregoing
          data may be used and disclosed in accordance with this Privacy Policy
          and the privacy policy of the company providing the ad-serving
          technology. You recognize and agree that the advertising companies who
          deliver ads for INSCAPE may combine the information collected with
          other information they have independently collected from other
          services or products. These companies collect and use information
          under their own privacy policies. These ad-serving technologies are
          integrated into Services; if you do not want to be subject to this
          technology, do not use or access Services. Although INSCAPE takes
          commercially reasonable steps to instruct such advertising companies
          to comply with the terms and conditions of this Privacy Policy,
          INSCAPE does not have access to or control of third-party
          technologies.
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="title"
          color={COLORS.white}
          style={{ marginTop: 15 }}
        >
          Personal Data
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="small"
          color={COLORS.white}
          style={{ marginTop: 15, lineHeight: 16.5 }}
        >
          For purposes of this Privacy Policy, “personal data” means personally
          identifiable information that specifically identifies you as an
          individual.
          {"\n"}
          Likely situations when you make personal data available to INSCAPE
          include, but are not limited to: (i) registration for Services,
          contests and special events; (ii) accessing Services using a third
          party ID, such as social networking sites or gaming services; (iii)
          subscribing to newsletters; (iv) purchasing a product or services
          through INSCAPE’s online stores; (v) using “tell a friend,” “email
          this page,” or other similar features; (vi) requesting technical
          support; and (vii) otherwise through use of INSCAPE Services where
          personal data is required for use and/or participation.
          {"\n"}
          The types of personal data may vary depending on the type of activity
          you are engaged in. The personal data INSCAPE may collect, process and
          use may include, but are not limited to your name, screen/nick name,
          INSCAPE Services’ or third-party service ID, e-mail address, phone
          number, photo or other image, birthdate, sex, address, friend
          connections, avatar image, credit card information, shipping
          information; and location (only if directly identifiable to you,
          otherwise INSCAPE treats location as non-personal data).
          {"\n"}
          If you choose to use INSCAPE’s “tell a friend” or a similar service
          about INSCAPE Services or order a gift certificate for your friend,
          INSCAPE will store your friend’s name and contact details that you
          provide to INSCAPE.
          {"\n"}
          INSCAPE may use collected personal data for purposes of analyzing
          usage of the Services, providing customer and technical support,
          managing and providing Services (including managing advertisement
          serving) and to further develop the Services and other INSCAPE
          services and products. INSCAPE may combine non-personal data with
          personal data. INSCAPE may use your personal data to send messages to
          you with informative and/or commercial content about INSCAPE’s
          services or third party products and services INSCAPE thinks may be of
          interest to you, such as new features and services, special offers and
          updated information.
          {"\n"}
          Please note that certain features of the Services may be able to
          connect to your social networking sites to obtain additional
          information about you.  In such cases, INSCAPE may be able to collect
          certain information from your social networking profile when your
          social networking site permits it, and when you consent to allow your
          social networking site to make that information available to INSCAPE. 
          This information may include, but is not limited to, your name,
          profile picture, gender, user ID, email address, your country, your
          language, your time zone, the organizations and links on your profile
          page, the names and profile pictures of your social networking site
          “friends” and other information you have included in your social
          networking site profile. INSCAPE may associate and/or combine as well
          as use information collected by INSCAPE and/or obtained through such
          social networking sites in accordance with this Privacy Policy.
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="title"
          color={COLORS.white}
          style={{ marginTop: 15 }}
        >
          Disclosure and Transfer of Personal Data
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="small"
          color={COLORS.white}
          style={{ marginTop: 15, lineHeight: 16.5 }}
        >
          INSCAPE collects and processes personal data on a voluntary basis and
          it is not in the business of selling your personal data to third
          parties. Personal data may, however, occasionally be disclosed in
          accordance with applicable legislation and this Privacy Policy.
          Additionally, INSCAPE may disclose personal data to its parent
          companies and its subsidiaries in accordance with this Privacy Policy.
          {"\n"}
          INSCAPE may hire agents and contractors to collect and process
          personal data on INSCAPE’s behalf and in such cases such agents and
          contractors will be instructed to comply with our Privacy Policy and
          to use personal data only for the purposes for which the third party
          has been engaged by INSCAPE. These agents and contractors may not use
          your personal data for their own marketing purposes. INSCAPE may use
          third party service providers such as credit card processors, e-mail
          service providers, shipping agents, data analyzers and business
          intelligence providers. INSCAPE has the right to share your personal
          data as necessary for the aforementioned third parties to provide
          their services for INSCAPE. INSCAPE is not liable for the acts and
          omissions of these third parties, except as provided by mandatory law.
          {"\n"}
          INSCAPE may disclose your personal data to third parties as required
          by law enforcement or other government officials in connection with an
          investigation of fraud, intellectual property infringements, or other
          activity that is illegal or may expose you or INSCAPE to legal
          liability. INSCAPE may also disclose your personal data to third
          parties when INSCAPE has a reason to believe that a disclosure is
          necessary to address potential or actual injury or interference with
          INSCAPE’s rights, property, operations, users or others who may be
          harmed or may suffer loss or damage, or INSCAPE believes that such
          disclosure is necessary to protect INSCAPE’s rights, combat fraud
          and/or comply with a judicial proceeding, court order, or legal
          process served on INSCAPE.
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="title"
          color={COLORS.white}
          style={{ marginTop: 15 }}
        >
          Data Retention and Correctness
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="small"
          color={COLORS.white}
          style={{ marginTop: 15, lineHeight: 16.5 }}
        >
          INSCAPE retains the data collected pursuant to this Privacy Policy for
          the period necessary to fulfill the purposes outlined in this Privacy
          Policy unless a longer retention period is required or permitted by
          law. Thereafter if the collected data is no longer needed for purposes
          specified in this Privacy Policy, INSCAPE deletes all aforementioned
          data in its possession. INSCAPE does not verify the correctness of
          personal data.
          {"\n"}
          Even if data is changed or deleted, INSCAPE may still retain some of
          the data to resolve disputes, enforce INSCAPE user agreements, and
          comply with technical and legal requirements and constraints related
          to the security, integrity and operation of Services.
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="title"
          color={COLORS.white}
          style={{ marginTop: 15 }}
        >
          Cookies, beacons and tracking
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="small"
          color={COLORS.white}
          style={{ marginTop: 15, lineHeight: 16.5 }}
        >
          The Services may use “cookies” and other technologies such as pixel
          tags, clear GIFs and web beacons. INSCAPE treats information collected
          by cookies and similar technologies as non-personal data.
          {"\n"}
          E-mails and other electronic communications INSCAPE sends to you may
          contain code that enables INSCAPE to track your usage of the
          communication, including whether the communication was opened and/or
          what links were followed (if any). INSCAPE may combine that
          information to other information INSCAPE has about you and INSCAPE may
          use that information to improve the Services and/or provide customized
          communications to you. If you’d like to unsubscribe from receiving
          emails, then please contact us.
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="title"
          color={COLORS.white}
          style={{ marginTop: 15 }}
        >
          Third Party Terms and Conditions
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="small"
          color={COLORS.white}
          style={{ marginTop: 15, lineHeight: 16.5 }}
        >
          Please note that your access to and use of the Services may be subject
          to certain third party terms and conditions and privacy policies,
          including but not limited to application stores, mobile software
          platforms, on-line gaming platforms, social networking services and
          payment providers. You recognize and agree that INSCAPE is not liable
          for any such third party terms and conditions and their use of your
          personal data.
          {"\n"}
          INSCAPE may in its discretion make available links through
          advertisements or otherwise enable you to access third party products
          or services. Please note that, while using such products or services,
          you are using products or services developed and administered by
          people or companies not affiliated with or controlled by INSCAPE.
          INSCAPE is not responsible for the actions of those people or
          companies, the content of their products or services, the use of
          information you provide to them, or any products or services they may
          offer. The fact that INSCAPE is linking to those products or services
          does not constitute our sponsorship of, or affiliation with, those
          people or companies.
          {"\n"}
          Please note that certain Services that INSCAPE may offer, such as
          multiplayer gaming, social networking and gaming console services, may
          use third party services to provide authentication for the Services
          with a gaming console ID, social networking ID or gaming network
          account. When you register to join or use the Services from a
          third-party gaming or social networking system, certain personally
          identifiable user and/or membership data may be transferred
          automatically to and from INSCAPE and you hereby consent to the
          processing, using, combining, disclosing and retaining of such data in
          accordance with this Privacy Policy by INSCAPE.
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="title"
          color={COLORS.white}
          style={{ marginTop: 15 }}
        >
          Safeguards
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="small"
          color={COLORS.white}
          style={{ marginTop: 15, lineHeight: 16.5 }}
        >
          INSCAPE follows generally accepted industry standards and maintains
          reasonable safeguards to attempt to ensure the security, integrity and
          privacy of the information in INSCAPE’s possession. Only those persons
          with a need to process your personal data in connection with the
          fulfillment of their tasks in accordance with the purposes of this
          Privacy Policy and for the purposes of performing technical
          maintenance, have access to your personal data in INSCAPE’s
          possession. Personal data collected by INSCAPE is stored in secure
          operating environments that are not available to the public. To
          prevent unauthorized on-line access to personal data, INSCAPE
          maintains personal data behind a firewall-protected server. However,
          no system can be 100% secure and there is the possibility that despite
          INSCAPE’s reasonable efforts, there could be unauthorized access to
          your personal data. By using the Services, you assume this risk.
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="title"
          color={COLORS.white}
          style={{ marginTop: 15 }}
        >
          Other
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="small"
          color={COLORS.white}
          style={{ marginTop: 15, lineHeight: 16.5 }}
        >
          Please be aware of the open nature of certain social networking and
          other open features of the Services INSCAPE may make available to you.
          You may choose to disclose data about yourself in the course of
          contributing user generated content to the Services. Any data that you
          disclose in any of these forums, blogs, chats or the like is public
          information, and there is no expectation of privacy or
          confidentiality. INSCAPE is not responsible for any personal data you
          choose to make public in any of these forums.
          {"\n"}
          If you are under 18 years of age or a minor in your country of
          residence, please ask your legal guardian’s permission to use or
          access the Services. INSCAPE takes children’s privacy seriously, and
          encourages parents and/or guardians to play an active role in their
          children’s online experience at all times. INSCAPE does not knowingly
          collect any personal information from children below the
          aforementioned age and if INSCAPE learns that INSCAPE has
          inadvertently gathered personal data from children under the
          aforementioned age, INSCAPE will take reasonable measures to promptly
          erase such personal data from INSCAPE’s records. INSCAPE may store
          and/or transfer your personal data to its affiliates and partners in
          and outside of EU/EEA member states and the United States in
          accordance with mandatory legislation and this Privacy Policy. INSCAPE
          may disclose your personal data to third parties in connection with a
          corporate merger, consolidation, restructuring, the sale of
          substantially all of INSCAPE’s stock and/or assets or other corporate
          change, including, without limitation, during the course of any due
          diligence process provided, however, that this Privacy Policy shall
          continue to govern such personal data.
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="title"
          color={COLORS.white}
          style={{ marginTop: 15 }}
        >
          Further information
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="small"
          color={COLORS.white}
          style={{ marginTop: 15, lineHeight: 16.5 }}
        >
          INSCAPE makes good faith efforts to enable you to review, update,
          correct or delete your personal data in INSCAPE’s possession. In order
          to do so, please contact INSCAPE via email. INSCAPE will need
          sufficient information from you to establish your identity and to
          verify your access request, and also to assist us in handling your
          request.  Requests will be processed as soon as possible. Please note
          that even if personal data is changed or deleted according to your
          request, INSCAPE may still retain some of your personal data to
          resolve disputes, enforce INSCAPE user agreement(s), and comply with
          technical and legal requirements and constraints related to the
          security, integrity and operation of INSCAPE Services.
          {"\n"}
          INSCAPE regularly reviews its compliance with this Privacy Policy. If
          INSCAPE receives a formal written complaint from you, it is INSCAPE’s
          policy to attempt to contact you directly to address any of your
          concerns. INSCAPE will cooperate with the appropriate governmental
          authorities, including data protection authorities, to resolve any
          complaints regarding the collection, use, transfer or disclosure of
          personal data that cannot be amicably resolved between you and
          INSCAPE.
        </CustomText> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsPrivacyPolicy;
