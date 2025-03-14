import { Droppable } from "@hello-pangea/dnd";
import { Grid, Paper, Typography, Box } from "@mui/material";
import TaskItem from "./TaskItem";
import { useTasks } from "@/context/TaskContext";
import { motion } from "framer-motion";

type TaskListProps = {
  status: string;
  title: string;
  color: string;
};

const TaskList: React.FC<TaskListProps> = ({ status, title, color }) => {
  const { tasks } = useTasks();

  return (
    <Droppable droppableId={status}>
      {(provided, snapshot) => (
        <Grid item xs={12} sm={4}>
          <motion.div
            style={{ maxHeight: "350px", overflowY: "auto" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Paper
              ref={provided.innerRef}
              {...provided.droppableProps}
              sx={{
                padding: 2,
                backgroundColor: color,
                borderRadius: "12px",
                minHeight: "300px",
                transition: "background 0.3s",
                boxShadow: snapshot.isDraggingOver ? "0px 0px 12px rgba(0,0,0,0.2)" : "none",
              }}
            >
              <Typography variant="h6" textAlign="center">
                {title}
              </Typography>

              <Box sx={{ marginTop: 2 }}>
                {tasks
                  .filter((task) => task.status === status)
                  .map((task, index) => (
                    <TaskItem key={task.id} task={task} index={index} />
                  ))}
                {provided.placeholder}
              </Box>
            </Paper>
          </motion.div>
        </Grid>
      )}
    </Droppable>
  );
};

export default TaskList;
