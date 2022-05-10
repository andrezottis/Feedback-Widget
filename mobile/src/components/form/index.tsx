import { ArrowLeft } from "phosphor-react-native";
import React from "react";
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import { theme } from "../../theme";
import { styles } from "./styles";
import { feedbackType } from "../widget";
import { feedbackTypes } from "../../utils/feedbackTypes";

interface Props {
  feedbackTypeForm: feedbackType;
}

export function Form({ feedbackTypeForm }: Props) {
  const feedbackTypeInfo = feedbackTypes[feedbackTypeForm];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
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
    </View>
  );
}
