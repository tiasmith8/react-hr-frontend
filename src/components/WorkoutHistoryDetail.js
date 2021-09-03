import { useParams } from "react-router"
import useFetch from "../services/useFetch";
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

const WorkoutHistoryDetail = ({ workoutHistory }) => {

    const { id } = useParams();
    const profileId = "60ADE84C-4079-47E9-1074-08D92F464040";
    let { data: workoutHistoryDetail, loading, error } = useFetch(`https://localhost:44315/api/profiles/${profileId}/workoutHistory/${id}`)
    const history = useHistory();

    if (loading) return <p>Loading...</p>

    const activities = workoutHistoryDetail.activityHistories?.map((activity, index) =>

        <div>
            <div><b>Activity name:</b> {activity.name}</div>
            <div>Instructions: {activity.instructions}</div>
            <div><b>Duration:</b> {activity.duration}</div>
            <div><b>Start Time:</b> {activity.startTime}</div>
        </div>
    );

    debugger;

    return (
        <>
            <h4>Workout History Detail</h4>
            <h5 style={{ padding: "10px 0px" }}>Activities</h5>

            {activities}
            <div style={{ paddingTop: "10px" }}>Notes: {workoutHistoryDetail.notes}</div>
            <div style={{ paddingTop: "10px" }}>Goal: {activities.goal?.name}</div>
            {/* <div style={{ padding: "10px 20px" }}>
                <label >
                    Activity: <input type="text" name="type" value={activityDetail.name} onChange={(e) => {
                        debugger;
                        setName(e.target.value);
                        activityDetail.name = e.target.value;
                    }} />
                </label>
            </div>
            {/* <div style={{ padding: "10px 20px" }}>
                    <label>
                        Name: <input type="text" name="name" value={name} />
                    </label>
                </div> */}
            {/* <div style={{ padding: "10px 20px" }}>
                <label>
                    Instructions: <textarea name="instructions" value={activityDetail.instructions} rows="5" onChange={(e) => {
                        setInstructions(e.target.value);
                        activityDetail.instructions = e.target.value;
                    }} />
                </label>
            </div>
            <div style={{ padding: "10px 20px" }}>
                <label>
                    Duration: <input type="text" name="duration" value={activityDetail.duration} onChange={(e) => {
                        setDuration(e.target.value);
                        activityDetail.duration = e.target.value;
                    }} />
                </label>
            </div>
            <input type="button" value="Save"
                onClick={(e) => SaveActivityDetail(e.target.value)}
            />
            <input type="button" value="Back up"
                onClick={(e) => history.goBack()}
                style={{ marginLeft: "10px" }}
            />
            <br></br>
            <section style={{ paddingTop: "25px" }}>
                <label>
                    Goal:
                    <Goal goal={activityDetail?.goal} />
                </label>
            </section> */}
        </>
    )
}

export default WorkoutHistoryDetail