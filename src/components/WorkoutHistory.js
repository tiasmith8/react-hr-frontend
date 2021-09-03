import workoutHistoryImg from '../chart-icon.png'
import runIcon from '../run.png';
import { Link } from 'react-router-dom';


const WorkoutHistory = ({ workoutHistory }) => {

    const workoutHistories = workoutHistory.map((workoutHistory, index) =>
        <div>
            <Link to={{
                pathname: `/workout-history/${workoutHistory.id}`
            }}
                style={{ textDecoration: 'none' }}>

                <h4 key={workoutHistory.name} style={{ color: "steelblue" }}><label style={{ color: "black" }}><img src={runIcon} width="30" height="30" alt="goal icon" />Name: </label>{workoutHistory.name}</h4>
                <h5 key={workoutHistory.description} style={{ color: "red" }}><label style={{ color: "black" }}>Description: </label>{workoutHistory.description}</h5>
                <h6 key={workoutHistory.notes} style={{ marginBottom: "10px" }}><label style={{ color: "black" }}>Notes: </label>{workoutHistory.notes}</h6>
            </Link>
        </div>
    );

    return (
        <>
            <div style={{ paddingBottom: "10px" }}>
                <img src={workoutHistoryImg} width="30" height="30" alt="workout history icon" style={{ marginLeft: "10px", marginRight: "10px" }} />
                <h3 className="workout-history-heading" >Workout History</h3>
            </div>
            {workoutHistories}
        </>
    )
}

export default WorkoutHistory
