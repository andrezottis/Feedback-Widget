import React from "react";
import { View, Text } from "react-native";
import { Copyright } from "../copyright";
import { Option } from "../option";
import { styles } from "./styles";
import { feedbackTypes } from "../../utils/feedbackTypes";
import { feedbackType } from "../widget";

interface Props {
  onFeedbackTypeChanged: (feedbackTypeSelector: feedbackType) => void;
}

export function Options({ onFeedbackTypeChanged }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deixe seu Feedback</Text>
      <View style={styles.options}>
        {Object.entries(feedbackTypes).map(([key, value]) => (
          <Option
            key={key}
            title={value.title}
            image={value.image}
            onPress={() => onFeedbackTypeChanged(key as feedbackType)}
          />
        ))}
      </View>
      <Copyright />
    </View>
  );
}
