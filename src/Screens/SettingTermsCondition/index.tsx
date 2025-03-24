import React, { FC } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ICONS from "../../Assets/icons";
import CustomIcon from "../../Components/CustomIcon";
import { CustomText } from "../../Components/CustomText";
import { SettingsTermsAndConditionProps } from "../../Typings/route";
import styles from "./style";
import COLORS from "../../Utilities/Colors";

const SettingTermsCondition: FC<SettingsTermsAndConditionProps> = ({
  navigation,
}) => {
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
        <CustomText fontFamily="regular" type="default" color={COLORS.white}>
          We are Meditation House Ltd., dba. Inscape (hereinafter: “we”, “us” or
          “MH”) the developer and operator / provider of a mobile application
          which we have made available guided meditations, music and other
          audiovisual content. These are the terms of use that apply when you
          install and/or use our App.
        </CustomText>

        <CustomText
          fontFamily="regular"
          type="title"
          color={COLORS.white}
          style={{ marginTop: 30 }}
        >
          CLAUSE 1 - DEFINITIONS
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="small"
          color={COLORS.white}
          style={{ textAlign: "justify", marginTop: 15, lineHeight: 16.5 }}
        >
          By downloading, installing, accessing, or using [Your Mobile App
          Name], you agree to comply with and be bound by these terms and
          conditions, along with our Privacy Policy. If you do not agree with
          any part of these terms, you may not use our app.
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="title"
          color={COLORS.white}
          style={{ marginTop: 25 }}
        >
          CLAUSE 2 - APPLICABILITY
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="small"
          color={COLORS.white}
          style={{ textAlign: "justify", marginTop: 15, lineHeight: 16.5 }}
        >
          1. These terms and conditions shall apply when you use the App and /
          or take out a Subscription with MH. If you do not wish to fully and
          irrevocably agree to these terms of use, you may not install and / or
          use the App.
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="title"
          color={COLORS.white}
          style={{ marginTop: 25 }}
        >
          CLAUSE 3 - INSTALLATION OF THE APP
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="small"
          color={COLORS.white}
          style={{ textAlign: "justify", marginTop: 15, lineHeight: 16.5 }}
        >
          1. MH assumes that when installing the App you will use: a device of
          which you own the rights to install software on; and an account where
          you handle all necessary account information (or, if you are 15 years
          or younger, obtain permission from your parents or guardian).
          {"\n"}
          {"\n"}
          2. Your use of the App is strictly personal. It is forbidden to use
          your account for of by a third person. {"\n"}
          {"\n"}
          3. All information that you provide, or have provided, when creating
          your account is correct, complete and current and you will update your
          account information to keep it current.{"\n"}
          {"\n"}
          4. Keep your username and password confidential. MH is not liable for
          any misuse of you usernames, passwords or other ways to identify
          yourself when using the App. Therefore, MH may assume that if a person
          logs into the App under your username it’s you. At the moment you
          suspect that one of your identifiers for the App has been abused, you
          must immediately report this to MH via the contact details provided in
          Clause 12 of these terms of use.
          {"\n"}
          {"\n"}
          5. MH may limit the number of devices, but never less than two, on
          which you can use an account. If you exceed the limit of devices, you
          will be logged out automatically on the other devices.
          {"\n"}
          {"\n"}
          6. You will not create an account via the App with personal details
          other than your own. In particular, you will not use any device,
          script, bot, spider, crawler or other technique.
          {"\n"}
          {"\n"}
          7. You may not interfere or disrupt the App or the servers and / or
          networks connected to the App, through viruses, spyware, malware or
          other destructive or disruptive code. CLAUSE 4 – WHAT MH DOES
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="title"
          color={COLORS.white}
          style={{ marginTop: 25 }}
        >
          CLAUSE 4 – WHAT MH DOES
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="small"
          color={COLORS.white}
          style={{ textAlign: "justify", marginTop: 15, lineHeight: 16.5 }}
        >
          1. MH shall use commercially reasonable efforts to have the App
          available twenty-four hours a day, seven days a week. MH cannot
          guarantee:
          {"\n"}- that the App shall function and be available without
          disruption, errors or defects. In the event we discover errors or
          errors are reported to us, we will try to fix those errors as soon as
          reasonably possible. We will take the nature of the error into
          account. You can report an error by sending an email to
          support@inscape.life;
          {"\n"}- to use the App you will need hardware (a tablet, phone etc.)
          and an internet connection (to download/view content). We are not
          responsible for the equipment used by you, nor are we responsible for
          a working internet connection.
          {"\n"} {"\n"}
          2. MH may temporary shutdown their services entirely or partially for
          preventive, corrective or adaptive maintenance or to install upgrades
          or updates. During the shutdown you cannot download the App and the
          use of the App will be limited. MH shall try, but not guarantee, to
          shut down the App outside peak hours.
          {"\n"} {"\n"}
          3. MH reserves the right to make changes to the App and is therefore
          entitled to change, remove or add certain features, content and
          functionalities of the App.
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="title"
          color={COLORS.white}
          style={{ marginTop: 25 }}
        >
          CLAUSE 5 – PRICES
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="small"
          color={COLORS.white}
          style={{ textAlign: "justify", marginTop: 15, lineHeight: 16.5 }}
        >
          1. MH shall be entitled to adjust its fees at any time. A price change
          will take effect (i) on the moment the duration of the current
          Subscription exceeds the period of twelve (12) months or, if that
          moment occurs later, (ii) five (5) weeks after the price change has
          been announced. If you don’t want to pay the higher price, you need to
          cancel your Subscription.
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="title"
          color={COLORS.white}
          style={{ marginTop: 25 }}
        >
          CLAUSE 6 – PAYMENT AND COLLECTION COSTS
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="small"
          color={COLORS.white}
          style={{ textAlign: "justify", marginTop: 15, lineHeight: 16.5 }}
        >
          1. The Subscription fee must be paid to MH before the start of your
          Subscription. Depending on the type of Subscription, after the first
          payment MH will charge the amount due for the following month or the
          following year by direct debit.
          {"\n"} {"\n"}
          2. We will send you an announcement of the direct debit of your
          Subscription by e-mail seven (7) days before the direct debit is
          planned. This e-mail will contain the amount to be collected and
          collection date.
          {"\n"} {"\n"}
          3. You are in breach of your obligations if you do not pay before or
          on the payment deadline.
          {"\n"} {"\n"}
          4. If you have not paid after two or more payment reminders, MH may
          terminate the Subscription.
          {"\n"} {"\n"}
          5. If you do not pay in time (including if MH cannot collect the
          amount due from you), MH may (temporarily) deny you access to the App
          or a part thereof. The foregoing does not affect any other right of MH
          under these conditions.
          {"\n"} {"\n"}
          6. All data costs you incur for or by using the App are for your own
          expenses.
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="title"
          color={COLORS.white}
          style={{ marginTop: 25 }}
        >
          CLAUSE 7 – DURATION, TERMINATION AND CONSEQUENCES OR TERMINATION
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="small"
          color={COLORS.white}
          style={{ textAlign: "justify", marginTop: 15, lineHeight: 16.5 }}
        >
          1. MH’s order confirmation states the Subscription period and, if
          applicable, what content you can use.
          {"\n"} {"\n"}
          2. The term of a Subscription concluded for a definite period of time
          will be extended automatically unless you terminate the Subscription
          as described in paragraph 4 below. 3. If you stop your subscription,
          or if MH suspends you access to the App because of (suspected) misuse
          of the App, you agree that MH will not be liable or responsible, and
          MH will not refund any paid Subscription fee to the extent permitted
          by law. You can terminate the agreement at any time.
          {"\n"} {"\n"}
          3. You can stop your Subscription via your account. Not possible?
          Please contact our customer service via e-mail: support@inscape.life.
          {"\n"} {"\n"}
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="title"
          color={COLORS.white}
          style={{ marginTop: 25 }}
        >
          CLAUSE 8 – INTELLECTUAL PROPERTY RIGHTS
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="small"
          color={COLORS.white}
          style={{ textAlign: "justify", marginTop: 15, lineHeight: 16.5 }}
        >
          1. MH grants you a license to use the App on a personal non-exclusive
          basis. Therefore, the App is not sold or transferred to you. The
          license gives you the right to install and use the App as set out in
          these terms of use.
          {"\n"} {"\n"}
          2.You obtain the user rights as set out in these terms of use under
          the condition that you fulfill your obligations under these terms of
          use. Without prejudice to any rights or remedies of MH under the law
          or these terms of use, any default to comply with these terms of use
          gives MH the right to refuse or end your access to the App.
          {"\n"} {"\n"}
          3. The license as described above is limited to the intellectual
          property rights of MH and its licensors in the App and does not
          include any other rights.
          {"\n"} {"\n"}
          4.All rights not expressly granted to you in these terms of use are
          reserved by MH. MH reserves all rights, titles and interests in and to
          the App including, but not limited to, all copyrights, trademarks,
          trade secrets, trade names, proprietary rights, patents, title, codes,
          audiovisual effects, themes, characters, stories, settings,
          illustrations, musical works and moral rights, if not registered and
          all applications thereof.
          {"\n"} {"\n"}
          5. Unless permitted by binding rules, without MH´s prior written
          consent you will not: (i) commercially exploit the App; (ii)
          distribute, lease, license, sell, rent, lend, transfer or otherwise
          assign the App, copies thereof, or any passwords or usernames related
          to the App; (iii) copy, reproduce or distribute the App in any way or
          through any medium or decompile, disassemble or reverse engineer it in
          any way; (iv) make the App available to the public or via a network so
          that it can be downloaded by multiple users; (v) remove, change or
          hide product information, copyrights, intellectual property, copyright
          notices, legal notices or other labels from the origin or source of
          the App; (vi) modify, improve or make a derivative work of the App.
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="title"
          color={COLORS.white}
          style={{ marginTop: 25 }}
        >
          CLAUSE 9 – PRIVACY POLICY
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="small"
          color={COLORS.white}
          style={{ textAlign: "justify", marginTop: 15, lineHeight: 16.5 }}
        >
          1. MH respects your privacy. Your personal data is safe with MH. Read
          our privacy statement for more information about how MH handles your
          personal dat.
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="title"
          color={COLORS.white}
          style={{ marginTop: 25 }}
        >
          CLAUSE 10 – LIABILITY
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="small"
          color={COLORS.white}
          style={{ textAlign: "justify", marginTop: 15, lineHeight: 16.5 }}
        >
          1. You agree and warrant that your use of the App will not infringe
          any rights of any third party, including but not limited to
          intellectual property, moral, and privacy rights.
          {"\n"} {"\n"}
          2. Licensee hereby agrees to defend, indemnify and hold harmless MH
          and its suppliers for providing you the App against all damage,
          claims, costs, charges and expenses (including attorneys’ fees)
          arising out of your use of the App.
          {"\n"} {"\n"}
          3. MH has the right, but not the obligation, to update, upgrade or
          modify the App or change or delete data or information stored in the
          App at any time.
          {"\n"} {"\n"}
          4. Except for damages caused by negligence or gross negligence, the
          total liability of MH and MH's suppliers will in no case exceed the
          price paid by you for using the App. In the event that you pay
          periodically for the use of the App, this liability is limited to the
          compensation paid by you for the period in which the
          liability-creating event occurred. These limitations of liability
          applies to all liability of MH and MH's suppliers, regardless of their
          origin. The limitations apply to both contractual and non-contractual
          liabilities.
          {"\n"} {"\n"}
          5. If you think MH fails to fulfil one of its obligations you must
          report this as soon as reasonably possible, in order for you to claim
          damage.
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="title"
          color={COLORS.white}
          style={{ marginTop: 25 }}
        >
          CLAUSE 11- MISCELLANEOUS
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="small"
          color={COLORS.white}
          style={{ textAlign: "justify", marginTop: 15, lineHeight: 16.5 }}
        >
          1. MH may adjust these terms of use from time to time. If you do not
          agree with the changes, you must notify us in writing within seven (7)
          days of our notification to you. MH will then either decide that your
          Subscription will continue unchanged or terminate your Subscription
          and you will no longer have access to the App. In the event of
          termination of a paid Subscription, you are entitled to a refund of
          the amount equal to the time your paid Subscription would continue.
          {"\n"} {"\n"}
          2. If at any time any term or provision in these terms of use shall be
          held to be illegal, invalid or unenforceable, in whole or in part,
          under any rule of law or enactment, such term or provision or part
          shall to that extent be deemed not to form part of these terms of use,
          but the enforceability of the remainder of these terms of use shall
          not be affected.
          {"\n"} {"\n"}
          3. You shall not be entitled to assign your respective rights or
          obligations under these terms of use without the prior written consent
          of MH.
          {"\n"} {"\n"}
          4. MH shall be entitled to transfer its respective rights and
          obligations under these terms of use entirely or partially to a third
          party. In such event, you may terminate the agreement with MH if that
          transfer is to a person outside the group of MH.
          {"\n"} {"\n"}
          5. All agreements between you and MH, your Subscription and these
          terms of use shall be governed by and construed in accordance with the
          laws of the United States of America. All disputes between the Parties
          arising under the Agreement and any agreements and obligations arising
          therefrom shall be submitted to the competent court.
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="title"
          color={COLORS.white}
          style={{ marginTop: 25 }}
        >
          CLAUSE 12 - CONTACT
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="small"
          color={COLORS.white}
          style={{ textAlign: "justify", marginTop: 15, lineHeight: 16.5 }}
        >
          1. If you have any questions regarding these terms of use, please
          contact our customer service using the details below:
          {"\n"} {"\n"}
          email address: support@inscape.life
          {"\n"}
          correspondence address: 1226 Bogart Rd., Catskill, NY 12463
          {"\n"} {"\n"}
          Version: March 2025
        </CustomText>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingTermsCondition;
