import { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Activities from './Activities';
import { Button, TextField, Container, Typography } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { useParams } from "react-router";
import useFetch from '../services/useFetch';
// import { fetchWorkoutById } from "../services/HRService";

const useStyles = makeStyles({
    field: {
        marginTop: 20,
        marginBottom: 20,
        display: 'block'
    }
});

const Workout = ({ workout, onWorkoutSelection, createWorkout }) => {
    const { id, workoutId } = useParams();
    const classes = useStyles();

    let { data: workoutData, loading } = useFetch(`https://localhost:44315/api/profiles/${id}/workouts/${workoutId}`);

    const [name, setName] = useState(workoutData?.name);
    const [description, setDescription] = useState(workoutData?.description);
    const [activities, setActivities] = useState(workoutData?.activities);

    const updateActivities = async (changedActivities) => { // the callback.
        setActivities(changedActivities);
    };

    const history = useHistory();
    const alert = useAlert();

    // Anytime workout changes (from dropdown - it will update the form fields)
    useEffect(() => {
        // This says call get workout after each render
        // fetchWorkoutById(id).then((response) => setWorkoutId(response.id));
        setDescription(workout?.description);
        setName(workout?.name);
        setActivities(workout?.activities);
    }, [workout] // A list of reasons the useEffect should run. It is the dependency array.
    );

    if (loading) return <p>Loading...</p>

    const handleSaveWorkout = async (e) => {
        const requestOptions = {
            method: (workout.id !== undefined) ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, description: description, activities: activities })
        };
        const response = (workout.id !== undefined) ? await fetch(`https://localhost:44315/api/profiles/${id}/workouts/${workoutId}`, requestOptions)
            : await fetch(`https://localhost:44315/api/profiles/${id}/workouts/`, requestOptions);
        const data = await response.json();
        workoutData = data;

        setName(data.name);
        setDescription(data.description);
        setActivities(data.activities);
        onWorkoutSelection(data);
        window.history.replaceState(null, `Workouts Page Title`, `/${id}/workouts/${data.id}`)
        alert.show("Workout Saved");
    }

    // Select workout and go to Home
    const selectWorkout = (workout) => {
        onWorkoutSelection(workout);
        history.push('/');
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
                            let newWorkout = { name: name, description: description, id: workout.id, activities: activities };
                            newWorkout.name = e.target.value;
                            createWorkout(newWorkout);
                        }}
                        className={classes.field}
                        label="Name"
                        name="name"
                        variant="outlined"
                        fullWidth
                        required
                        value={workout?.name !== undefined ? name : ''}
                    />
                    <TextField
                        onChange={(e) => {
                            setDescription(e.target.value);
                            workout.description = description;
                            let newWorkout = { name: name, description: description, id: workout.id, activities: activities };
                            newWorkout.description = e.target.value;
                            createWorkout(newWorkout);
                        }}
                        className={classes.field}
                        label="Description"
                        variant="outlined"
                        fullWidth
                        required
                        value={workout?.description !== undefined ? description : ''}
                        name="description"
                        multiline
                    />
                    <section id="activities" style={{ paddingBottom: "20px", color: "orange", display: "inline" }}>
                        {activities?.length > 0 ? "" : <p className="top-margin" style={{ paddingBottom: "10px" }}>*No Activities Associated with Workout*</p>}
                        {<Activities activities={workout?.activities} updateActivities={updateActivities} />}
                    </section>
                    <Button
                        onClick={(e) => { handleSaveWorkout(e.target.value) }}
                        type="button"
                        color="primary"
                        variant="contained"
                        style={{
                            borderRadius: 35,
                            backgroundColor: "#755100",
                        }}
                    > Save</Button>
                    <section id="selectWorkout" style={{ paddingTop: "2px", paddingLeft: "4px", display: "inline" }}>
                        <Button
                            onClick={(e) => { selectWorkout(workout) }}
                            type="button"
                            variant="contained"
                            color="primary"
                            style={{
                                borderRadius: 35,
                                backgroundColor: "#661aff",
                            }}
                        > Select WOrkout</Button>
                    </section>

                </form>
            </Container>
        </>
    )
}

export default Workout
