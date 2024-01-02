'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

const AddExercisePage = ({ params: { id } }: { params: { id: string } }) => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/workouts/${id}/exercises`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          sets,
          reps,
          weight,
          workoutId: Number(id),
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to add workout');
      }

      router.push(`/workouts/${id}`);
      router.refresh();
    } catch (error) {
      console.error('Error adding exercise:', error);
    }
  };
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-6">Add Exercise</h1>
      <form
        className="flex flex-col max-w-screen-md space-y-6 m-8 mx-auto"
        onSubmit={handleSubmit}
      >
        <input
          className="p-3 bg-white rounded text-black"
          type="text"
          placeholder="Exercise Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="p-3 bg-white rounded text-black"
          type="text"
          placeholder="How Many Sets Did You Do? (e.g. 3)"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
        />
        <input
          className="p-3 bg-white rounded text-black"
          type="text"
          placeholder="How Many Reps On Each Set? (e.g. 10, 9, 8)"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
        />
        <input
          className="p-3 bg-white rounded text-black"
          type="text"
          placeholder="How Much Weight Per Rep? (e.g. 100 lbs , 95 lbs , 90 lbs)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <button
          type="submit"
          className="btn bg-indigo-700 hover:bg-black text-white"
        >
          Add Exercise
        </button>
      </form>
    </div>
  );
};

export default AddExercisePage;
