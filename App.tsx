import DiceGame from './src/screens/DiceGame/DiceGame';
import { I18nextProvider } from 'react-i18next';
import i18n from './src/lib/i18n';
import { StatusBar } from 'react-native';

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <StatusBar barStyle="light-content" />
      <DiceGame />
    </I18nextProvider>
  );
}
