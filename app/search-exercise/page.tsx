'use client';

import { FormEvent, useState } from 'react';

interface Exercise {
  id: string;
  name: string;
  equipment: string;
  gifUrl: string;
  instructions: string[];
}

function capitalizeWords(input: string): string {
  const words = input.split(' ');

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (word.length > 0) {
      if (word.startsWith('(') && word.endsWith(')')) {
        words[i] =
          '(' +
          word
            .slice(1, -1)
            .toLowerCase()
            .replace(/^\w/, (c) => c.toUpperCase()) +
          ')';
      } else {
        words[i] = word[0].toUpperCase() + word.slice(1);
      }
    }
  }

  return words.join(' ');
}

const SearchExercise = () => {
  const [search, setSearch] = useState('');
  const [exercises, setExercises] = useState([]);

  const targetMuscles = [
    'Abductors',
    'Abs',
    'Adductors',
    'Biceps',
    'Calves',
    'Cardiovascular System',
    'Delts',
    'Forearms',
    'Glutes',
    'Hamstrings',
    'Lats',
    'Levator Scapulae',
    'Pectorals',
    'Quads',
    'Serratus Anterior',
    'Spine',
    'Traps',
    'Triceps',
    'Upper Back',
  ];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://exercisedb.p.rapidapi.com/exercises/target/${search.toLowerCase()}?limit=200`,
        {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': process.env.NEXT_PUBLIC_EXERCISEDB_API_KEY!,
            'X-RapidAPI-Host': process.env.NEXT_PUBLIC_EXERCISEDB_HOST!,
          },
          cache: 'no-cache',
        },
      );
      const result = await response.json();
      setExercises(result);
      console.log(exercises.length);
    } catch (error) {
      console.error('Failed to fetch exercises', error);
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-6">Search Exercises</h1>
      <form onSubmit={handleSubmit}>
        <select
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 bg-white rounded text-black w-80"
        >
          <option value="" disabled>
            Select A Target Muscle
          </option>
          {targetMuscles.map((muscle, index) => (
            <option key={index} value={muscle}>
              {muscle}
            </option>
          ))}
        </select>

        <button
          className="btn border-indigo-700 bg-indigo-700 hover:bg-black text-white ml-4"
          type="submit"
        >
          Search
        </button>
      </form>

      <div className="mt-6">
        {exercises &&
          exercises.map((exercise: Exercise) => (
            <div
              className=" border border-white grid grid-cols-2 gap-4 text-justify m-8"
              key={exercise.id}
            >
              <div className="p-6">
                <div>
                  <strong>Exercise: </strong>
                  {capitalizeWords(exercise.name)}
                </div>
                <div>
                  <strong>Equipment: </strong>
                  {capitalizeWords(exercise.equipment)}
                </div>
                <div>
                  <div>
                    <strong>Instructions: </strong>
                  </div>
                  {exercise.instructions.map((exercise, index) => (
                    <div key={index}>
                      {index + 1}. {exercise}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end">
                <img
                  src={exercise.gifUrl}
                  alt={exercise.name}
                  height={200}
                  width="auto"
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchExercise;
