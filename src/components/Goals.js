import goalImg from '../goals-icon.png';
import { Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import useFetch from '../services/useFetch';
import { useState, useEffect } from "react";
import { useAlert } from "react-alert";

const Goals = ({ goals }) => {
    const history = useHistory();
    const { id } = useParams();
    const alert = useAlert();

    let { data: goalssData, loading } = useFetch(`https://localhost:44315/api/profiles/${id}/goals/`);

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