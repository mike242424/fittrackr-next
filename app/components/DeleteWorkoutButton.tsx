'use client';

import { useRouter } from 'next/navigation';

interface DeleteWorkoutButtonProps {
  id: string;
}

const DeleteWorkoutButton = ({ id }: DeleteWorkoutButtonProps) => {
  const router = useRouter();

  const handleClick = async () => {
    const res = await fetch(`/api/workouts/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error('Failed to delete workout');
    }

    router.refresh();
  };

  return (
    <button
      onClick={handleClick}
      className="btn mt-1 md:mt-0 w-20 md:w-24 bg-indigo-700 hover:bg-black text-white font-normal md:font-bold"
    >
      Delete
    </button>
  );
};

export default DeleteWorkoutButton;
