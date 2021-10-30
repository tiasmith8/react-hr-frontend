// const profileID = "60ADE84C-4079-47E9-1074-08D92F464040";
const baseUrl = "https://localhost:44315/api";

// Fetch Data
// This uses the fetch api with async await
export async function fetchWorkouts(profileID) {
    // res is response. fetch returns a promise so we want to await that promise
    const res = await fetch(`${baseUrl}/profiles/${profileID}/workouts`);
    // This gives us all of the json data
    if (res.ok) if (res.ok) return res.json();
    throw res;
}

export async function fetchWorkoutById(profileID, id) {
    const res = await fetch(`${baseUrl}/profiles/${profileID}/workouts/${id}`)
    if (res.ok) return res.json();
    throw res;
}

export async function fetchProfile(profileID) {
    const res = await fetch(`${baseUrl}/profiles/${profileID}`);
    if (res.ok) return res.json();
    throw res;
}

export async function fetchWorkoutHistory(profileID) {
    const res = await fetch(`${baseUrl}/profiles/${profileID}/workoutHistory`);
    if (res.ok) return res.json();
    throw res;
}

export async function fetchGoals(profileID) {
    const res = await fetch(`${baseUrl}/profiles/${profileID}/goals`);
    if (res.ok) return res.json();
    throw res;
}

export async function fetchProfileSettings(profileID) {
    const res = await fetch(`${baseUrl}/profiles/${profileID}/settings`);
    if (res.ok) return res.json();
    throw res;
}

export async function deleteWorkout(profileID, workoutID) {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    };

    const res = await fetch(`${baseUrl}/profiles/${profileID}/workouts/${workoutID}`, requestOptions);
    if (res.ok) return res.json();
    throw res;
}