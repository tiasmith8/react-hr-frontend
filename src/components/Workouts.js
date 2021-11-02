import Workout from './Workout'
import { useState, useEffect } from "react";
import { fetchWorkouts, deleteWorkout, fetchWorkoutById } from "../services/HRService";
import { Button } from '@material-ui/core';
import { useParams } from "react-router";

const Workouts = ({ workouts, selectedWorkout, onWorkoutSelection, defaultWorkout }) => {
    const [allWorkouts, setWorkouts] = useState(workouts || []);
    const [workout, setWorkout] = useState(selectedWorkout || defaultWorkout || {});
    const [createNewWorkout, setCreateNewWorkout] = useState(false);
    const [selectedWorkoutId, setId] = useState(workout?.id || null);

    // Select Workout
    const createWorkout = (workout) => {
        setWorkout(workout);
    }

    const { id, workoutId } = useParams();

    const getWorkoutById = async () => {
        const workoutsFromServer = await fetchWorkouts(id);
        setWorkouts(workoutsFromServer);
        const workoutFromUrl = await fetchWorkoutById(id, workoutId);
        onWorkoutSelection(workoutFromUrl);
        setWorkout(workoutFromUrl);
        debugger;
    }

    if (selectedWorkout === null && !createNewWorkout) {
        debugger;
        if (defaultWorkout)
            onWorkoutSelection(defaultWorkout);
        else {
            getWorkoutById();
        }
    }

    useEffect(() => {
        const getWorkouts = async () => {
            const workoutsFromServer = await fetchWorkouts(id);
            setWorkouts(workoutsFromServer);
        }
        getWorkouts();
        setId(workout?.id ?? workoutId);
        window.history.replaceState(null, `Workouts Page Title`, `/${id}/workouts/${selectedWorkoutId}`)
    }, [workout, setWorkout, createNewWorkout, selectedWorkoutId, id, workoutId])

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
                        deleteWorkout(id, selectedWorkoutId);
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
