import React from 'react';
import { useState, setState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import runIcon from '../Run-icon.png'
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
    field: {
        marginTop: 20,
        marginBottom: 20,
        display: 'block'
    }
});

const Activities = ({ activities }) => {
    const classes = useStyles();
    const [allActivities, setActivities] = useState([]);
    // const [currentActivity, setActivity] = useState(activities[0]);
    // const [name, setName] = useState(activities.length > 0 ? activities[0].name : "");
    // const [duration, setDuration] = useState(activities.length > 0 ? activities[0].duration : "");

    useEffect(() => {
        setActivities(activities)
    }, [activities]);

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell align="left">Activity</TableCell>
                        <TableCell align="left">Duration</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allActivities.map((activity) => (
                        <TableRow key={activity.id}>
                            <TableCell component="th" scope="row">
                                <img src={runIcon} width="30" height="30" alt="goal icon" />
                            </TableCell>
                            <TextField
                                onChange={(e) => {
                                    const idx = allActivities.findIndex(a => a.id === activity.id);
                                    allActivities[idx].name = e.target.value;
                                    setActivities(allActivities);

                                }}
                                className={classes.field}
                                label="Name"
                                name="name"
                                variant="outlined"
                                fullWidth
                                required
                                value={activity.name}
                            />
                            {/* <TableCell align="left">{activity.name}</TableCell> */}
                            <TableCell align="left">{activity.duration}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Activities