import { useState, useEffect, setState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Activities from './Activities';
import { Button, TextField, Container, Typography } from '@material-ui/core';
import { getWorkout } from "../services/workoutService";
import useFetch from "../services/useFetch";

const useStyles = makeStyles({
    field: {
        marginTop: 20,
        marginBottom: 20,
        display: 'block'
    }
});

const Workout = ({ workout, sendWorkoutToParent }) => {
    const classes = useStyles();

    const [selectedWorkout, setWorkout] = useState(workout);
    const [name, setName] = useState(workout.name);
    const [description, setDescription] = useState(workout.description);
    const [activities, setActivities] = useState(workout?.activities);

    const profileID = "60ADE84C-4079-47E9-1074-08D92F464040"

    // const { data, loading, error } = useFetch(`https://localhost:44315/api/profiles/${profileID}/workouts/${workout.id}`);

    // Anytime workout changes (from dropdown - it will update the form fields)
    useEffect(() => {
        // This says call get workout after each render
        getWorkout("F1138EDD-87FC-4688-BC5F-042A847871BE").then((response) => setWorkout(response));
        setDescription(workout?.description);
        setName(workout?.name);
        setWorkout(workout);
        setActivities(workout.activities);
    }, [workout] // A list of reasons the useEffect should run. It is the dependency array.
    );

    const handleSubmit = async (e) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, description: description, activities: activities })
        };
        const response = await fetch(`https://localhost:44315/api/profiles/${profileID}/workouts/${workout.id}`, requestOptions);
        const data = await response.json();

        setName(data.name);
        setDescription(data.description);
        setActivities(data.activities);
        setWorkout(data);
        sendWorkoutToParent(data);
    }

    return (
        <>
            <Container>
                <Typography
                    variant="h6"
                    component="h2"
                    gutterBottom
                >
                    Edit Workout
                </Typography>

                <form noValidate autoComplete="off" >
                    <TextField
                        onChange={(e) => {
                            setName(e.target.value);
                            workout.name = name;
                        }}
                        className={classes.field}
                        label="Name"
                        name="name"
                        variant="outlined"
                        fullWidth
                        required
                        value={name}
                    />
                    <TextField
                        onChange={(e) => {
                            setDescription(e.target.value);
                            workout.description = description;
                        }}
                        className={classes.field}
                        label="Description"
                        variant="outlined"
                        fullWidth
                        required
                        value={description}
                        name="description"
                        multiline
                    />
                    <section id="activities" style={{ paddingBottom: "20px", color: "orange" }}>
                        {workout?.activities?.length > 0 ? <Activities activities={workout.activities} /> : <p className="top-margin">*No Activities Associated with Workout*</p>}
                    </section>
                    <Button
                        onClick={(e) => handleSubmit(e.target.value)}
                        type="button"
                        color="primary"
                        variant="contained"
                    > Save</Button>
                </form>


            </Container>
        </>
    )
}

export default Workout
