import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Modal, View, Dimensions } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);

  const languages = [
    { code: 'en', flag: 'us' },
    { code: 'pt', flag: 'br' },
    { code: 'es', flag: 'es' },
    { code: 'zh', flag: 'cn' },
    { code: 'de', flag: 'de' },
    { code: 'hi', flag: 'in' },
  ];

  const getFlagCode = () => {
    switch (i18n.language) {
      case 'pt':
        return 'br';
      case 'es':
        return 'es';
      case 'zh':
        return 'cn';
      case 'de':
        return 'de';
      case 'hi':
        return 'in';
      default:
        return 'us';
    }
  };

  const handleLanguageSelect = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setModalVisible(true)}
      >
        <CountryFlag
          isoCode={getFlagCode()}
          size={30}
          style={styles.flag}
        />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="none"
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

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginLeft: 10,
  },
  flag: {
    borderRadius: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 20,
    width: Dimensions.get('window').width * 0.8,
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  flagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15,
  },
  flagButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  modalFlag: {
    borderRadius: 5,
  },
});

export default LanguageSelector; 