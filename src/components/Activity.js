import { useParams } from "react-router";
import useFetch from "../services/useFetch";
// import Spinner from "./Spinner";

const Activity = ({ activity }) => {
    const { id } = useParams();
    const { data: activityDetail, loading, error } = useFetch(`https://localhost:44315/api/activities/${id}`);

    if (loading) return <p>Loading...</p>

    debugger;

    return (
        <>
            <p>Activity Detail</p>
            <h1>{activityDetail?.name}</h1>
        </>
    )
}

export default Activity