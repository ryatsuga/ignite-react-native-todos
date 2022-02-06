import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Task } from "./TasksList";
import trashIcon from "../assets/icons/trash/trash.png";

interface TaskItemProps {
  index: number;
  item: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  updateTaskTitle: (task: Task, newTitle: string) => Task;
}

export function TaskItem({
  index,
  item,
  toggleTaskDone,
  removeTask,
  updateTaskTitle,
}: TaskItemProps) {
  const currentTitle = item.title;
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(item.title);
  const textInputRef = useRef<TextInput>(null);

  function handleTaskEditing() {
    setIsEditing(true);
  }

  function handleCancelTaskEditing() {
    setNewTitle(currentTitle);
    setIsEditing(false);
  }

  function handleSubmitTaskEditing(task: Task, newTitle: string) {
    const updatedTask = updateTaskTitle(task, newTitle);
    setIsEditing(false);
    setNewTitle(updatedTask.title);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing]);

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(item.id)}
        >
          <View
            testID={`marker-${index}`}
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {item.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            ref={textInputRef}
            editable={isEditing}
            onChangeText={setNewTitle}
            value={newTitle}
            onSubmitEditing={() => handleSubmitTaskEditing(item, newTitle)}
            style={item.done ? styles.taskTextDone : styles.taskText}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={{ paddingRight: 14, paddingTop: 2 }}
          onPress={isEditing ? handleCancelTaskEditing : handleTaskEditing}
        >
          <Icon name={isEditing ? "x" : "edit-3"} size={19} color="#B2B2B2" />
        </TouchableOpacity>

        <TouchableOpacity
          testID={`trash-${index}`}
          onPress={() => removeTask(item.id)}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
  buttons: {
    paddingHorizontal: 24,
    flexDirection: "row",
  },
});
