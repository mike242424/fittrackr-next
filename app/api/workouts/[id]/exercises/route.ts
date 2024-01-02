import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  try {
    const exercises = await prisma.exercise.findMany({
      where: { workoutId: Number(id) },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ exercises });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

export async function POST(
  request: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  try {
    const body = await request.json();
    // needs validation

    const existingWorkout = await prisma.workout.findUnique({
      where: { id: Number(body.workoutId) },
    });

    if (!existingWorkout) {
      return NextResponse.json({ error: 'Workout Not Found' }, { status: 404 });
    }

    const createdExercise = await prisma.exercise.create({
      data: {
        name: body.name,
        sets: body.sets,
        reps: body.reps,
        weight: body.weight,
        workoutId: existingWorkout.id,
      },
    });

    return NextResponse.json({ createdExercise }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
