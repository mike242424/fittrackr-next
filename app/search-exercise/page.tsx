'use client';

import { useEffect, useState } from 'react';
import { capitalizeWords } from '../utils/capitalizeWords';

interface Exercise {
  id: string;
  name: string;
  equipment: string;
  gifUrl: string;
  instructions: string[];
}

const SearchExercise = () => {
  const [exercises, setExercises] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  const handleClick = async (muscle: string) => {
    try {
      const response = await fetch(
        `https://exercisedb.p.rapidapi.com/exercises/target/${muscle.toLowerCase()}?limit=200`,
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
    } catch (error) {
      console.error('Failed to fetch exercises', error);
    }

    setDropdownOpen(false);
  };

  const handleDropdownClick = (
    e: React.MouseEvent<HTMLDetailsElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setDropdownOpen(!dropdownOpen);
  };

  const handleDocumentClick = (e: MouseEvent) => {
    if (
      e.target instanceof Element &&
      !e.target.closest('.dropdown-exercise')
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [dropdownOpen]);

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-6">Search Exercises</h1>
      <details
        className="dropdown dropdown-exercise cursor-pointer"
        open={dropdownOpen}
        onClick={handleDropdownClick}
      >
        <summary className="m-1 p-5 bg-indigo-700 hover:bg-black text-white rounded font-bold">
          Select A Target Muscle
        </summary>
        <ul className="shadow menu dropdown-content z-[1] bg-indigo-700 text-black w-96 grid grid-cols-3 rounded left-[-4.9rem]">
          {targetMuscles.map((muscle, index) => (
            <li
              className="font-bold p-3 text-left hover:text-black text-white cursor-pointer"
              key={index}
              onClick={() => handleClick(muscle)}
            >
              {muscle}
            </li>
          ))}
        </ul>
      </details>
      <div className="mt-6">
        {exercises &&
          exercises.map((exercise: Exercise) => (
            <div
              className="border border-white grid grid-cols-1 md:grid-cols-2 gap-4 text-justify m-8"
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
              <div className="flex justify-center md:justify-end">
                <img src={exercise.gifUrl} alt={exercise.name} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchExercise;
