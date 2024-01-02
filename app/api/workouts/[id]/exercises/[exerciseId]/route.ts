import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';

export async function PUT(
  request: NextRequest,
  {
    params: { id, exerciseId },
  }: { params: { id: string; exerciseId: string } },
) {
  try {
    const body = await request.json();

    const updatedExercise = await prisma.exercise.update({
      where: {
        id: Number(exerciseId),
        workoutId: Number(id),
      },
      data: {
        name: body.name,
        sets: body.sets,
        reps: body.reps,
        weight: body.weight,
      },
    });

    return NextResponse.json(updatedExercise);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  {
    params: { id, exerciseId },
  }: { params: { id: string; exerciseId: string } },
) {
  try {
    const exercise = await prisma.exercise.findUnique({
      where: {
        id: Number(exerciseId),
        workoutId: Number(id),
      },
    });

    if (!exercise) {
      return NextResponse.json(
        { error: 'Exercise Not Found' },
        { status: 404 },
      );
    }

    await prisma.exercise.delete({
      where: {
        id: Number(exerciseId),
      },
    });

    return NextResponse.json({});
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
