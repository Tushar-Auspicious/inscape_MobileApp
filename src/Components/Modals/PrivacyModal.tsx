import React, { FC } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import ICONS from "../../Assets/icons";
import COLORS from "../../Utilities/Colors";
import {
  horizontalScale,
  hp,
  verticalScale,
  wp,
} from "../../Utilities/Metrics";
import CustomButton from "../Buttons/CustomButton";
import CustomIcon from "../CustomIcon";
import { CustomText } from "../CustomText";

type PrivacyModalProps = {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
  onAgree: () => void;
  activeIndex: "privacy" | "terms";
};

const modalData = [
  {
    title: "Privacy Policy",
    content:
      "Your privacy is important to us. Our meditation app collects only necessary data, such as your name, email, and usage patterns, to provide a personalized experience. We do not sell or share your information with third parties without your consent. All data is securely stored and protected using industry-standard measures. You may update or delete your information at any time. The app may use cookies or analytics to improve functionality but ensures anonymity. By using the app, you agree to this policy. For questions or concerns, please contact our support team. Your mindfulness journey is",
  },
  {
    title: "Terms of Use",
    content:
      "Welcome to our meditation app! By accessing or using the app, you agree to these Terms of Use. This app is for personal, non-commercial use only. Content, including meditations and features, is protected by copyright laws and must not be copied or redistributed. Users must be 13 years or older or have parental consent. The app is provided “as is,” and we are not liable for any damages arising from its use. We may update these terms anytime, so please review regularly. If you disagree with these terms, discontinue use immediately. Your continued use indicates acceptance of the",
  },
];

