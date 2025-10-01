import React, { useState } from "react";
import {SafeAreaView, View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet} from "react-native";

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { id: Date.now().toString(), text: task, done: false }]);
    setTask("");
  };


  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };


  const startEditing = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };


  const saveEdit = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, text: editingText } : t
      )
    );
    setEditingId(null);
    setEditingText("");
  };

  const renderTask = ({ item }) => (
    <View style={styles.taskContainer}>
      <TouchableOpacity
        style={[styles.checkbox, item.done && styles.checkedBox]}
        onPress={() => toggleTask(item.id)}
      >
        {item.done && <Text style={styles.checkmark}>✔</Text>}
      </TouchableOpacity>
      {editingId === item.id ? (
        <TextInput
          style={styles.editInput}
          value={editingText}
          onChangeText={setEditingText}
          onSubmitEditing={() => saveEdit(item.id)}
          autoFocus
        />
      ) : (
        <TouchableOpacity onPress={() => startEditing(item.id, item.text)}>
          <Text
            style={[
              styles.taskText,
              item.done && { textDecorationLine: "line-through", color: "gray" },
            ]}
          >
            {item.text}
          </Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <Text style={styles.delete}>X</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>To Do List</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={task}
          onChangeText={setTask}
          placeholder="Enter a task"
        />
        <TouchableOpacity style={styles.addBtn} onPress={addTask}>
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  inputContainer: { flexDirection: "row", marginBottom: 15 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  addBtn: {
    backgroundColor: "#4CAF50",
    marginLeft: 10,
    borderRadius: 8,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  addText: { fontSize: 20, color: "#fff", fontWeight: "bold" },
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#555",
    borderRadius: 6,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  checkedBox: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  checkmark: { color: "white", fontSize: 16 },
  taskText: { flex: 1, fontSize: 16 },
  editInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#aaa",
    fontSize: 16,
    padding: 0,
  },
  delete: { fontSize: 18, color: "red", marginLeft : 10  },
});
