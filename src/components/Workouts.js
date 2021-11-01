import Workout from './Workout'
import { useState, useEffect } from "react";
import { fetchWorkouts, deleteWorkout } from "../services/HRService";
import { Button } from '@material-ui/core';
import { useParams } from "react-router";

const Workouts = ({ workouts, selectedWorkout, onWorkoutSelection, defaultWorkout }) => {
    const [allWorkouts, setWorkouts] = useState(workouts);
    const [workout, setWorkout] = useState(selectedWorkout || defaultWorkout);
    const [createNewWorkout, setCreateNewWorkout] = useState(false);
    const [workoutId, setId] = useState(workout?.id);

    // Select Workout
    const createWorkout = (workout) => {
        setWorkout(workout);
    }

    if (selectedWorkout === null && !createNewWorkout) {
        onWorkoutSelection(defaultWorkout);
    }

    const { id } = useParams();

    useEffect(() => {
        const getWorkouts = async () => {
            const workoutsFromServer = await fetchWorkouts("60ADE84C-4079-47E9-1074-08D92F464040");
            setWorkouts(workoutsFromServer);
        }
        getWorkouts();
        setId(workout.id);
        window.history.replaceState(null, `${workout.name} Page Title`, `/${id}/workouts/${workoutId}`)
    }, [workout, setWorkout, createNewWorkout, workoutId, id])

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
                {workout !== undefined ? <Workout workout={workout} onWorkoutSelection={onWorkoutSelection} createWorkout={createWorkout} />
                    : <p className="top-margin">No Workout Selected</p>}
            </section>
            <section id="addWorkout" style={{ paddingTop: "10px", paddingLeft: "60px", display: "inline-block" }}>
                <Button
                    onClick={(e) => {
                        setCreateNewWorkout(true);
                        setWorkout({});
                        onWorkoutSelection(null);
                    }}

                    type="button"
                    color="primary"
                    variant="contained"
                    style={{
                        borderRadius: 35,
                    }}
                > Add Workout </Button>
            </section>
            <section id="deleteWorkout" style={{ paddingTop: "10px", paddingLeft: "5px", display: "inline-block" }}>
                <Button
                    onClick={(e) => {
                        deleteWorkout(id, workoutId);
                        onWorkoutSelection(allWorkouts[0]);
                        setWorkout(allWorkouts[0]);
                    }}

                    type="button"
                    color="secondary"
                    variant="contained"
                    style={{
                        borderRadius: 35,
                    }}
                > Delete Workout </Button>
            </section>
        </>
    )
}

export default Workouts
