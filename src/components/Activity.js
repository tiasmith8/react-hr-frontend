import { useParams } from "react-router";
import useFetch from "../services/useFetch";
import Goal from "../components/Goals";
import { useState, useEffect } from "react";
// import Spinner from "./Spinner";

const Activity = ({ activity }) => {
    const { id } = useParams();
    let { data: activityDetail, loading, error } = useFetch(`https://localhost:44315/api/activities/${id}`);

    const [name, setName] = useState(activityDetail?.name);
    const [instructions, setInstructions] = useState(activityDetail?.description);
    const [duration, setDuration] = useState(activityDetail?.duration);

    if (loading) return <p>Loading...</p>

    debugger;
    const SaveActivityDetail = async (e) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: `${activityDetail?.name}`,
                description: `${activityDetail?.description}`,
                duration: `${activityDetail?.duration}`
            })
        };
        debugger;
        const response = await fetch(`https://localhost:44315/api/activities/${activityDetail.id}`, requestOptions);
        const data = await response.json();
        debugger;

        activityDetail = data;
    }

    debugger;

    return (
        <>
            <h4>Activity Detail</h4>
            <form noValidate autoComplete="off">
                <div style={{ padding: "10px 20px" }}>
                    <label >
                        Activity: <input type="text" name="type" value={name} onChange={(e) => {
                            setName(e.target.value);
                            activityDetail.name = name;
                        }} />
                    </label>
                </div>
                <div style={{ padding: "10px 20px" }}>
                    <label>
                        Name: <input type="text" name="name" value={name} />
                    </label>
                </div>
                <div style={{ padding: "10px 20px" }}>
                    <label>
                        Instructions: <textarea name="instructions" value={instructions}></textarea>
                        {/* Instructions:<input type="textarea" rows="3" name="instructions" value={activityDetail?.description} /> */}
                    </label>
                </div>
                <div style={{ padding: "10px 20px" }}>
                    <label>
                        Duration: <input type="text" name="duration" value={duration} />
                    </label>
                </div>
                <input type="button" value="Save"
                    onClick={(e) => SaveActivityDetail(e.target.value)}
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