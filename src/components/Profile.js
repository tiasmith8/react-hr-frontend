const Profile = ({ profile }) => {
    return (
        <div>
            <h3 style={{color: "darkgreen"}}>Profile</h3>
            <h4 style={{ color: "steelblue"}}><label style={{ color: "black"}}>Name: </label>{profile.name}</h4>
            <h4 style={{ color: "steelblue"}}><label style={{ color: "black"}}>Email: </label>{profile.email}</h4>
            <h4 style={{ color: "steelblue"}}><label style={{ color: "black"}}>Phone: </label>{profile.phone}</h4>
            <h4 style={{ color: "steelblue"}}><label style={{ color: "black"}}>Location: </label>{profile.location}</h4>
        </div>
    )
}

export default Profile
