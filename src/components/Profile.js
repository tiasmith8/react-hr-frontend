import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import useFetch from "../services/useFetch";
import Goal from "../components/Goals";
import { useState, useEffect } from "react";

const Profile = ({ profile }) => {
    const { id } = useParams();
    let { data: profileDetail, loading, error } = useFetch(`https://localhost:44315/api/profiles/${profile.id}`);

    const [name, setName] = useState(profileDetail?.name);
    const [email, setEmail] = useState(profileDetail?.email);
    const [phone, setPhone] = useState(profileDetail?.phone);
    const [location, setLocation] = useState(profileDetail?.location);

    const history = useHistory();

    useEffect(() => {
        setName(profileDetail?.name);
        setEmail(profileDetail?.email);
        setPhone(profileDetail?.phone);
        setLocation(profileDetail?.location);
    }, [profileDetail] // A list of reasons the useEffect should run. It is the dependency array.
    );

    if (loading) return <p>Loading...</p>

    const SaveProfile = async (e) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                // name: `${profileDetail?.name}`,
                // email: `${profileDetail?.email}`,
                // phone: `${profileDetail?.phone}`,
                // location: `${profileDetail?.location}`

                name: name,
                email: email,
                phone: phone,
                location: location
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
                            Name: <input type="text" name="type" value={profileDetail?.name} onChange={(e) => {
                                setName(e.target.value);
                                profileDetail.name = e.target.value;
                            }} />
                        </label>
                    </h4>
                </div>
                <div style={{ padding: "10px 20px" }}>
                    <h4 style={{ color: "steelblue" }}>
                        <label style={{ color: "black" }}>
                            Email: <input type="text" name="type" value={profileDetail?.email} onChange={(e) => {
                                setEmail(e.target.value);
                                profileDetail.email = e.target.value;
                            }} />
                        </label>
                    </h4>
                </div>
                <div style={{ padding: "10px 20px" }}>
                    <h4 style={{ color: "steelblue" }}>
                        <label style={{ color: "black" }}>
                            Phone: <input type="text" name="type" value={profileDetail?.phone} onChange={(e) => {
                                setPhone(e.target.value);
                                profileDetail.phone = e.target.value;
                            }} />
                        </label>
                    </h4>
                </div>
                <div style={{ padding: "10px 20px" }}>
                    <h4 style={{ color: "steelblue" }}>
                        <label style={{ color: "black" }}>
                            Location: <input type="text" name="type" value={profileDetail?.location} onChange={(e) => {
                                setLocation(e.target.value);
                                profileDetail.location = e.target.value;
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

            {/* 


            <h4 style={{ color: "steelblue" }}><label style={{ color: "black" }}>Name: </label>{profile.name}</h4>
            <h4 style={{ color: "steelblue" }}><label style={{ color: "black" }}>Email: </label>{profile.email}</h4>
            <h4 style={{ color: "steelblue" }}><label style={{ color: "black" }}>Phone: </label>{profile.phone}</h4>
            <h4 style={{ color: "steelblue" }}><label style={{ color: "black" }}>Location: </label>{profile.location}</h4> */}
        </div>
    )
}

export default Profile
