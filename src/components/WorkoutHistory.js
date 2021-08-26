import workoutHistoryImg from '../chart-icon.png'

const WorkoutHistory = ({ workoutHistory }) => {

    // const workoutHistories = workoutHistory.map((d) => <div key={d.name}>
    //     <div style={{ fontSize: "1em", color: "red" }}>
    //         <span style={{ color: "black" }}>Name: </span>{d.name}</div>
    //     <p style={{ marginTop: "5px" }}>Description: {d.description}</p>
    // </div>);

    const wheel = workoutHistory.map((d) =>
        <div>
            <h4 key={d.name} style={{ color: "steelblue" }}><label style={{ color: "black" }}>Name: </label>{d.name}</h4>
            <h5 key={d.description} style={{ color: "red"}}><label style={{ color: "black" }}>Description: </label>{d.description}</h5>
            <h6 key={d.notes} style={{ marginBottom: "10px" }}><label style={{ color: "black" }}>Notes: </label>{d.notes}</h6>
        </div>
    );

    return (
        <>
            <div style={{paddingBottom: "10px"}}>
                <img src={workoutHistoryImg} width="30" height="30" alt="workout history icon" style={{ marginLeft: "10px", marginRight: "10px" }} />
                <h3 className="workout-history-heading" >Workout History</h3>
            </div>
            {wheel}
        </>
    )
}

export default WorkoutHistory
