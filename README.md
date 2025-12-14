
## Features

### Layout & UI
- **3-Column Board Layout**: To-Do (light blue), In-Progress (light yellow), Completed (light green). Each displays draggable task cards.
- **Top Navigation**: App title ("Task Manager") and "Add Task" button (opens modal).
- **Responsive Design**: Flexbox-based; stacks vertically on mobile (<768px), sidebar filters adapt to horizontal row.
- **Classic UI**: Georgia serif font, rounded corners, hover effects, subtle shadows—no modern frameworks like Tailwind.

### Creating Tasks
- Modal popup form for new tasks with fields: Title (required), Description, Priority (dropdown: Low/Medium/High), Due Date (date picker), Status (defaults to To-Do).
- Auto-generates unique ID and creation timestamp (ISO format via dayjs).

### Editing & Deleting Tasks
- Click a task card to open edit modal (pre-fills all fields, including status).
- Update any field and save—refreshes the board instantly.
- Delete button (red, hover-visible) with browser confirm dialog.

### Drag & Drop Functionality
- Powered by react-beautiful-dnd: Drag tasks between boards (e.g., To-Do → In-Progress → Completed).
- Updates task status instantly on drop; supports reverse drags.
- Visual feedback: Cards lift/shadow on drag; placeholders maintain layout.

### Filtering & Sorting
- **Left Sidebar Filters**: Vertical stack with labels for clarity.
  - Priority: All/Low/Medium/High.
  - Due Date: "By" date filter (shows tasks due on/before selected date).
  - Status: All/To-Do/In-Progress/Completed.
- **Sorting Options**: Applied globally after filtering.
  - Newest First (by creation date).
  - Oldest First (by creation date).
  - Closest Due Date (ascending due date).
- Filters/sorts update boards in real-time without page reload.

### Data Handling
- **Initial Load**: Tasks from `src/tasks.json` (example: one high-priority "Design Homepage UI" task).
- **Persistence**: All CRUD/drag-drop changes saved to localStorage as JSON array.
- **Conflict Handling**: If adding a task with a duplicate title in the same board, appends "(1)", "(2)", etc. (normalizes by stripping existing numbers for detection). No "Duplicate Task" badge (used numbering for simplicity).

### Technologies Used
- **Core**: React (functional components, hooks like useState/useEffect).
- **Styling**: Vanilla CSS (no Tailwind).
- **Drag-Drop**: react-beautiful-dnd (optional per spec; handles smooth interactions).
- **Dates**: dayjs (parsing/formatting timestamps).
- **Storage**: localStorage (browser-native, no backend).

## Deployment

### GitHub Pages (Recommended for Static React App)
1. Ensure `package.json` has:
