import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Animated,
} from "react-native";

const App = () => {
  const [isDashed, setIsDashed] = useState(true);
  const animationProgress = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.timing(animationProgress, {
      toValue: 0, // Transition to solid line
      duration: 2000, // Time it takes to fully change
      useNativeDriver: false, // Required for non-transform animations
    }).start(() => setIsDashed(false)); // Set to solid when animation completes
  };

  const handlePressOut = () => {
    animationProgress.stopAnimation(); // Stop the animation if the user releases
    if (isDashed) {
      animationProgress.setValue(1); // Reset if the line is still dashed
    }
  };

  const refreshLineStyle = () => {
    setIsDashed(true);
    animationProgress.setValue(1); // Reset animation progress
  };

  return (
    <View style={styles.container}>
      {/* Line */}
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.lineContainer}
      >
        <Animated.View
          style={[
            styles.line,
            {
              borderStyle: isDashed ? "dashed" : "solid",
              borderWidth: animationProgress.interpolate({
                inputRange: [0, 1],
                outputRange: [2, 1], // Start at dashed (2px width), go to solid
              }),
              opacity: animationProgress.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.8], // Optional opacity effect
              }),
            },
          ]}
        />
      </TouchableOpacity>

      {/* Refresh Button */}
      <TouchableOpacity style={styles.refreshButton} onPress={refreshLineStyle}>
        <Text style={styles.refreshButtonText}>Refresh</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  lineContainer: {
    width: "80%",
    marginBottom: 30,
  },
  line: {
    width: "100%",
    height: 2,
    borderColor: "#000",
  },
  refreshButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
  },
  refreshButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default App;
