import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  const workout = await prisma.workout.findUnique({
    where: { id: Number(id) },
  });

  if (!workout) {
    return NextResponse.json({ error: 'Workout Not Found' }, { status: 404 });
  }

  return NextResponse.json(workout);
}

export async function PUT(
  request: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  try {
    const body = await request.json();

    const existingWorkout = await prisma.workout.findUnique({
      where: { id: Number(id) },
    });

    if (!existingWorkout) {
      return NextResponse.json({ error: 'Workout Not Found' }, { status: 404 });
    }

    const updatedWorkout = await prisma.workout.update({
      where: { id: existingWorkout.id },
      data: {
        name: body.name,
        location: body.location,
        notes: body.notes,
      },
    });

    return NextResponse.json(updatedWorkout);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  try {
    const workoutId = Number(id);

    const exercises = await prisma.exercise.findMany({
      where: { workoutId },
    });

    await Promise.all(
      exercises.map(async (exercise) => {
        await prisma.exercise.delete({
          where: { id: exercise.id },
        });
      }),
    );

    const deletedWorkout = await prisma.workout.delete({
      where: { id: workoutId },
    });

    return NextResponse.json({});
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
