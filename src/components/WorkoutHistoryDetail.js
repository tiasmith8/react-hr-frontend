import { useParams } from "react-router"
import useFetch from "../services/useFetch";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { Button, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';

const WorkoutHistoryDetail = ({ workoutHistory }) => {

    const { id, workoutId } = useParams();
    let { data: workoutHistoryDetail, loading, error } = useFetch(`https://localhost:44315/api/profiles/${id}/workoutHistory/${workoutId}`)
    const history = useHistory();
    const alert = useAlert();

    const [name, setName] = useState(workoutHistoryDetail?.name);
    const [description, setDescription] = useState(workoutHistoryDetail?.description);
    const [notes, setNotes] = useState(workoutHistoryDetail?.notes);


    useEffect(() => {
        setName(workoutHistoryDetail?.name);
        setDescription(workoutHistoryDetail?.description);
        setNotes(workoutHistoryDetail?.notes);
    }, [workoutHistoryDetail]);

    if (loading) return <p>Loading...</p>

    const SaveWorkoutHistory = async (e) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                description: description,
                notes: notes
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
            <h4>Workout History Detail</h4>
            <form noValidate autoComplete="off">
                <div style={{ padding: "10px 20px" }}>
                    <h4 style={{ color: "steelblue" }}>
                        <label style={{ color: "green" }}>
                            Name:
                            <input type="text" name="name" value={workoutHistoryDetail?.name}
                                style={{
                                    paddingLeft: "10px", borderTopStyle: "hidden",
                                    borderLeftStyle: "hidden", borderRightStyle: "hidden"
                                }}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    workoutHistoryDetail.name = e.target.value;
                                }} />
                        </label>
                    </h4>
                </div>
                <div style={{ padding: "10px 20px" }}>
                    <h4 style={{ color: "steelblue" }}>
                        <label style={{ color: "black" }}>
                            <span>Description:</span>
                            <TextField
                                style={{ textAlign: "left", paddingLeft: "10px" }}
                                multiline
                                rows={3}
                                name="description"
                                value={workoutHistoryDetail?.description} onChange={(e) => {
                                    setDescription(e.target.value);
                                    workoutHistoryDetail.description = e.target.value;
                                }}
                            />
                        </label>
                    </h4>
                </div>
                <div style={{ padding: "10px 20px" }}>
                    <h4 style={{ color: "steelblue" }}>
                        <label style={{ color: "black" }}>
                            Notes: <TextField
                                style={{ textAlign: 'left', paddingLeft: "10px" }}
                                multiline
                                rows={3}
                                name="notes"
                                value={workoutHistoryDetail?.notes} onChange={(e) => {
                                    setNotes(e.target.value);
                                    workoutHistoryDetail.notes = e.target.value;
                                }}
                            />
                        </label>
                    </h4>
                </div>
                <h5 style={{ padding: "10px 0px" }}>Activities</h5>
                {activities}
                <div style={{ paddingTop: "10px" }}>Goal: {activities.goal?.name}</div>
                <section id="saveWorkoutHistory" style={{ paddingTop: "10px", paddingLeft: "0px", display: "inline-block" }}>
                    <Button
                        onClick={(e) => SaveWorkoutHistory(e.target.value)
                        }
                        type="button"
                        color="primary"
                        variant="contained"
                        style={{
                            borderRadius: 35,
                        }}
                    > Save </Button>
                </section>
                <section id="backUp" style={{ paddingTop: "10px", marginLeft: "10px", display: "inline-block" }}>
                    <Button
                        onClick={(e) => history.goBack()
                        }
                        type="button"
                        variant="outlined"
                        style={{
                            borderRadius: 35,
                        }}
                    > Back </Button>
                </section>
            </form>
        </>
    )
}

export default WorkoutHistoryDetail