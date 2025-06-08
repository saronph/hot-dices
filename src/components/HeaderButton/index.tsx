import { View } from "react-native";

import { TouchableOpacity } from "react-native";
import { styles } from "./styles";

interface HeaderButtonProps {
  onPress: () => void;
  children: React.ReactNode;
}

export const HeaderButton = ({ onPress, children }: HeaderButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.headerButton}>
      <View style={styles.headerButtonContent}>{children}</View>
    </TouchableOpacity>
  );
};
