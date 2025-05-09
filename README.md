# React Native Timer App

A feature-rich timer management app built using **React Native**. This app allows users to create, manage, and visualize multiple timers grouped by categories with progress tracking, history logging, and customizable alerts.

---

## 📱 Features

### 1. Core Functionality

- **Add Timer**
  - Set name, duration (in seconds), and category.
  - Save timers locally using AsyncStorage.

- **Timer List with Grouping**
  - Timers grouped by categories in collapsible sections.
  - Display each timer's name, remaining time, and status (Running, Paused, Completed).

- **Timer Management**
  - Start, Pause, and Reset individual timers.
  - Timers auto-complete with status update.

- **Progress Visualization**
  - Progress bar or percentage indicator for each timer.

- **Bulk Actions**
  - Start, Pause, or Reset all timers in a category at once.

- **User Feedback**
  - On-screen modal shown when a timer completes with a congratulatory message.

---

### 2. Enhanced Functionality

- **Timer History**
  - Log of completed timers with names and completion timestamps.
  - Accessible on a separate **History Screen**.

- **Customizable Alerts**
  - Optional 50% (halfway) alert for each timer.

---

### 3. Bonus Features (Optional)

- **Export Timer Data**
  - Export timer history as a downloadable JSON file.

- **Custom Themes**
  - Light and Dark mode with a theme switcher.

- **Category Filtering**
  - Dropdown to filter timers by category.

---

## 🧑‍💻 Technical Details

- **State Management**: `useState` or `useReducer`
- **Navigation**: React Navigation with:
  - `Home Screen`: Timer creation, grouping, and control.
  - `History Screen`: Display completed timer logs.
- **Persistence**: AsyncStorage for timers and history.
- **Timers**: `setInterval` for countdown logic.
- **Styling**: Responsive layouts using `StyleSheet`.
