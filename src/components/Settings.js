import settingsImg from '../gear-icon.png';
import { FormGroup, FormControlLabel, Switch } from '@material-ui/core';
import { useHistory } from "react-router-dom";

const Settings = () => {

    const history = useHistory();

    return (
        <>
            <h4>Settings</h4>
            <form noValidate autoComplete="off">
                <div style={{ padding: "10px 20px" }}>

                    {/* <FormGroup>
                        <FormControlLabel
                            control={<Switch checked={checked} onChange={toggleChecked} />}
                            label="Normal"
                        />
                    </FormGroup> */}

                    <label >
                        Indoor/Outdoor: <Switch value="checkedA" inputProps={{ 'aria-label': 'Switch A' }} />
                    </label>
                </div>
                <div style={{ padding: "10px 20px" }}>
                    <label>
                        Audio Feedback: <Switch value="checkedA" inputProps={{ 'aria-label': 'Switch A' }} />
                    </label>
                </div>
                <div style={{ padding: "10px 20px" }}>
                    <label>
                        Minimum Heartrate: <input type="text" name="minimumHeartRate" defaultValue="60" />
                    </label>
                </div>
                <div style={{ padding: "10px 20px" }}>
                    <label>
                        Maximum Heartrate: <input type="text" name="maximumHeartRate" defaultValue="180" />
                    </label>
                </div>
                <div style={{ padding: "10px 10px 30px 20px" }}>
                    <label>
                        Minimum Pace: <input type="text" name="minimumPace" defaultValue="120" />
                    </label>
                </div>
                <input type="button" value="Save"
                // onClick={(e) => SaveActivityDetail(e.target.value)}
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