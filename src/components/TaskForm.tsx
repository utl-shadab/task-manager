import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useTasks } from "@/context/TaskContext";

const TaskForm = () => {
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const { addTask } = useTasks();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTask({
        id: Date.now().toString(),
        text,
        date,
        status: "pending",
      });
      setText("");
      setDate("");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: 2,
        mt: 3,
        alignItems: "center",
      }}>
      <TextField fullWidth label="New Task" value={text} onChange={(e) => setText(e.target.value)} required />
      <TextField fullWidth type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <Button type="submit" variant="contained" sx={{ px: 10 , py: { xs: 1, sm: 2 } }}> Add+</Button>
    </Box>
  );
};

export default TaskForm;
