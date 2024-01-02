'use client';

import AddExerciseButton from '@/app/components/AddExerciseButton';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface Workout {
  id: string;
  name: string;
  location: string;
  notes?: string;
}

interface Exercise {
  id: string;
  name: string;
  sets: string;
  reps: string;
  weight: string;
}

const WorkoutPage = ({ params: { id } }: { params: { id: string } }) => {
  const router = useRouter();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [exercises, setExercises] = useState<Exercise[] | null>(null);

  const handleClick = async (exerciseId: string) => {
    const response = await fetch(
      `/api/workouts/${id}/exercises/${exerciseId}`,
      {
        method: 'DELETE',
      },
    );

    setExercises(
      (prevExercises) =>
        prevExercises?.filter((exercise) => exercise.id !== exerciseId) || null,
    );
  };

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const res = await fetch(`/api/workouts/${id}`, {
          cache: 'no-cache',
        });

        if (!res.ok) {
          throw new Error('Failed to fetch workout');
        }

        const data = await res.json();
        setWorkout(data);
      } catch (error) {
        console.error('Error fetching workout:', error);
      }
    };

    const fetchExercises = async () => {
      try {
        const res = await fetch(`/api/workouts/${id}/exercises`, {
          cache: 'no-cache',
        });
        if (!res.ok) {
          throw new Error('Failed to fetch exercises');
        }
        const data = await res.json();
        setExercises(data.exercises);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };

    fetchWorkout();
    fetchExercises();
  }, [id]);

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex space-x-6 mb-8">
          <h1 className="text-3xl font-bold">Workout: {workout?.name}</h1>
          <AddExerciseButton id={id} />
        </div>

        <h4>
          <strong>Location:</strong> {workout?.location}
        </h4>
        <p>
          <strong>Notes:</strong> {workout?.notes}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        {exercises?.map((exercise) => (
          <div
            key={exercise.id}
            className="card w-96 bg-neutral text-neutral-content mt-2"
          >
            <div className="card-body items-center text-center text-white">
              <h2 className="card-title">{exercise.name}</h2>
              <p>Sets: {exercise.sets}</p>
              <p>Reps: {exercise.reps}</p>
              <p>Weight: {exercise.weight}</p>
              <div className="card-actions justify-end">
                <Link
                  href={`/workouts/${id}/update-exercise/${exercise.id}`}
                  className="btn bg-indigo-700 hover:bg-black text-white"
                >
                  Update
                </Link>
                <button
                  onClick={() => handleClick(exercise.id)}
                  className="btn bg-indigo-700 hover:bg-black text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default WorkoutPage;
