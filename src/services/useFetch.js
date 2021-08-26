import { useState, useEffect } from "react";
// import { getWorkout } from "./workoutService";

// Goal is to fetch data and store the related state, like response, loading state, errors
// This is a hook function so it starts with use
export default function useFetch(url) {
    const [data, setData] = useState(null);
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState([]);

    useEffect(() => {
        async function init() {
            try {
                const response = await fetch(url);
                if (response.ok) {
                    const json = await response.json();
                    setData(json);
                } else {
                    throw response;
                }
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        }
        init();
    }, [url]);

    return { data, error, loading };
}