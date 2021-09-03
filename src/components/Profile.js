import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import useFetch from "../services/useFetch";
import Goal from "../components/Goals";
import { useState, useEffect } from "react";
import moment from 'moment';

const Profile = ({ profile }) => {
    const { id } = useParams();
    let { data: profileDetail, loading, error } = useFetch(`https://localhost:44315/api/profiles/${profile.id}`);

    const [name, setName] = useState(profileDetail?.name);
    const [email, setEmail] = useState(profileDetail?.email);
    const [phone, setPhone] = useState(profileDetail?.phone);
    const [location, setLocation] = useState(profileDetail?.location);
    const [birthdate, setBirthdate] = useState(profileDetail?.birthdate);
    const [heightInInches, setHeightInInches] = useState(profileDetail?.heightInInches);
    const [weightInLbs, setWeightInLbs] = useState(profileDetail?.weightInLbs);

    const history = useHistory();

    useEffect(() => {
        setName(profileDetail?.name);
        setEmail(profileDetail?.email);
        setPhone(profileDetail?.phone);
        setLocation(profileDetail?.location);
        setBirthdate(profileDetail?.birthdate);
        setHeightInInches(profileDetail?.heightInInches);
        setWeightInLbs(profileDetail?.weightInLbs);
    }, [profileDetail] // A list of reasons the useEffect should run. It is the dependency array.
    );

    if (loading) return <p>Loading...</p>

    const SaveProfile = async (e) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone,
                location: location,
                birthdate: birthdate,
                heightInInches: heightInInches,
                weightInLbs: weightInLbs
            })
        };
        const response = await fetch(`https://localhost:44315/api/profiles/${profile.id}`, requestOptions);
        const data = await response.json();
        profileDetail = data;
    }

    return (
        <div>
            <h3 style={{ color: "darkgreen" }}>Profile</h3>

            <form noValidate autoComplete="off">
                <div style={{ padding: "10px 20px" }}>
                    <h4 style={{ color: "steelblue" }}>
                        <label style={{ color: "black" }}>
                            Name: <input type="text" name="name" value={profileDetail?.name} onChange={(e) => {
                                setName(e.target.value);
                                profileDetail.name = e.target.value;
                            }} />
                        </label>
                    </h4>
                </div>
                <div style={{ padding: "10px 20px" }}>
                    <h4 style={{ color: "steelblue" }}>
                        <label style={{ color: "black" }}>
                            Email: <input type="text" name="email" value={profileDetail?.email} onChange={(e) => {
                                setEmail(e.target.value);
                                profileDetail.email = e.target.value;
                            }} />
                        </label>
                    </h4>
                </div>
                <div style={{ padding: "10px 20px" }}>
                    <h4 style={{ color: "steelblue" }}>
                        <label style={{ color: "black" }}>
                            Phone: <input type="text" name="phone" value={profileDetail?.phone} onChange={(e) => {
                                setPhone(e.target.value);
                                profileDetail.phone = e.target.value;
                            }} />
                        </label>
                    </h4>
                </div>
                <div style={{ padding: "10px 20px" }}>
                    <h4 style={{ color: "steelblue" }}>
                        <label style={{ color: "black" }}>
                            Location: <input type="text" name="location" value={profileDetail?.location} onChange={(e) => {
                                setLocation(e.target.value);
                                profileDetail.location = e.target.value;
                            }} />
                        </label>
                    </h4>
                </div>
                <div style={{ padding: "10px 20px" }}>
                    <h4 style={{ color: "steelblue" }}>
                        <label style={{ color: "black" }}>
                            Birthdate:
                            <input type="date" name="birthdate"
                                value={moment(profileDetail?.birthdate).format('YYYY-MM-DD')}
                                onChange={(e) => {
                                    setBirthdate(e.target.value);
                                    profileDetail.birthdate = e.target.value;
                                }} />
                        </label>
                    </h4>
                </div>
                <div style={{ padding: "10px 20px" }}>
                    <h4 style={{ color: "steelblue" }}>
                        <label style={{ color: "black" }}>
                            HeightInInches: <input type="text" name="heightInInches"
                                value={profileDetail?.heightInInches} onChange={(e) => {
                                    setHeightInInches(e.target.value);
                                    profileDetail.heightInInches = e.target.value;
                                }} />
                        </label>
                    </h4>
                </div>
                <div style={{ padding: "10px 20px" }}>
                    <h4 style={{ color: "steelblue" }}>
                        <label style={{ color: "black" }}>
                            WeightInLbs: <input type="text" name="weightInLbs" value={profileDetail?.weightInLbs} onChange={(e) => {
                                setWeightInLbs(e.target.value);
                                profileDetail.weightInLbs = e.target.value;
                            }} />
                        </label>
                    </h4>
                </div>
                <input type="button" value="Save"
                    onClick={(e) => SaveProfile(e.target.value)}
                />
                <input type="button" value="Back up"
                    onClick={(e) => history.goBack()}
                    style={{ marginLeft: "10px" }}
                />
            </form>
        </div>
    )
}

export default Profile
