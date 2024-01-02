'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

const AddWorkoutPage = ({ params: { id } }: { params: { id: string } }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          location,
          notes,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to add workout');
      }

      router.push('/workouts');
      router.refresh();
    } catch (error) {
      console.error('Error adding workout:', error);
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-6">Add Workout</h1>
      <form
        className="flex flex-col max-w-screen-md space-y-6 m-8 mx-auto"
        onSubmit={handleSubmit}
      >
        <input
          className="p-3 bg-white rounded text-black"
          type="text"
          placeholder="Workout Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="p-3 bg-white rounded text-black"
          type="text"
          placeholder="Workout Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <textarea
          className="p-3 bg-white rounded text-black"
          cols={20}
          rows={10}
          placeholder="Workout Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>
        <button className="btn bg-indigo-700 hover:bg-black text-white">
          Add Workout
        </button>
      </form>
    </div>
  );
};

export default AddWorkoutPage;