const PrivacyModal: FC<PrivacyModalProps> = ({
  isVisible,
  setIsVisible,
  onAgree,
  activeIndex,
}) => {
  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const activeModalData =
    activeIndex === "privacy" ? modalData[0] : modalData[1];

  return (
    <Modal isVisible={isVisible} onBackdropPress={toggleModal}>
      <View style={styles.modalContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <CustomText
            style={styles.heading}
            type="subHeading"
            color={COLORS.navyBlue}
            fontFamily="bold"
          >
            {activeModalData.title}
          </CustomText>
          <TouchableOpacity
            activeOpacity={1}
            onPress={toggleModal}
            style={styles.closeButton}
          >
            <CustomIcon
              Icon={ICONS.crossIcon}
              height={verticalScale(30)}
              width={verticalScale(30)}
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={{
            paddingVertical: verticalScale(10),
          }}
          style={{
            marginVertical: verticalScale(10),
          }}
        >
          {activeIndex === "privacy" ? (
            <>
              <CustomText
                fontFamily="regular"
                type="title"
                color={COLORS.darkGrey}
              >
                1. Introduction
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="small"
                color={COLORS.darkGrey}
                style={{ marginTop: 15, lineHeight: 16.5 }}
              >
                This Privacy Policy outlines how Inscape ("the Company")
                collects, uses, discloses, and protects the personal information
                of users of the Sawtiyat application ("the App"). By using the
                App, you consent to the collection and use of your personal
                information as described in this Privacy Policy.
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="title"
                color={COLORS.darkGrey}
                style={{ marginTop: 25 }}
              >
                2. Information We Collect
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="small"
                color={COLORS.darkGrey}
                style={{ marginTop: 15, lineHeight: 16.5 }}
              >
                Email address: We collect your email address to create and
                manage your account, send you important notifications about your
                account, and communicate with you regarding the App.
                {"\n\n"}
                Password: We collect your chosen password to secure your account
                and authenticate your identity when you log in to the App.
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="title"
                color={COLORS.darkGrey}
                style={{ marginTop: 25 }}
              >
                3. How We Use Your Information
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="small"
                color={COLORS.darkGrey}
                style={{
                  marginTop: 15,
                  lineHeight: 16.5,
                  textAlign: "justify",
                }}
              >
                To create and manage your account.
                {"\n"}
                To provide you with access to the features and functionalities
                of the App.
                {"\n"}
                To communicate with you about your account, updates to the App,
                and promotional offers.
                {"\n"}
                To personalize your experience with the App and provide tailored
                content and recommendations.
                {"\n"}
                To improve the quality and usability of the App and develop new
                features and functionalities.
                {"\n"}
                To comply with legal obligations and enforce our Terms and
                Conditions.
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="title"
                color={COLORS.darkGrey}
                style={{ marginTop: 25 }}
              >
                4. Information Sharing and Disclosure
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="small"
                color={COLORS.darkGrey}
                style={{ marginTop: 15, lineHeight: 16.5 }}
              >
                With service providers: We may share your information with
                third-party service providers who assist us in operating the
                App, processing payments, and delivering services to you.
                {"\n\n"}
                With affiliates: We may share your information with our
                affiliated companies for marketing and promotional purposes, but
                we will not share your information with third-party advertisers
                without your consent.
                {"\n\n"}
                With legal authorities: We may disclose your information to
                comply with legal obligations, respond to lawful requests from
                law enforcement agencies, or protect the rights, property, or
                safety of our users or others.
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="title"
                color={COLORS.darkGrey}
                style={{ marginTop: 25 }}
              >
                5. Data Security
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="small"
                color={COLORS.darkGrey}
                style={{ marginTop: 15, lineHeight: 16.5 }}
              >
                We implement appropriate technical and organizational measures
                to protect your personal information against unauthorized
                access, disclosure, alteration, or destruction. However, no
                method of transmission over the internet or electronic storage
                is 100% secure, and we cannot guarantee the absolute security of
                your information.
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="title"
                color={COLORS.darkGrey}
                style={{ marginTop: 25 }}
              >
                Privacy Policy
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="small"
                color={COLORS.darkGrey}
                style={{ marginTop: 15, lineHeight: 16.5 }}
              >
                INSCAPE, ("the Company"), respects the privacy rights of our
                users and is committed to protecting the information collected
                through its online products, online services and websites
                including, but not limited to INSCAPE’s mobile app (together
                “Services”). INSCAPE has adopted this privacy policy (“Privacy
                Policy”) to explain how INSCAPE collects, stores, and uses the
                information collected in connection with INSCAPE’s Services. By
                installing, using, registering to or otherwise accessing the
                services, you agree to this privacy policy and give explicit and
                informed consent to the processing of your personal data in
                accordance with this privacy policy. if you do not agree to this
                privacy policy, please do not install, use, register to or
                otherwise access the services. INSCAPE reserves the right to
                modify this Privacy Policy at reasonable times, so please review
                it frequently. If INSCAPE makes material or significant changes
                to this Privacy Policy, INSCAPE may post a notice on INSCAPE’s
                website along with the updated Privacy Policy.  Your continued
                use of Services will signify your acceptance of the changes to
                this Privacy Policy.
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="title"
                color={COLORS.darkGrey}
                style={{ marginTop: 25 }}
              >
                Non-personal data
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="small"
                color={COLORS.darkGrey}
                style={{ marginTop: 15, lineHeight: 16.5 }}
              >
                For purposes of this Privacy Policy, “non-personal data” means
                information that does not directly identify you. Additionally,
                non-personal data means “aggregate” and “de-personalized”
                information, which is data INSCAPE collects about the use of
                INSCAPE Services, from which any personally identifiable data
                has been removed.
                {"\n"}
                INSCAPE may use tools or third-party analytical software to
                automatically collect and use certain non-personal data that
                does not directly enable INSCAPE to identify you. The types of
                non-personal data INSCAPE may collect and use include but are
                not limited to: (i) device properties, including, but not
                limited to unique device identifier or other device identifier
                (“UDID”); (ii) device software platform and firmware; (iii)
                mobile phone carrier; (iv) geographical data such as zip code,
                area code and location; (v) game score and achievements; (vi)
                other non-personal data as reasonably required by INSCAPE to
                enhance the Services and other INSCAPE products and services.
                {"\n"}
                INSCAPE may use and disclose to INSCAPE’s partners and
                contractors the collected non-personal data for purposes of
                analyzing usage of the Services, advertisement serving, managing
                and providing the Services and to further develop the Services
                and other INSCAPE services and products.
                {"\n"}
                You recognize and agree that the analytics companies utilized by
                INSCAPE may combine the information collected with other
                information they have independently collected from other
                services or products relating to your activities. These
                companies collect and use information under their own privacy
                policies.
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="title"
                color={COLORS.darkGrey}
                style={{ marginTop: 15 }}
              >
                Ad Serving Technology
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="small"
                color={COLORS.darkGrey}
                style={{ marginTop: 15, lineHeight: 16.5 }}
              >
                INSCAPE reserves the right to use and disclose the collected
                non-personal data for purposes of advertisement by INSCAPE or
                INSCAPE’s partners and contractors. INSCAPE may employ
                third-party ad-serving technologies that use certain methods to
                collect information as a result of ad-serving through Services.
                INSCAPE or third parties operating the ad-serving technology may
                use demographic and location information as well as information
                logged from your hardware or device to ensure that appropriate
                advertising is presented within the Service. INSCAPE or third
                parties may collect and use data for this purpose including, but
                not limited to IP address (including for purposes of determining
                your approximate geographic location), UDID, software,
                applications, hardware, browser information, internet and
                on-line usage information and in-game information. The foregoing
                data may be used and disclosed in accordance with this Privacy
                Policy and the privacy policy of the company providing the
                ad-serving technology. You recognize and agree that the
                advertising companies who deliver ads for INSCAPE may combine
                the information collected with other information they have
                independently collected from other services or products. These
                companies collect and use information under their own privacy
                policies. These ad-serving technologies are integrated into
                Services; if you do not want to be subject to this technology,
                do not use or access Services. Although INSCAPE takes
                commercially reasonable steps to instruct such advertising
                companies to comply with the terms and conditions of this
                Privacy Policy, INSCAPE does not have access to or control of
                third-party technologies.
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="title"
                color={COLORS.darkGrey}
                style={{ marginTop: 15 }}
              >
                Personal Data
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="small"
                color={COLORS.darkGrey}
                style={{ marginTop: 15, lineHeight: 16.5 }}
              >
                For purposes of this Privacy Policy, “personal data” means
                personally identifiable information that specifically identifies
                you as an individual.
                {"\n"}
                Likely situations when you make personal data available to
                INSCAPE include, but are not limited to: (i) registration for
                Services, contests and special events; (ii) accessing Services
                using a third party ID, such as social networking sites or
                gaming services; (iii) subscribing to newsletters; (iv)
                purchasing a product or services through INSCAPE’s online
                stores; (v) using “tell a friend,” “email this page,” or other
                similar features; (vi) requesting technical support; and (vii)
                otherwise through use of INSCAPE Services where personal data is
                required for use and/or participation.
                {"\n"}
                The types of personal data may vary depending on the type of
                activity you are engaged in. The personal data INSCAPE may
                collect, process and use may include, but are not limited to
                your name, screen/nick name, INSCAPE Services’ or third-party
                service ID, e-mail address, phone number, photo or other image,
                birthdate, sex, address, friend connections, avatar image,
                credit card information, shipping information; and location
                (only if directly identifiable to you, otherwise INSCAPE treats
                location as non-personal data).
                {"\n"}
                If you choose to use INSCAPE’s “tell a friend” or a similar
                service about INSCAPE Services or order a gift certificate for
                your friend, INSCAPE will store your friend’s name and contact
                details that you provide to INSCAPE.
                {"\n"}
                INSCAPE may use collected personal data for purposes of
                analyzing usage of the Services, providing customer and
                technical support, managing and providing Services (including
                managing advertisement serving) and to further develop the
                Services and other INSCAPE services and products. INSCAPE may
                combine non-personal data with personal data. INSCAPE may use
                your personal data to send messages to you with informative
                and/or commercial content about INSCAPE’s services or third
                party products and services INSCAPE thinks may be of interest to
                you, such as new features and services, special offers and
                updated information.
                {"\n"}
                Please note that certain features of the Services may be able to
                connect to your social networking sites to obtain additional
                information about you.  In such cases, INSCAPE may be able to
                collect certain information from your social networking profile
                when your social networking site permits it, and when you
                consent to allow your social networking site to make that
                information available to INSCAPE.  This information may include,
                but is not limited to, your name, profile picture, gender, user
                ID, email address, your country, your language, your time zone,
                the organizations and links on your profile page, the names and
                profile pictures of your social networking site “friends” and
                other information you have included in your social networking
                site profile. INSCAPE may associate and/or combine as well as
                use information collected by INSCAPE and/or obtained through
                such social networking sites in accordance with this Privacy
                Policy.
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="title"
                color={COLORS.darkGrey}
                style={{ marginTop: 15 }}
              >
                Disclosure and Transfer of Personal Data
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="small"
                color={COLORS.darkGrey}
                style={{ marginTop: 15, lineHeight: 16.5 }}
              >
                INSCAPE collects and processes personal data on a voluntary
                basis and it is not in the business of selling your personal
                data to third parties. Personal data may, however, occasionally
                be disclosed in accordance with applicable legislation and this
                Privacy Policy. Additionally, INSCAPE may disclose personal data
                to its parent companies and its subsidiaries in accordance with
                this Privacy Policy.
                {"\n"}
                INSCAPE may hire agents and contractors to collect and process
                personal data on INSCAPE’s behalf and in such cases such agents
                and contractors will be instructed to comply with our Privacy
                Policy and to use personal data only for the purposes for which
                the third party has been engaged by INSCAPE. These agents and
                contractors may not use your personal data for their own
                marketing purposes. INSCAPE may use third party service
                providers such as credit card processors, e-mail service
                providers, shipping agents, data analyzers and business
                intelligence providers. INSCAPE has the right to share your
                personal data as necessary for the aforementioned third parties
                to provide their services for INSCAPE. INSCAPE is not liable for
                the acts and omissions of these third parties, except as
                provided by mandatory law.
                {"\n"}
                INSCAPE may disclose your personal data to third parties as
                required by law enforcement or other government officials in
                connection with an investigation of fraud, intellectual property
                infringements, or other activity that is illegal or may expose
                you or INSCAPE to legal liability. INSCAPE may also disclose
                your personal data to third parties when INSCAPE has a reason to
                believe that a disclosure is necessary to address potential or
                actual injury or interference with INSCAPE’s rights, property,
                operations, users or others who may be harmed or may suffer loss
                or damage, or INSCAPE believes that such disclosure is necessary
                to protect INSCAPE’s rights, combat fraud and/or comply with a
                judicial proceeding, court order, or legal process served on
                INSCAPE.
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="title"
                color={COLORS.darkGrey}
                style={{ marginTop: 15 }}
              >
                Data Retention and Correctness
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="small"
                color={COLORS.darkGrey}
                style={{ marginTop: 15, lineHeight: 16.5 }}
              >
                INSCAPE retains the data collected pursuant to this Privacy
                Policy for the period necessary to fulfill the purposes outlined
                in this Privacy Policy unless a longer retention period is
                required or permitted by law. Thereafter if the collected data
                is no longer needed for purposes specified in this Privacy
                Policy, INSCAPE deletes all aforementioned data in its
                possession. INSCAPE does not verify the correctness of personal
                data.
                {"\n"}
                Even if data is changed or deleted, INSCAPE may still retain
                some of the data to resolve disputes, enforce INSCAPE user
                agreements, and comply with technical and legal requirements and
                constraints related to the security, integrity and operation of
                Services.
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="title"
                color={COLORS.darkGrey}
                style={{ marginTop: 15 }}
              >
                Cookies, beacons and tracking
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="small"
                color={COLORS.darkGrey}
                style={{ marginTop: 15, lineHeight: 16.5 }}
              >
                The Services may use “cookies” and other technologies such as
                pixel tags, clear GIFs and web beacons. INSCAPE treats
                information collected by cookies and similar technologies as
                non-personal data.
                {"\n"}
                E-mails and other electronic communications INSCAPE sends to you
                may contain code that enables INSCAPE to track your usage of the
                communication, including whether the communication was opened
                and/or what links were followed (if any). INSCAPE may combine
                that information to other information INSCAPE has about you and
                INSCAPE may use that information to improve the Services and/or
                provide customized communications to you. If you’d like to
                unsubscribe from receiving emails, then please contact us.
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="title"
                color={COLORS.darkGrey}
                style={{ marginTop: 15 }}
              >
                Third Party Terms and Conditions
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="small"
                color={COLORS.darkGrey}
                style={{ marginTop: 15, lineHeight: 16.5 }}
              >
                Please note that your access to and use of the Services may be
                subject to certain third party terms and conditions and privacy
                policies, including but not limited to application stores,
                mobile software platforms, on-line gaming platforms, social
                networking services and payment providers. You recognize and
                agree that INSCAPE is not liable for any such third party terms
                and conditions and their use of your personal data.
                {"\n"}
                INSCAPE may in its discretion make available links through
                advertisements or otherwise enable you to access third party
                products or services. Please note that, while using such
                products or services, you are using products or services
                developed and administered by people or companies not affiliated
                with or controlled by INSCAPE. INSCAPE is not responsible for
                the actions of those people or companies, the content of their
                products or services, the use of information you provide to
                them, or any products or services they may offer. The fact that
                INSCAPE is linking to those products or services does not
                constitute our sponsorship of, or affiliation with, those people
                or companies.
                {"\n"}
                Please note that certain Services that INSCAPE may offer, such
                as multiplayer gaming, social networking and gaming console
                services, may use third party services to provide authentication
                for the Services with a gaming console ID, social networking ID
                or gaming network account. When you register to join or use the
                Services from a third-party gaming or social networking system,
                certain personally identifiable user and/or membership data may
                be transferred automatically to and from INSCAPE and you hereby
                consent to the processing, using, combining, disclosing and
                retaining of such data in accordance with this Privacy Policy by
                INSCAPE.
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="title"
                color={COLORS.darkGrey}
                style={{ marginTop: 15 }}
              >
                Safeguards
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="small"
                color={COLORS.darkGrey}
                style={{ marginTop: 15, lineHeight: 16.5 }}
              >
                INSCAPE follows generally accepted industry standards and
                maintains reasonable safeguards to attempt to ensure the
                security, integrity and privacy of the information in INSCAPE’s
                possession. Only those persons with a need to process your
                personal data in connection with the fulfillment of their tasks
                in accordance with the purposes of this Privacy Policy and for
                the purposes of performing technical maintenance, have access to
                your personal data in INSCAPE’s possession. Personal data
                collected by INSCAPE is stored in secure operating environments
                that are not available to the public. To prevent unauthorized
                on-line access to personal data, INSCAPE maintains personal data
                behind a firewall-protected server. However, no system can be
                100% secure and there is the possibility that despite INSCAPE’s
                reasonable efforts, there could be unauthorized access to your
                personal data. By using the Services, you assume this risk.
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="title"
                color={COLORS.darkGrey}
                style={{ marginTop: 15 }}
              >
                Other
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="small"
                color={COLORS.darkGrey}
                style={{ marginTop: 15, lineHeight: 16.5 }}
              >
                Please be aware of the open nature of certain social networking
                and other open features of the Services INSCAPE may make
                available to you. You may choose to disclose data about yourself
                in the course of contributing user generated content to the
                Services. Any data that you disclose in any of these forums,
                blogs, chats or the like is public information, and there is no
                expectation of privacy or confidentiality. INSCAPE is not
                responsible for any personal data you choose to make public in
                any of these forums.
                {"\n"}
                If you are under 18 years of age or a minor in your country of
                residence, please ask your legal guardian’s permission to use or
                access the Services. INSCAPE takes children’s privacy seriously,
                and encourages parents and/or guardians to play an active role
                in their children’s online experience at all times. INSCAPE does
                not knowingly collect any personal information from children
                below the aforementioned age and if INSCAPE learns that INSCAPE
                has inadvertently gathered personal data from children under the
                aforementioned age, INSCAPE will take reasonable measures to
                promptly erase such personal data from INSCAPE’s records.
                INSCAPE may store and/or transfer your personal data to its
                affiliates and partners in and outside of EU/EEA member states
                and the United States in accordance with mandatory legislation
                and this Privacy Policy. INSCAPE may disclose your personal data
                to third parties in connection with a corporate merger,
                consolidation, restructuring, the sale of substantially all of
                INSCAPE’s stock and/or assets or other corporate change,
                including, without limitation, during the course of any due
                diligence process provided, however, that this Privacy Policy
                shall continue to govern such personal data.
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="title"
                color={COLORS.darkGrey}
                style={{ marginTop: 15 }}
              >
                Further information
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="small"
                color={COLORS.darkGrey}
                style={{ marginTop: 15, lineHeight: 16.5 }}
              >
                INSCAPE makes good faith efforts to enable you to review,
                update, correct or delete your personal data in INSCAPE’s
                possession. In order to do so, please contact INSCAPE via email.
                INSCAPE will need sufficient information from you to establish
                your identity and to verify your access request, and also to
                assist us in handling your request.  Requests will be processed
                as soon as possible. Please note that even if personal data is
                changed or deleted according to your request, INSCAPE may still
                retain some of your personal data to resolve disputes, enforce
                INSCAPE user agreement(s), and comply with technical and legal
                requirements and constraints related to the security, integrity
                and operation of INSCAPE Services.
                {"\n"}
                INSCAPE regularly reviews its compliance with this Privacy
                Policy. If INSCAPE receives a formal written complaint from you,
                it is INSCAPE’s policy to attempt to contact you directly to
                address any of your concerns. INSCAPE will cooperate with the
                appropriate governmental authorities, including data protection
                authorities, to resolve any complaints regarding the collection,
                use, transfer or disclosure of personal data that cannot be
                amicably resolved between you and INSCAPE.
              </CustomText>
            </>
          ) : (
            <>
              <CustomText
                fontFamily="regular"
                type="default"
                color={COLORS.darkGrey}
              >
                We are Meditation House Ltd., dba. Inscape (hereinafter: “we”,
                “us” or “MH”) the developer and operator / provider of a mobile
                application which we have made available guided meditations,
                music and other audiovisual content. These are the terms of use
                that apply when you install and/or use our App.
              </CustomText>

              <CustomText
                fontFamily="regular"
                type="title"
                color={COLORS.darkGrey}
                style={{ marginTop: 30 }}
              >
                CLAUSE 1 - DEFINITIONS
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="small"
                color={COLORS.darkGrey}
                style={{
                  textAlign: "justify",
                  marginTop: 15,
                  lineHeight: 16.5,
                }}
              >
                By downloading, installing, accessing, or using [Your Mobile App
                Name], you agree to comply with and be bound by these terms and
                conditions, along with our Privacy Policy. If you do not agree
                with any part of these terms, you may not use our app.
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="title"
                color={COLORS.darkGrey}
                style={{ marginTop: 25 }}
              >
                CLAUSE 2 - APPLICABILITY
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="small"
                color={COLORS.darkGrey}
                style={{
                  textAlign: "justify",
                  marginTop: 15,
                  lineHeight: 16.5,
                }}
              >
                1. These terms and conditions shall apply when you use the App
                and / or take out a Subscription with MH. If you do not wish to
                fully and irrevocably agree to these terms of use, you may not
                install and / or use the App.
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="title"
                color={COLORS.darkGrey}
                style={{ marginTop: 25 }}
              >
                CLAUSE 3 - INSTALLATION OF THE APP
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="small"
                color={COLORS.darkGrey}
                style={{
                  textAlign: "justify",
                  marginTop: 15,
                  lineHeight: 16.5,
                }}
              >
                1. MH assumes that when installing the App you will use: a
                device of which you own the rights to install software on; and
                an account where you handle all necessary account information
                (or, if you are 15 years or younger, obtain permission from your
                parents or guardian).
                {"\n"}
                {"\n"}
                2. Your use of the App is strictly personal. It is forbidden to
                use your account for of by a third person. {"\n"}
                {"\n"}
                3. All information that you provide, or have provided, when
                creating your account is correct, complete and current and you
                will update your account information to keep it current.{"\n"}
                {"\n"}
                4. Keep your username and password confidential. MH is not
                liable for any misuse of you usernames, passwords or other ways
                to identify yourself when using the App. Therefore, MH may
                assume that if a person logs into the App under your username
                it’s you. At the moment you suspect that one of your identifiers
                for the App has been abused, you must immediately report this to
                MH via the contact details provided in Clause 12 of these terms
                of use.
                {"\n"}
                {"\n"}
                5. MH may limit the number of devices, but never less than two,
                on which you can use an account. If you exceed the limit of
                devices, you will be logged out automatically on the other
                devices.
                {"\n"}
                {"\n"}
                6. You will not create an account via the App with personal
                details other than your own. In particular, you will not use any
                device, script, bot, spider, crawler or other technique.
                {"\n"}
                {"\n"}
                7. You may not interfere or disrupt the App or the servers and /
                or networks connected to the App, through viruses, spyware,
                malware or other destructive or disruptive code. CLAUSE 4 – WHAT
                MH DOES
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="title"
                color={COLORS.darkGrey}
                style={{ marginTop: 25 }}
              >
                CLAUSE 4 – WHAT MH DOES
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="small"
                color={COLORS.darkGrey}
                style={{
                  textAlign: "justify",
                  marginTop: 15,
                  lineHeight: 16.5,
                }}
              >
                1. MH shall use commercially reasonable efforts to have the App
                available twenty-four hours a day, seven days a week. MH cannot
                guarantee:
                {"\n"}- that the App shall function and be available without
                disruption, errors or defects. In the event we discover errors
                or errors are reported to us, we will try to fix those errors as
                soon as reasonably possible. We will take the nature of the
                error into account. You can report an error by sending an email
                to support@inscape.life;
                {"\n"}- to use the App you will need hardware (a tablet, phone
                etc.) and an internet connection (to download/view content). We
                are not responsible for the equipment used by you, nor are we
                responsible for a working internet connection.
                {"\n"} {"\n"}
                2. MH may temporary shutdown their services entirely or
                partially for preventive, corrective or adaptive maintenance or
                to install upgrades or updates. During the shutdown you cannot
                download the App and the use of the App will be limited. MH
                shall try, but not guarantee, to shut down the App outside peak
                hours.
                {"\n"} {"\n"}
                3. MH reserves the right to make changes to the App and is
                therefore entitled to change, remove or add certain features,
                content and functionalities of the App.
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="title"
                color={COLORS.darkGrey}
                style={{ marginTop: 25 }}
              >
                CLAUSE 5 – PRICES
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="small"
                color={COLORS.darkGrey}
                style={{
                  textAlign: "justify",
                  marginTop: 15,
                  lineHeight: 16.5,
                }}
              >
                1. MH shall be entitled to adjust its fees at any time. A price
                change will take effect (i) on the moment the duration of the
                current Subscription exceeds the period of twelve (12) months
                or, if that moment occurs later, (ii) five (5) weeks after the
                price change has been announced. If you don’t want to pay the
                higher price, you need to cancel your Subscription.
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="title"
                color={COLORS.darkGrey}
                style={{ marginTop: 25 }}
              >
                CLAUSE 6 – PAYMENT AND COLLECTION COSTS
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="small"
                color={COLORS.darkGrey}
                style={{
                  textAlign: "justify",
                  marginTop: 15,
                  lineHeight: 16.5,
                }}
              >
                1. The Subscription fee must be paid to MH before the start of
                your Subscription. Depending on the type of Subscription, after
                the first payment MH will charge the amount due for the
                following month or the following year by direct debit.
                {"\n"} {"\n"}
                2. We will send you an announcement of the direct debit of your
                Subscription by e-mail seven (7) days before the direct debit is
                planned. This e-mail will contain the amount to be collected and
                collection date.
                {"\n"} {"\n"}
                3. You are in breach of your obligations if you do not pay
                before or on the payment deadline.
                {"\n"} {"\n"}
                4. If you have not paid after two or more payment reminders, MH
                may terminate the Subscription.
                {"\n"} {"\n"}
                5. If you do not pay in time (including if MH cannot collect the
                amount due from you), MH may (temporarily) deny you access to
                the App or a part thereof. The foregoing does not affect any
                other right of MH under these conditions.
                {"\n"} {"\n"}
                6. All data costs you incur for or by using the App are for your
                own expenses.
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="title"
                color={COLORS.darkGrey}
                style={{ marginTop: 25 }}
              >
                CLAUSE 7 – DURATION, TERMINATION AND CONSEQUENCES OR TERMINATION
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="small"
                color={COLORS.darkGrey}
                style={{
                  textAlign: "justify",
                  marginTop: 15,
                  lineHeight: 16.5,
                }}
              >
                1. MH’s order confirmation states the Subscription period and,
                if applicable, what content you can use.
                {"\n"} {"\n"}
                2. The term of a Subscription concluded for a definite period of
                time will be extended automatically unless you terminate the
                Subscription as described in paragraph 4 below. 3. If you stop
                your subscription, or if MH suspends you access to the App
                because of (suspected) misuse of the App, you agree that MH will
                not be liable or responsible, and MH will not refund any paid
                Subscription fee to the extent permitted by law. You can
                terminate the agreement at any time.
                {"\n"} {"\n"}
                3. You can stop your Subscription via your account. Not
                possible? Please contact our customer service via e-mail:
                support@inscape.life.
                {"\n"} {"\n"}
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="title"
                color={COLORS.darkGrey}
                style={{ marginTop: 25 }}
              >
                CLAUSE 8 – INTELLECTUAL PROPERTY RIGHTS
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="small"
                color={COLORS.darkGrey}
                style={{
                  textAlign: "justify",
                  marginTop: 15,
                  lineHeight: 16.5,
                }}
              >
                1. MH grants you a license to use the App on a personal
                non-exclusive basis. Therefore, the App is not sold or
                transferred to you. The license gives you the right to install
                and use the App as set out in these terms of use.
                {"\n"} {"\n"}
                2.You obtain the user rights as set out in these terms of use
                under the condition that you fulfill your obligations under
                these terms of use. Without prejudice to any rights or remedies
                of MH under the law or these terms of use, any default to comply
                with these terms of use gives MH the right to refuse or end your
                access to the App.
                {"\n"} {"\n"}
                3. The license as described above is limited to the intellectual
                property rights of MH and its licensors in the App and does not
                include any other rights.
                {"\n"} {"\n"}
                4.All rights not expressly granted to you in these terms of use
                are reserved by MH. MH reserves all rights, titles and interests
                in and to the App including, but not limited to, all copyrights,
                trademarks, trade secrets, trade names, proprietary rights,
                patents, title, codes, audiovisual effects, themes, characters,
                stories, settings, illustrations, musical works and moral
                rights, if not registered and all applications thereof.
                {"\n"} {"\n"}
                5. Unless permitted by binding rules, without MH´s prior written
                consent you will not: (i) commercially exploit the App; (ii)
                distribute, lease, license, sell, rent, lend, transfer or
                otherwise assign the App, copies thereof, or any passwords or
                usernames related to the App; (iii) copy, reproduce or
                distribute the App in any way or through any medium or
                decompile, disassemble or reverse engineer it in any way; (iv)
                make the App available to the public or via a network so that it
                can be downloaded by multiple users; (v) remove, change or hide
                product information, copyrights, intellectual property,
                copyright notices, legal notices or other labels from the origin
                or source of the App; (vi) modify, improve or make a derivative
                work of the App.
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="title"
                color={COLORS.darkGrey}
                style={{ marginTop: 25 }}
              >
                CLAUSE 9 – PRIVACY POLICY
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="small"
                color={COLORS.darkGrey}
                style={{
                  textAlign: "justify",
                  marginTop: 15,
                  lineHeight: 16.5,
                }}
              >
                1. MH respects your privacy. Your personal data is safe with MH.
                Read our privacy statement for more information about how MH
                handles your personal dat.
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="title"
                color={COLORS.darkGrey}
                style={{ marginTop: 25 }}
              >
                CLAUSE 10 – LIABILITY
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="small"
                color={COLORS.darkGrey}
                style={{
                  textAlign: "justify",
                  marginTop: 15,
                  lineHeight: 16.5,
                }}
              >
                1. You agree and warrant that your use of the App will not
                infringe any rights of any third party, including but not
                limited to intellectual property, moral, and privacy rights.
                {"\n"} {"\n"}
                2. Licensee hereby agrees to defend, indemnify and hold harmless
                MH and its suppliers for providing you the App against all
                damage, claims, costs, charges and expenses (including
                attorneys’ fees) arising out of your use of the App.
                {"\n"} {"\n"}
                3. MH has the right, but not the obligation, to update, upgrade
                or modify the App or change or delete data or information stored
                in the App at any time.
                {"\n"} {"\n"}
                4. Except for damages caused by negligence or gross negligence,
                the total liability of MH and MH's suppliers will in no case
                exceed the price paid by you for using the App. In the event
                that you pay periodically for the use of the App, this liability
                is limited to the compensation paid by you for the period in
                which the liability-creating event occurred. These limitations
                of liability applies to all liability of MH and MH's suppliers,
                regardless of their origin. The limitations apply to both
                contractual and non-contractual liabilities.
                {"\n"} {"\n"}
                5. If you think MH fails to fulfil one of its obligations you
                must report this as soon as reasonably possible, in order for
                you to claim damage.
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="title"
                color={COLORS.darkGrey}
                style={{ marginTop: 25 }}
              >
                CLAUSE 11- MISCELLANEOUS
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="small"
                color={COLORS.darkGrey}
                style={{
                  textAlign: "justify",
                  marginTop: 15,
                  lineHeight: 16.5,
                }}
              >
                1. MH may adjust these terms of use from time to time. If you do
                not agree with the changes, you must notify us in writing within
                seven (7) days of our notification to you. MH will then either
                decide that your Subscription will continue unchanged or
                terminate your Subscription and you will no longer have access
                to the App. In the event of termination of a paid Subscription,
                you are entitled to a refund of the amount equal to the time
                your paid Subscription would continue.
                {"\n"} {"\n"}
                2. If at any time any term or provision in these terms of use
                shall be held to be illegal, invalid or unenforceable, in whole
                or in part, under any rule of law or enactment, such term or
                provision or part shall to that extent be deemed not to form
                part of these terms of use, but the enforceability of the
                remainder of these terms of use shall not be affected.
                {"\n"} {"\n"}
                3. You shall not be entitled to assign your respective rights or
                obligations under these terms of use without the prior written
                consent of MH.
                {"\n"} {"\n"}
                4. MH shall be entitled to transfer its respective rights and
                obligations under these terms of use entirely or partially to a
                third party. In such event, you may terminate the agreement with
                MH if that transfer is to a person outside the group of MH.
                {"\n"} {"\n"}
                5. All agreements between you and MH, your Subscription and
                these terms of use shall be governed by and construed in
                accordance with the laws of the United States of America. All
                disputes between the Parties arising under the Agreement and any
                agreements and obligations arising therefrom shall be submitted
                to the competent court.
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="title"
                color={COLORS.darkGrey}
                style={{ marginTop: 25 }}
              >
                CLAUSE 12 - CONTACT
              </CustomText>
              <CustomText
                fontFamily="regular"
                type="small"
                color={COLORS.darkGrey}
                style={{
                  textAlign: "justify",
                  marginTop: 15,
                  lineHeight: 16.5,
                }}
              >
                1. If you have any questions regarding these terms of use,
                please contact our customer service using the details below:
                {"\n"} {"\n"}
                email address: support@inscape.life
                {"\n"}
                correspondence address: 1226 Bogart Rd., Catskill, NY 12463
                {"\n"} {"\n"}
                Version: March 2025
              </CustomText>
            </>
          )}
        </ScrollView>

        <CustomButton
          onPress={onAgree}
          title="Agree"
          backgroundColor={COLORS.navyBlue}
          style={styles.agreeButton}
        />
      </View>
    </Modal>
  );
};

export default PrivacyModal;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: COLORS.white,
    borderRadius: verticalScale(20),
    padding: verticalScale(20),
    maxHeight: hp(60),
  },
  closeButton: {
    position: "absolute",
    right: 0,
  },
  crossIcon: {
    height: verticalScale(15),
    width: verticalScale(15),
  },
  heading: {
    textAlign: "center",
  },
  scrollView: {
    marginVertical: verticalScale(20),
  },
  scrollViewContent: {
    paddingHorizontal: horizontalScale(5),
  },
  textContent: {
    textAlign: "center",
  },
  agreeButton: {
    width: wp(50),
    alignSelf: "center",
  },
});
