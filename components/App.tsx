import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

const App = () => {
  const totalDots = 10; // Total number of dots in the line
  const [connectedDots, setConnectedDots] = useState(
    Array(totalDots).fill(false)
  );

  const handleDotPress = (index) => {
    setConnectedDots((prev) => {
      const newDots = [...prev];
      if (index === 0 || newDots[index - 1]) {
        // Connect the dot only if it's the first dot or the previous one is connected
        newDots[index] = true;
      }
      return newDots;
    });
  };

  const resetLine = () => {
    setConnectedDots(Array(totalDots).fill(false)); // Reset all dots to disconnected
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connect the Dotted Line</Text>

      {/* Dotted Line with Connecting Segments */}
      <View style={styles.lineContainer}>
        {Array.from({ length: totalDots }).map((_, index) => (
          <View key={index} style={styles.dotAndLineContainer}>
            {/* Dot */}
            <TouchableOpacity
              style={[
                styles.dot,
                { backgroundColor: connectedDots[index] ? "#000" : "#ccc" },
              ]}
              onPress={() => handleDotPress(index)}
            />
            {/* Line Segment */}
            {index < totalDots - 1 && (
              <View
                style={[
                  styles.lineSegment,
                  {
                    backgroundColor:
                      connectedDots[index] && connectedDots[index + 1]
                        ? "#000"
                        : "#ccc",
                  },
                ]}
              />
            )}
          </View>
        ))}
      </View>

      {/* Reset Button */}
      <TouchableOpacity style={styles.resetButton} onPress={resetLine}>
        <Text style={styles.resetButtonText}>Reset</Text>
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
  title: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#333",
  },
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 30,
  },
  dotAndLineContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: "#ccc",
  },
  lineSegment: {
    width: 20,
    height: 2,
    backgroundColor: "#ccc",
  },
  resetButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  resetButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default App;
