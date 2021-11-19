import { useParams } from "react-router";
import useFetch from "../services/useFetch";
import { useState, useEffect } from "react";
import Goal from "../components/Goals";
import { useHistory } from "react-router-dom";

const ActivityHistory = ({ activityHistory }) => {

    const { id, workoutHistoryId, activityHistoryId } = useParams();
    let { data: activityHistoryFromServer, loading, error } = useFetch(`https://localhost:44315/api/profile/${id}/workoutHistory/${workoutHistoryId}/activityHistory/${activityHistoryId}`);
    debugger;
    const [name, setName] = useState(activityHistoryFromServer?.name);
    const [instructions, setInstructions] = useState(activityHistoryFromServer?.instructions);
    const [targets, setTargets] = useState(activityHistoryFromServer?.targets);
    const [duration, setDuration] = useState(activityHistoryFromServer?.duration);
    const [startTime, setStartTime] = useState(activityHistoryFromServer?.startTime);
    const [activityStatistics, setActivityStatistics] = useState(activityHistoryFromServer?.activityStatistics);

    const history = useHistory();

    useEffect(() => {
        setName(activityHistoryFromServer?.name);
        setInstructions(activityHistoryFromServer?.instructions);
        setDuration(activityHistoryFromServer?.duration);
    }, [activityHistoryFromServer] // A list of reasons the useEffect should run. It is the dependency array.
    );

    if (loading) return <p>Loading...</p>

    const SaveActivityHistoryDetail = async (e) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                instructions: instructions,
                duration: duration
            })
        };
        const response = await fetch(`https://localhost:44315/api/profile/${id}/workoutHistory/${workoutHistoryId}/activityHistory/${activityHistoryId}`, requestOptions);
        const data = await response.json();
        activityHistoryFromServer = data;
    }

    return (
        <>
            <h4>Activity History Detail</h4>
            <form noValidate autoComplete="off">
                <div style={{ padding: "10px 20px" }}>
                    <label >
                        Activity: <input type="text" name="type" value={activityHistoryFromServer?.name} onChange={(e) => {
                            setName(e.target.value);
                            activityHistoryFromServer.name = e.target.value;
                        }} disabled />
                    </label>
                </div>
                <div style={{ padding: "10px 20px" }}>
                    <label>
                        Instructions: <textarea name="instructions" value={activityHistoryFromServer?.instructions} rows="5" onChange={(e) => {
                            setInstructions(e.target.value);
                            activityHistoryFromServer.instructions = e.target.value;
                        }} readOnly />
                    </label>
                </div>
                <div style={{ padding: "10px 20px" }}>
                    <label>
                        Duration: <input type="text" name="duration" value={activityHistoryFromServer?.duration} onChange={(e) => {
                            setDuration(e.target.value);
                            activityHistoryFromServer.duration = e.target.value;
                        }} readOnly />
                    </label>
                </div>
                {/* <input type="button" value="Save"
                    onClick={(e) => SaveActivityHistoryDetail(e.target.value)}
                /> */}
                <input type="button" value="Back up"
                    onClick={(e) => history.goBack()}
                    style={{ marginLeft: "10px" }}
                />
                <br></br>
                <section style={{ paddingTop: "25px" }}>
                    <label>
                        Goal:
                        <Goal goal={activityHistoryFromServer?.goal} />
                    </label>
                </section>
            </form>
        </>

    )


}

export default ActivityHistory