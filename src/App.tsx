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

import { getWorkouts } from "./services/workoutService";

import './App.css';
import NavBar from "./components/Navbar";
import Workout from "./components/Workout";

function App() {
  // A profileID with workouts
  const profileID = "60ADE84C-4079-47E9-1074-08D92F464040"

  useEffect(() => {
    const getWorkouts = async () => {
      const workoutsFromServer = await fetchWorkouts()
      setWorkouts(workoutsFromServer)
    }
    getWorkouts()

    const getProfiles = async () => {
      const profilesFromServer = await fetchProfiles()
      setProfiles(profilesFromServer)
    }
    getProfiles()

    const getWorkoutHistory = async () => {
      const workoutHistory = await fetchWorkoutHistory()
      setWorkoutHistory(workoutHistory)
    }
    getWorkoutHistory()

    const getGoals = async () => {
      const goals = await fetchGoals()
      setGoals(goals)
    }
    getGoals()

  }, [])



  // Fetch Data
  // This uses the fetch api with async await
  const fetchWorkouts = async () => {
    // res is response. fetech returns a promise so we want to await that promise
    const res = await fetch(`https://localhost:44315/api/profiles/${profileID}/workouts`)
    // This gives us all of the json data
    const data = await res.json()
    // const tia = data.filter((name: string | string[]) => name.includes('Running'))
    return data
  }

  const fetchWorkout = async (id: any) => {
    const res = await fetch(`https://localhost:44315/api/workouts/`)
    const data = await res.json()

    return data
  }

  const fetchProfiles = async () => {
    const res = await fetch(`https://localhost:44315/api/profiles/`)
    const data = await res.json()
    return data[0];
    return data.find((x: any) => x.id === '60ade84c-4079-47e9-1074-08d92f464040');
  }

  const fetchWorkoutHistory = async () => {
    const res = await fetch(`https://localhost:44315/api/profiles/${profileID}/workoutHistory`)
    const data = await res.json()
    return data
  }

  const fetchGoals = async () => {
    const res = await fetch(`https://localhost:44315/api/profiles/${profileID}/goals`)
    const data = await res.json()
    return data
  }

  // To use a backend
  const [workouts, setWorkouts] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [workoutHistories, setWorkoutHistory] = useState([]);
  const [goals, setGoals] = useState([]);


  return (

    <Router>
      <NavBar />
      <div className="container">
        <Header title="HR Training" ></Header>
        <Switch>
          <Route path='/' exact render={(props) => (
            <div >
              <Home workouts={workouts} />
            </div>
          )} />

          <Route path='/profile' render={(props) => (
            <>
              <Profile profile={profiles} />
            </>
          )} />

          <Route path='/workout-history' exact render={(props) => (
            <>
              <WorkoutHistory workoutHistory={workoutHistories} />
            </>
          )} />

          <Route path='/workouts' exact render={(props) => (
            <>
              <Workouts workouts={workouts} />
            </>
          )} />

          <Route path='/activity/:id' exact render={(props) => (
            <>
              <Activity activity />
            </>
          )} />

          <Route path='/workout-history/:id' exact render={(props) => (
            <>
              <WorkoutHistoryDetail workoutHistory />
            </>
          )} />

          {/* <Route path='/workouts/:id' exact render={(props) => (
            <>
              <Workout workout={workouts} sendWorkoutToParent />
            </>
          )} /> */}

          <Route path='/goals' exact render={(props) => (
            <>
              <Goals goals={goals} />
            </>
          )} />

          <Route path='/settings' exact render={(props) => (
            <>
              <Settings />
            </>
          )} />


        </Switch>

      </div>
    </Router>
  );
}

export default App;
