import { useState, useEffect, setState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import runIcon from '../Run-icon.png';
import deleteIcon from '../delete-icon.png';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    field: {
        marginTop: 20,
        marginBottom: 20,
        display: 'block'
    }
});

const Activities = ({ activities, sendChangedActivitiesArrayToParent }) => {
    const classes = useStyles();
    const [allActivities, setActivities] = useState(activities);

    useEffect(() => {
        setActivities(activities);
    }, [activities]);

    return (
        <>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell align="left">Activity</TableCell>
                            <TableCell align="left">Duration</TableCell>
                            <TableCell align="left"
                                style={{
                                    paddingRight: "5px",
                                    paddingLeft: "5px",
                                }} >Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allActivities.map((activity, index) => (
                            <TableRow key={activity.name}>
                                <TableCell component="th" scope="row">
                                    <Link to={{
                                        pathname: `/activity/${activity.id}`
                                    }}
                                        style={{ textDecoration: 'none' }}>
                                        <img src={runIcon} width="30" height="30" alt="goal icon" />
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        onChange={(e) => {
                                            let tempActivities = allActivities.slice();
                                            tempActivities[index].name = e.target.value;
                                            setActivities(tempActivities);
                                        }}
                                        autoFocus={true}
                                        className={classes.field}
                                        label="Name"
                                        name="name"
                                        variant="outlined"
                                        required
                                        value={activity.name}
                                        inputProps={{ maxLength: 25 }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        onChange={(e) => {
                                            let tempActivities = allActivities.slice();
                                            tempActivities[index].duration = e.target.value;
                                            setActivities(tempActivities);
                                            sendChangedActivitiesArrayToParent(allActivities);
                                        }}
                                        className={classes.field}
                                        label="Duration"
                                        name="duration"
                                        variant="outlined"
                                        required
                                        value={activity.duration}
                                        inputProps={{ maxLength: 8 }}
                                    />
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <img src={deleteIcon} width="20" height="20" alt="delete icon"
                                        onClick={(e) => {
                                            let tempActivities = allActivities.slice();
                                            const index = tempActivities.indexOf(activity.id);
                                            tempActivities.splice(index, 1);
                                            setActivities(tempActivities);
                                            activities = tempActivities;
                                            sendChangedActivitiesArrayToParent(activities);
                                        }}
                                        name="deleteButton"
                                        value={activity.id}
                                    />
                                </TableCell>
                            </TableRow>

                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <section id="addActivity" style={{ paddingTop: "20px" }}>
                <Button
                    onClick={(e) => {
                        let tempActivities = allActivities.slice();
                        tempActivities.push({});
                        setActivities(tempActivities);
                        // activities.push({});
                    }}

                    type="button"
                    color="secondary"
                    variant="contained"
                > Add Activity </Button>
            </section>
        </>
    )
}

export default Activities