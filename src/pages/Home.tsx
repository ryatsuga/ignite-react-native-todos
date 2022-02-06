import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function taskAlreadyExists(title: string): boolean {
    const foundTask = tasks.find((task) => task.title === title);
    if (foundTask) {
      return true;
    }
    return false;
  }

  function handleAddTask(newTaskTitle: string) {
    if (taskAlreadyExists(newTaskTitle)) {
      Alert.alert(
        "Ops, essa tarefa já foi cadastrada",
        "Já existe uma tarefa com esse nome, favor cadastrar nova tarefa com outro nome"
      );
    } else {
      const data = {
        id: Math.random(),
        title: newTaskTitle,
        done: false,
      };
      setTasks((oldTasks) => [...oldTasks, data]);
    }
  }

  function handleToggleTaskDone(id: number) {
    setTasks((oldTasks) =>
      oldTasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover tarefa",
      "Tem certeza que deseja remover essa tarefa?",
      [
        {
          text: "Não",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () =>
            setTasks((oldTasks) => oldTasks.filter((task) => task.id !== id)),
        },
      ]
    );
  }

  function handleUpdateTaskTitle(task: Task, newTitle: string): Task {
    if (taskAlreadyExists(newTitle) && task.title !== newTitle) {
      Alert.alert(
        "Ops, já existe uma tarefa com esse nome",
        "Já existe uma tarefa com esse nome, favor atualizar tarefa com outro nome"
      );
      return task;
    } else {
      const newTask = { ...task, title: newTitle };
      setTasks((oldTasks) =>
        oldTasks.map((t) => (t.id === task.id ? newTask : t))
      );
      return newTask;
    }
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        updateTaskTitle={handleUpdateTaskTitle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
