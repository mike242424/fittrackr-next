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
          <table className="table text-left">
            <thead>
              <tr className="text-white text-base md:text-lg">
                <th>Name</th>
                <th>Location</th>
                <th>Notes</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {workouts?.map((workout: Workout) => (
                <tr
                  className="font-normal md:font-bold hover table-left"
                  key={workout.id}
                >
                  <td className="align-top">
                    <Link href={`/workouts/${workout.id}`}>{workout.name}</Link>
                  </td>
                  <td className="align-top">
                    <Link href={`/workouts/${workout.id}`}>
                      {workout.location}
                    </Link>
                  </td>
                  <td className="align-top">
                    <Link href={`/workouts/${workout.id}`}>
                      {workout.notes || ''}
                    </Link>
                  </td>
                  <td className="align-top">
                    <div className="flex flex-col md:flex-row items-end justify-end">
                      <Link
                        className="btn mb-1 md:mb-0 bg-indigo-700 hover:bg-black text-white md:mr-2 font-normal md:font-bold w-20 md:w-24"
                        href={`/update-workout/${workout.id}`}
                      >
                        Update
                      </Link>

                      <DeleteWorkoutButton id={workout.id} />
                    </div>
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
