import { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Activities from './Activities';
import { Button, TextField, Container, Typography } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { getWorkout } from "../services/HRService";
import useFetch from "../services/useFetch";

const useStyles = makeStyles({
    field: {
        marginTop: 20,
        marginBottom: 20,
        display: 'block'
    }
});

const Workout = ({ workout, onWorkoutSelection }) => {
    const classes = useStyles();
    const [name, setName] = useState(workout?.name);
    const [description, setDescription] = useState(workout?.description);
    const [activities, setActivities] = useState(workout?.activities);

    const profileID = "60ADE84C-4079-47E9-1074-08D92F464040";

    const sendChangedActivitiesArrayToParent = async (activitiesSentFromChildComponent) => { // the callback. Use a better name.
        setActivities(activitiesSentFromChildComponent);
    };

    const history = useHistory();

    // Anytime workout changes (from dropdown - it will update the form fields)
    useEffect(() => {
        // This says call get workout after each render
        // getWorkout("F1138EDD-87FC-4688-BC5F-042A847871BE").then((response) => setWorkout(response));
        setDescription(workout?.description);
        setName(workout?.name);
        setActivities(workout?.activities);
    }, [workout] // A list of reasons the useEffect should run. It is the dependency array.
    );

    const handleSaveWorkout = async (e) => {
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
        onWorkoutSelection(data);
    }

    // Select workout and go to Home
    const selectWorkout = (workout) => {
        onWorkoutSelection(workout);
        history.push('/');
        debugger;
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
                        {workout?.activities?.length > 0 ? "" : <p className="top-margin" style={{ paddingBottom: "10px" }}>*No Activities Associated with Workout*</p>}
                        {<Activities activities={workout?.activities} sendChangedActivitiesArrayToParent={sendChangedActivitiesArrayToParent} />}
                    </section>
                    <Button
                        onClick={(e) => { debugger; handleSaveWorkout(e.target.value) }}
                        type="button"
                        color="primary"
                        variant="contained"
                    > Save</Button>
                    <section id="selectWorkout" style={{ paddingTop: "20px" }}>
                        <Button
                            onClick={(e) => { selectWorkout(workout) }}
                            type="button"
                            color="red"
                            variant="contained"
                        > Select WOrkout</Button>
                    </section>

                </form>
            </Container>
        </>
    )
}

export default Workout
