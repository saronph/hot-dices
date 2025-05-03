import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import { useTranslation } from 'react-i18next';

interface LanguageModalProps {
  visible: boolean;
  onClose: () => void;
}

const LanguageModal: React.FC<LanguageModalProps> = ({ visible, onClose }) => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', flag: 'us' },
    { code: 'pt', flag: 'br' },
    { code: 'es', flag: 'es' },
    { code: 'zh', flag: 'cn' },
    { code: 'de', flag: 'de' },
    { code: 'hi', flag: 'in' },
  ];

  const handleLanguageSelect = (langCode: string) => {
    i18n.changeLanguage(langCode);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.overlay} 
        activeOpacity={1} 
        onPress={onClose}
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
                  style={styles.flag}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
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
  flag: {
    borderRadius: 5,
  },
});

export default LanguageModal; 