import Workout from './Workout'
import { useState } from "react";

const Workouts = ({ workouts }) => {
    const [selectedWorkout, setWorkout] = useState(workouts[0]); // the lifted state
    const [allWorkouts, setWorkouts] = useState(workouts);
    var workout = {};

    const sendWorkoutToParent = async (workoutSentFromChildComponent) => { // the callback. Use a better name.
        setWorkout(workoutSentFromChildComponent);
        // fetch workouts again
        const profileID = "60ADE84C-4079-47E9-1074-08D92F464040"
        const res = await fetch(`https://localhost:44315/api/profiles/${profileID}/workouts`)
        const data = await res.json()
        setWorkouts(data);
    };

    return (
        <>
            <section style={{ paddingBottom: "10px" }}>
                <span style={{ paddingRight: "9px", paddingLeft: "23px", fontWeight: "bold" }}>Select Workout</span>

                <select name={allWorkouts}
                    onChange={(e) => {
                        workout = allWorkouts[e.target.value];
                        setWorkout(workout);
                    }}
                >
                    {allWorkouts.map((workout, i) =>
                        <option key={i} value={i}>
                            {workout.name}
                        </option>
                    )};

                </select>
            </section>

            <section id="selectedWorkout">
                {allWorkouts.length > 0 ? <Workout workout={selectedWorkout} sendWorkoutToParent={sendWorkoutToParent} />
                    : <p className="top-margin">No Workouts To Show</p>}
            </section>
        </>
    )
}

export default Workouts
