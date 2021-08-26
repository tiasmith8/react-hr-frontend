const profileID = "60ADE84C-4079-47E9-1074-08D92F464040";
const baseUrl = "https://localhost:44315/api/";

export async function getWorkouts() {
    const response = await fetch(`https://localhost:44315/api/profiles/${profileID}/workouts`);
    if (response.ok) return response.json();
    throw response;
}

export async function getWorkout(id) {
    const response = await fetch(`https://localhost:44315/api/profiles/${profileID}/workouts/${id}`)
    if (response.ok) return response.json();
    throw response;
}