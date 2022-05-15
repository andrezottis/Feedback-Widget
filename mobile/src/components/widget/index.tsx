import React, { useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { ChatTeardropDots } from "phosphor-react-native";
import { theme } from "../../theme";
import BottomSheet from "@gorhom/bottom-sheet";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import symbolicateStackTrace from "react-native/Libraries/Core/Devtools/symbolicateStackTrace";
import { Options } from "../options";
import { Form } from "../form";
import { Success } from "../success";
import { feedbackTypes } from "../../utils/feedbackTypes";

export type feedbackType = keyof typeof feedbackTypes;

function Widget() {
  const [feedbackTypeState, setFeedbackTypeState] =
    useState<feedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  function handleOpen() {
    bottomSheetRef.current?.expand();
  }

  function HandleRestartFeedback() {
    setFeedbackTypeState(null);
    setFeedbackSent(false);
  }

  function handleFeedbackSent() {
    setFeedbackSent(true);
  }

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={handleOpen}>
        <ChatTeardropDots
          size={24}
          color={theme.colors.text_on_brand_color}
          weight="bold"
        />
      </TouchableOpacity>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        {feedbackSent ? (
          <Success onSendAnotherFeedback={HandleRestartFeedback} />
        ) : (
          <>
            {feedbackTypeState ? (
              <Form
                feedbackTypeForm={feedbackTypeState}
                onFeedbackCanceled={HandleRestartFeedback}
                onFeedbackSent={handleFeedbackSent}
              />
            ) : (
              <Options onFeedbackTypeChanged={setFeedbackTypeState} />
            )}
          </>
        )}
      </BottomSheet>
    </>
  );
}

export default gestureHandlerRootHOC(Widget);
