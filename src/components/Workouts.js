import Workout from './Workout'
import { useState, useEffect } from "react";
import { fetchWorkouts, } from "../services/HRService";

const Workouts = ({ workouts, selectedWorkout, onWorkoutSelection, defaultWorkout }) => {
    const [allWorkouts, setWorkouts] = useState(workouts);
    const [workout, setWorkout] = useState(selectedWorkout || defaultWorkout);

    if (selectedWorkout === null) {
        debugger;
        onWorkoutSelection(defaultWorkout);
    }

    useEffect(() => {
        const getWorkouts = async () => {
            const workoutsFromServer = await fetchWorkouts("60ADE84C-4079-47E9-1074-08D92F464040");
            setWorkouts(workoutsFromServer);
        }
        getWorkouts();
        debugger;
    }, [workout, setWorkout])

    debugger;

    return (
        <>
            <section style={{ paddingBottom: "10px" }}>
                <span style={{ paddingRight: "9px", paddingLeft: "23px", fontWeight: "bold" }}>Select Workout</span>

                <select name="allWorkouts"
                    onChange={(e) => {
                        const workout_id = e.target.value;
                        const changeToThisWorkout = allWorkouts.find(e => e.id === workout_id);
                        onWorkoutSelection(changeToThisWorkout);
                        setWorkout(changeToThisWorkout);
                    }}

                >
                    <option key={selectedWorkout?.id} value={selectedWorkout?.id} selected>{selectedWorkout?.name}</option>
                    {allWorkouts.filter(workout => workout.id !== selectedWorkout?.id).map((workout, id) =>
                        <option key={workout.id} value={workout.id}>
                            {workout.name}
                        </option>
                    )};

                </select>
            </section>

            <section id="selectWorkout">
                {workout !== undefined ? <Workout workout={workout} onWorkoutSelection={onWorkoutSelection} />
                    : <p className="top-margin">No Workout Selected</p>}
            </section>
        </>
    )
}

export default Workouts
