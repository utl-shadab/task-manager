import { Draggable } from "@hello-pangea/dnd";
import { ListItem, ListItemText, IconButton, Checkbox, Box } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useTasks } from "@/context/TaskContext";
import { motion } from "framer-motion";

type TaskItemProps = {
  task: {
    id: string;
    text: string;
    date: string;
    status: string;
  };
  index: number;
};

const TaskItem: React.FC<TaskItemProps> = ({ task, index }) => {
  const { deleteTask, moveTask } = useTasks();

  const handleCheckboxChange = () => {
    moveTask(task.id, "completed");
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Box

          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{
            opacity: snapshot.isDragging ? 0.6 : 1,
            
            transform: snapshot.isDragging ? "scale(1.05)" : "none",
            transition: "transform 0.2s ease",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
          >
            <ListItem
              sx={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                marginBottom: "8px",
                padding: "10px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              }}
            >
              <Checkbox checked={task.status === "completed"} onChange={handleCheckboxChange} />
              <ListItemText primary={task.text} secondary={task.date} />
              <IconButton onClick={() => deleteTask(task.id)}>
                <Delete />
              </IconButton>
            </ListItem>
          </motion.div>
        </Box>
      )}
    </Draggable>
  );
};

export default TaskItem;
