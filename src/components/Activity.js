import { useParams } from "react-router";
import useFetch from "../services/useFetch";
import Goal from "../components/Goals";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Activity = ({ activity }) => {
    const { id } = useParams();
    let { data: activityDetail, loading, error } = useFetch(`https://localhost:44315/api/activities/${id}`);

    const [name, setName] = useState(activityDetail?.name);
    const [instructions, setInstructions] = useState(activityDetail?.instructions);
    const [duration, setDuration] = useState(activityDetail?.duration);

    const history = useHistory();

    // Anytime values change for activityDetail, update the stuff
    useEffect(() => {
        setName(activityDetail?.name);
        setInstructions(activityDetail?.instructions);
        setDuration(activityDetail?.duration);
    }, [activityDetail] // A list of reasons the useEffect should run. It is the dependency array.
    );

    if (loading) return <p>Loading...</p>

    const SaveActivityDetail = async (e) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                // name: `${activityDetail?.name}`,
                // description: `${activityDetail?.description}`,
                // duration: `${activityDetail?.duration}`
                name: name,
                instructions: instructions,
                duration: duration
            })
        };
        const response = await fetch(`https://localhost:44315/api/activities/${activityDetail.id}`, requestOptions);
        const data = await response.json();
        activityDetail = data;
    }



    return (
        <>
            <h4>Activity Detail</h4>
            <form noValidate autoComplete="off">
                <div style={{ padding: "10px 20px" }}>
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
                <div style={{ padding: "10px 20px" }}>
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
                </section>
            </form>
        </>
    )
}

export default Activity