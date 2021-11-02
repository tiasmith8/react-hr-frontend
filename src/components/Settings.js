import settingsImg from '../gear-icon.png';
import { FormGroup, FormControlLabel, Switch } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import { useLocation } from "react-router";
import useFetch from '../services/useFetch';
import { useState, useEffect } from "react";
import { useAlert } from "react-alert";

const Settings = ({ profileSettings }) => {

    const history = useHistory();
    const { id } = useParams();
    const alert = useAlert();
    // let data = useLocation();

    let { data: settingsData, loading } = useFetch(`https://localhost:44315/api/profiles/${id}/settings/`);

    const [indoor, setIndoor] = useState(settingsData?.indoor);
    const [audioFeedback, setAudioFeedback] = useState(settingsData?.audioFeedback);
    const [minimumHeartRate, setMinimumHeartRate] = useState(settingsData?.minimumHeartRate);
    const [maximumHeartRate, setMaximumHeartRate] = useState(settingsData?.maximumHeartRate);
    const [minimumPace, setMinimumPace] = useState(settingsData?.minimumPace);

    useEffect(() => {
        setIndoor(settingsData?.indoor);
        setAudioFeedback(settingsData?.audioFeedback);
        setMinimumHeartRate(settingsData?.minimumHeartRate);
        setMaximumHeartRate(settingsData?.maximumHeartRate);
        setMinimumPace(settingsData?.minimumPace);
    }, [settingsData] // A list of reasons the useEffect should run. It is the dependency array.
    );

    if (loading) return <p>Loading...</p>

    const SaveSettings = async (e) => {
        debugger;
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                indoor: indoor,
                audioFeedback: audioFeedback,
                minimumHeartRate: minimumHeartRate,
                maximumHeartRate: maximumHeartRate,
                minimumPace: minimumPace
            })
        };
        const response = await fetch(`https://localhost:44315/api/profiles/${id}/settings/${profileSettings.id}`, requestOptions);
        const data = await response.json();
        settingsData = data;
        alert.show("Settings Updated");
    }

    return (
        <>
            <h4>Settings</h4>
            <form noValidate autoComplete="off">
                <div style={{ padding: "10px 20px" }}>
                    <label >
                        Indoor/Outdoor: <Switch
                            name="indoor" inputProps={{ 'aria-label': 'Indoor' }}
                            checked={settingsData?.indoor}
                            value={settingsData?.indoor}
                            onChange={(e) => {
                                setIndoor(!settingsData.indoor);
                                settingsData.indoor = !settingsData.indoor;
                            }}
                        />
                    </label>
                </div>
                <div style={{ padding: "10px 20px" }}>
                    <label>
                        Audio Feedback: <Switch inputProps={{ 'aria-label': 'Audio Feedback' }}
                            value={settingsData?.audioFeedback}
                            checked={settingsData?.audioFeedback}
                            onChange={(e) => {
                                setAudioFeedback(!settingsData.audioFeedback);
                                settingsData.audioFeedback = !settingsData.audioFeedback;
                            }}
                        />
                    </label>
                </div>
                <div style={{ padding: "10px 20px" }}>
                    <label>
                        Minimum Heartrate: <input type="text" name="minimumHeartRate" defaultValue="60"
                            value={settingsData?.minimumHeartRate}
                            onChange={(e) => {
                                setMinimumHeartRate(e.target.value);
                                settingsData.minimumHeartRate = e.target.value;
                            }}
                        />
                    </label>
                </div>
                <div style={{ padding: "10px 20px" }}>
                    <label>
                        Maximum Heartrate: <input type="text" name="maximumHeartRate" defaultValue="180"
                            value={settingsData?.maximumHeartRate}
                            onChange={(e) => {
                                setMaximumHeartRate(e.target.value);
                                settingsData.maximumHeartRate = e.target.value;
                            }}
                        />
                    </label>
                </div>
                <div style={{ padding: "10px 10px 30px 20px" }}>
                    <label>
                        Minimum Pace: <input type="text" name="minimumPace" defaultValue="120"
                            value={settingsData?.minimumPace}
                            onChange={(e) => {
                                setMinimumPace(e.target.value);
                                settingsData.minimumPace = e.target.value;
                            }}
                        />
                    </label>
                </div>
                <input type="button" value="Save"
                    onClick={(e) => { debugger; SaveSettings(e.target.value) }}
                />
                <input type="button" value="Back up"
                    onClick={(e) => history.goBack()}
                    style={{ marginLeft: "10px" }}
                />
            </form>

        </>
    )
}

export default Settings