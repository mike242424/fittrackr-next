import Link from 'next/link';
import DeleteWorkoutButton from '../components/DeleteWorkoutButton';

interface Workout {
  id: string;
  name: string;
  location: string;
  notes?: string | null;
}

async function getWorkouts() {
  try {
    const res = await fetch('http://localhost:3000/api/workouts', {
      cache: 'no-cache',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch workouts');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching workouts:', error);
  }
}

const WorkoutsPage = async () => {
  const workouts = await getWorkouts();

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-6">My Workouts</h1>
      {workouts.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="text-white text-lg">
                <th>Name</th>
                <th>Description</th>
                <th>Notes</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {workouts?.map((workout: Workout) => (
                <tr className="font-bold hover" key={workout.id}>
                  <td>
                    <Link href={`/workouts/${workout.id}`}>{workout.name}</Link>
                  </td>
                  <td>
                    <Link href={`/workouts/${workout.id}`}>
                      {workout.location}
                    </Link>
                  </td>
                  <td>
                    <Link href={`/workouts/${workout.id}`}>
                      {workout.notes || ''}
                    </Link>
                  </td>
                  <td>
                    <Link
                      className="btn bg-indigo-700 hover:bg-black text-white"
                      href={`/update-workout/${workout.id}`}
                    >
                      Update
                    </Link>
                  </td>
                  <td>
                    <DeleteWorkoutButton id={workout.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <>
          <h3 className="text-lg">No Workouts Added Yet</h3>
          <Link
            className="btn add-workout-btn text-white bg-indigo-700 hover:bg-black mt-4"
            href="/add-workout"
          >
            Add Workout
          </Link>
        </>
      )}
    </div>
  );
};

export default WorkoutsPage;
