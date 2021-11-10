import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header'
import Workouts from './components/Workouts';
import Profile from './components/Profile';
import WorkoutHistory from './components/WorkoutHistory';
import WorkoutHistoryDetail from "./components/WorkoutHistoryDetail";
import Home from "./components/Home";
import Goals from "./components/Goals";
import Settings from "./components/Settings";
import Activity from "./components/Activity";
import './App.css';
import NavBar from "./components/NavigationBar";
import { fetchWorkouts, fetchWorkoutById, fetchProfile, fetchWorkoutHistory, fetchGoals, fetchProfileSettings } from "./services/HRService";
import Workout from "./components/Workout";

function App() {
  const profileID = "60ADE84C-4079-47E9-1074-08D92F464040"

  useEffect(() => {
    const getWorkouts = async () => {
      const workoutsFromServer = await fetchWorkouts(profileID);
      setWorkouts(workoutsFromServer);
    }
    getWorkouts()

    const getProfile = async () => {
      const profileFromServer = await fetchProfile(profileID)
      setProfile(profileFromServer)
    }
    getProfile()

    const getWorkoutHistory = async () => {
      const workoutHistory = await fetchWorkoutHistory(profileID)
      setWorkoutHistory(workoutHistory)
    }
    getWorkoutHistory()

    const getGoals = async () => {
      const goals = await fetchGoals(profileID)
      setGoals(goals)
    }
    getGoals()

    const getProfileSettings = async () => {
      const settings = await fetchProfileSettings(profileID);
      setProfileSettings(settings);
    }
    getProfileSettings();

    const getWorkout = async () => {
      const workouts = await fetchWorkouts(profileID);
      const workout = await fetchWorkoutById(profileID, workouts[0]?.id);
      setSelectedWorkout(workout);
    }
    getWorkout();

  }, [])

  // To use a backend
  const [workouts, setWorkouts] = useState([]);
  const [profile, setProfile] = useState([]);
  const [workoutHistories, setWorkoutHistory] = useState([]);
  const [goals, setGoals] = useState([]);
  const [profileSettings, setProfileSettings] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  // Select Workout
  const selectWorkout = (workout) => {
    setSelectedWorkout(workout);
  }

  return (
    <Router>
      <NavBar />
      <div className="container">
        <Header title="HR Training" ></Header>
        <Switch>
          <Route path='/' exact render={(props) => (
            <div >
              <Home selectedWorkout={selectedWorkout} />
            </div>
          )} />

          <Route path='/profile/:id' render={() => (
            <>
              <Profile profile={profile} />
            </>
          )} />

          <Route path='/workout-history' exact render={() => (
            <>
              <WorkoutHistory workoutHistory={workoutHistories} />
            </>
          )} />

          <Route path='/:id/workouts/:workoutId' exact render={() => (
            <>
              <Workouts workouts={workouts} selectedWorkout={selectedWorkout} onWorkoutSelection={selectWorkout} />
            </>
          )} />

          <Route path='/activity/:id' exact render={() => (
            <>
              <Activity activity />
            </>
          )} />

          <Route path='/workout-history/:id' exact render={() => (
            <>
              <WorkoutHistoryDetail workoutHistory />
            </>
          )} />

          <Route path='/profiles/:id/goals' exact render={() => (
            <>
              <Goals goals={goals} />
            </>
          )} />

          <Route path='/profiles/:id/settings/' exact render={() => (
            <>
              <Settings profileSettings={profileSettings} />
            </>
          )} />


        </Switch>

      </div>
    </Router>
  );
}

export default App;
