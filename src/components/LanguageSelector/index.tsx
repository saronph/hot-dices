import React, { useState } from "react";
import { TouchableOpacity, Modal, View, Text } from "react-native";
import CountryFlag from "react-native-country-flag";
import { useTranslation } from "react-i18next";

import { LanguageSelectorStyles as styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../styles/default/colors";

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);

  const languages = [
    { code: "en", flag: "us" },
    { code: "pt", flag: "br" },
    { code: "es", flag: "es" },
    { code: "zh", flag: "cn" },
    { code: "de", flag: "de" },
    { code: "hi", flag: "in" },
  ];

  const handleLanguageSelect = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.flagContainer}>
          <MaterialIcons
            name="g-translate"
            size={24}
            color={colors["gray-500"]}
          />
          <Text style={styles.label}>{t("language")}</Text>
        </View>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.flagsContainer}>
              {languages.map((lang) => (
                <TouchableOpacity
                  key={lang.code}
                  style={styles.flagButton}
                  onPress={() => handleLanguageSelect(lang.code)}
                >
                  <CountryFlag
                    isoCode={lang.flag}
                    size={40}
                    style={styles.modalFlag}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default LanguageSelector;
