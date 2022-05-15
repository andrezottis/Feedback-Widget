import { ArrowLeft } from "phosphor-react-native";
import { captureScreen } from "react-native-view-shot";
import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import { theme } from "../../theme";
import { styles } from "./styles";
import { feedbackType } from "../widget";
import { ScreenshotButton } from "../screenshotButton";
import { Button } from "../button";
import { feedbackTypes } from "../../utils/feedbackTypes";
import { api } from "../../libs/api";
import * as FileSystem from 'expo-file-system'

interface Props {
  feedbackTypeForm: feedbackType;
  onFeedbackSent: () => void;
  onFeedbackCanceled: () => void;
}

export function Form({ feedbackTypeForm, onFeedbackSent, onFeedbackCanceled }: Props) {
  const [screenshot, setScreenshot] = useState<string | null> (null);
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const [comment, setComment] = useState("");
  const feedbackTypeInfo = feedbackTypes[feedbackTypeForm];


  function handleScreeshot(){
    captureScreen({
      format:'png',
      quality:0.8
    }).then(uri => setScreenshot(uri))
    .catch(error => console.log(error))
  }

  function handleScreeshotRemove(){
    setScreenshot(null);
  }

  async function handleSendFeedback (){
    if(isSendingFeedback){
      return;
    }
    setIsSendingFeedback(true);
    const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, {encoding: 'base64'});


    try {
      await api.post('/feedbacks', {
        type: feedbackTypeForm,
        comment,
        screenshot: `data:image/png;base64, ${screenshotBase64}`,
      });

      onFeedbackSent();
    } catch (error) {
      console.log(error);
      setIsSendingFeedback(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackCanceled}>
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Image source={feedbackTypeInfo.image} style={styles.image} />
          <Text style={styles.titleText}>{feedbackTypeInfo.title}</Text>
        </View>
      </View>
      <TextInput
        multiline
        style={styles.input}
        placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
        placeholderTextColor={theme.colors.text_secondary}
        onChangeText={setComment}
      />
      <View style={styles.footer}>
        <ScreenshotButton
          onTakeShot={handleScreeshot}
          onRemoveShot={handleScreeshotRemove}
          screenshot={screenshot}
        />
        <Button 
        onPress={handleSendFeedback}
        isLoading={isSendingFeedback} />
      </View>
    </View>
  );
}
