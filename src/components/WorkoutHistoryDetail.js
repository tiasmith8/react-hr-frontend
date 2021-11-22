import { useParams } from "react-router"
import { makeStyles } from '@material-ui/core/styles';
import useFetch from "../services/useFetch";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { Button, TextField, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import runIcon from '../Run-icon.png';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    field: {
        marginTop: 20,
        marginBottom: 20,
        display: 'block'
    }
});

const WorkoutHistoryDetail = ({ workoutHistory }) => {

    const { id, workoutId } = useParams();
    let { data: workoutHistoryDetail, loading, error } = useFetch(`https://localhost:44315/api/profiles/${id}/workoutHistory/${workoutId}`)
    const history = useHistory();
    const alert = useAlert();

    const [name, setName] = useState(workoutHistoryDetail?.name);
    const [description, setDescription] = useState(workoutHistoryDetail?.description);
    const [notes, setNotes] = useState(workoutHistoryDetail?.notes);
    const [activityHistories, setActivityHistories] = useState(workoutHistoryDetail?.activityHistories);

    const classes = useStyles();

    useEffect(() => {
        setName(workoutHistoryDetail?.name);
        setDescription(workoutHistoryDetail?.description);
        setNotes(workoutHistoryDetail?.notes);
        setActivityHistories(workoutHistoryDetail?.activityHistories);
    }, [workoutHistoryDetail]);

    if (loading) return <p>Loading...</p>

    const SaveWorkoutHistory = async (e) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                description: description,
                notes: notes,
                activityHistories: activityHistories
            })
        };
        const response = await fetch(`https://localhost:44315/api/profiles/${id}/workoutHistory/${workoutId}`, requestOptions);
        const data = await response.json();
        workoutHistoryDetail = data;

        alert.show("Workout Updated");
    }

    const activities = workoutHistoryDetail.activityHistories?.map((activity, index) =>
        <div>
            <div><b>Activity name:</b> {activity.name}</div>
            <div>Instructions: {activity.instructions}</div>
            <div><b>Duration:</b> {activity.duration}</div>
            <div><b>Start Time:</b> {activity.startTime}</div>
        </div>
    );

    return (
        <>
            <Container>
                <Typography
                    variant="h6"
                    component="h2"
                    gutterBottom
                >
                    Edit Workout History
                </Typography>

                <form noValidate autoComplete="off" >
                    <TextField
                        onChange={(e) => {
                            setName(e.target.value);
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
                    <section id="activities" style={{ paddingBottom: "20px", color: "#ff00bf", display: "inline" }}>
                        {activityHistories?.length > 0 ? "" : <p className="top-margin" style={{ paddingBottom: "10px" }}>*No Activities Associated with Workout*</p>}
                        {/* {activities} */}
                        {/* {<Activities activities={activities} />} */}
                        <TableContainer component={Paper}>
                            <Table className={classes.table} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell align="left">Activity</TableCell>
                                        <TableCell align="left">Duration</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {activityHistories?.map((activity, index) => (
                                        <TableRow key={activity.id}>
                                            <TableCell component="th" scope="row">
                                                <Link to={{
                                                    pathname: `/${id}/workout-history/${workoutHistoryDetail.id}/activity-history/${activity.id}`
                                                }}
                                                    style={{ textDecoration: 'none' }}>
                                                    <img src={runIcon} width="30" height="30" alt="goal icon" />
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    label="Name"
                                                    name="name"
                                                    variant="outlined"
                                                    value={activity.name}
                                                    inputProps={{ readOnly: true, disableUnderline: true }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    // className={classes.field}
                                                    label="Duration"
                                                    name="duration"
                                                    variant="outlined"
                                                    value={activity.duration}
                                                    inputProps={{ readOnly: true, disableUnderline: true }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </section>
                    <Button
                        onClick={(e) => { SaveWorkoutHistory(e.target.value) }}
                        type="button"
                        color="primary"
                        variant="contained"
                        style={{
                            borderRadius: 35,
                            backgroundColor: "#004d00",
                            marginTop: "10px"
                        }}
                    > Save</Button>
                    <section id="backUp" style={{ display: "inline-block" }}>
                        <Button
                            onClick={(e) => history.goBack()
                            }
                            type="button"
                            variant="outlined"
                            style={{
                                borderRadius: 35, marginLeft: "20px", marginTop: "10px", backgroundColor: "#000099", color: "white"
                            }}
                        > Back </Button>
                    </section>
                </form>
            </Container>
        </>
    )
}

export default WorkoutHistoryDetail