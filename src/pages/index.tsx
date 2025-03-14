import { Container, Typography, Grid, Box } from "@mui/material";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import { TaskProvider, useTasks } from "@/context/TaskContext";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";

export default function Home() {
  return (
    <TaskProvider>
      <Container maxWidth="md" sx={{ marginTop: 4, marginBottom:4, }}>
        <Typography variant="h5" textAlign="center" sx={{ marginTop: 4, marginBottom:4, }} gutterBottom>
         Drag and Droppable Task List
        </Typography>
        <TaskStats />
        <TaskForm />
        <TaskDragDropContainer />
      </Container>
    </TaskProvider>
  );
}

const TaskStats = () => {
  const { tasks } = useTasks();

  const statusCount = {
    pending: tasks.filter((task) => task.status === "pending").length,
    inProgress: tasks.filter((task) => task.status === "in-progress").length,
    completed: tasks.filter((task) => task.status === "completed").length,
  };

  return (
    <Grid container spacing={2} sx={{ marginBottom: 2 }}>
      {[
        { label: "Pending", count: statusCount.pending, color: "#FFFF99" },
        { label: "Progress", count: statusCount.inProgress, color: "#FDAE61" },
        { label: "Completed", count: statusCount.completed, color: "#90EE90" },
      ].map((item) => (
        <Grid item xs={4} key={item.label}>
          <Box sx={{ backgroundColor: item.color, padding: 2,borderRadius: "12px",  textAlign: "center" }}>
            <Typography variant="subtitle1">{item.label}</Typography>
            <Typography variant="h5" fontWeight="bold">
              {item.count}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

const TaskDragDropContainer = () => {
  const { moveTask } = useTasks();

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    moveTask(result.draggableId, result.destination.droppableId as "pending" | "in-progress" | "completed");
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Grid container spacing={2} sx={{ marginTop: 3 }}>
        <TaskList status="pending" title="Pending" color="#FFF999" />
        <TaskList status="in-progress" title="In Progress" color="#FDAE61" />
        <TaskList status="completed" title="Completed" color="#90EE90" />
      </Grid>
    </DragDropContext>
  );
};
