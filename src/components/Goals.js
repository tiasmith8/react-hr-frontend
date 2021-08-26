import goalImg from '../goals-icon.png'

const Goals = ({ goals }) => {


    const userGoals = goals?.map((d) =>
        <div>
            <h4 key={d.name} style={{ color: "steelblue" }}><label style={{ color: "black" }}>Name: </label>{d.name}</h4>
            <h4 key={d.description} style={{ color: "red" }}><label style={{ color: "black" }}>Description: </label>{d.description}</h4>
            <div style={{ marginBottom: "10px" }}></div>
        </div>
    );

    return (
        <>
            <div style={{ marginBottom: "10px" }}>
                <img src={goalImg} width="30" height="30" alt="goal icon" style={{ marginLeft: "10px", marginRight: "10px" }} />
                <h4 style={{ display: "inline", marginBottom: "10px" }}>Goals</h4 >
            </div>
            {userGoals}
        </>
    )
}

export default Goals