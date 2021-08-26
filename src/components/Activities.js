import { useState, useEffect } from "react";
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
    const [allActivities, setActivities] = useState(activities);

    useEffect(() => {
        debugger;
    }, [allActivities]);

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
                    {allActivities.map((activity, index) => (
                        <TableRow key={activity.name}>
                            <TableCell component="th" scope="row">
                                <img src={runIcon} width="30" height="30" alt="goal icon" />
                            </TableCell>
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
                            />
                            <TextField
                                onChange={(e) => {
                                    let tempActivities = allActivities.slice();
                                    tempActivities[index].duration = e.target.value;
                                    setActivities(tempActivities);
                                }}
                                autoFocus={true}
                                className={classes.field}
                                label="Duration"
                                name="duration"
                                variant="outlined"
                                required
                                value={activity.duration}
                            />
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Activities