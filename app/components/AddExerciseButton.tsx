import Link from 'next/link';

interface AddExerciseButtonProps {
  id: string;
}

const AddExerciseButton = ({ id }: AddExerciseButtonProps) => {
  return (
    <Link
      href={`${id}/add-exercise`}
      className="btn bg-indigo-700 hover:bg-black text-white"
    >
      Add Exercise
    </Link>
  );
};

export default AddExerciseButton;
