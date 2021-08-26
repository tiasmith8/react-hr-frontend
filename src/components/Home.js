import { React } from 'react';
import profileImg from '../whiteuser.png';
import workoutHistoryImg from '../chart-icon.png';
import goalsImg from '../goals-icon.png';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const Home = ({ workouts }) => {
    return (
        <div style={{ justifyContent: 'center', alignItems: 'center', height: '9vh', textAlign: "center", display: "inline" }}>
            <Link to={{
                pathname: "/workouts",
                state: { workouts: workouts }
            }}
                style={{ textDecoration: 'none' }}>
                <Button renderAs="button" color="primary">Choose Workout</Button>
            </Link>

            <p style={{ marginTop: "20px" }}>-</p>
            <p style={{ color: "red", marginBottom: "10px" }}><label style={{}}>HEART RATE (BPM)</label></p>
            <p>0:00</p>
            <p style={{ marginBottom: "10px" }}>DURATION</p>
            <p>0:00</p>
            <p>DISTANCE</p>
            <Link to="/profile">
                <img src={profileImg} width="25" height="25" alt="profile icon" />
            </Link>

            <Link to="/workout-history">
                <img src={workoutHistoryImg} className="align-icon-right" alt="workout history icon" style={{ marginTop: "40px", marginLeft: "25px" }} />
            </Link>

            <Link to="/goals">
                <img src={goalsImg} className="align-icon-right" alt="goals icon" style={{ marginTop: "40px", marginLeft: "25px" }} />
            </Link>


        </div>
    )
}

export default Home
