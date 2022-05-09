import React, { useRef } from "react";
import { TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { ChatTeardropDots } from "phosphor-react-native";
import { theme } from "../../theme";
import BottomSheet from "@gorhom/bottom-sheet";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

function Widget() {
const bottomSheetRef = useRef<BottomSheet>(null);

function handleOpen(){
  bottomSheetRef.current?.expand();
}

  return (
    <>
      <TouchableOpacity style={styles.button}
      onPress={handleOpen}>
        <ChatTeardropDots
          size={24}
          color={theme.colors.text_on_brand_color}
          weight="bold"
        />
      </TouchableOpacity>
      <BottomSheet
      ref={bottomSheetRef}
      snapPoints={[1,280]}>

      </BottomSheet>
    </>
  );
}

export default gestureHandlerRootHOC(Widget);
