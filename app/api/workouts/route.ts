import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import z from 'zod';

export async function GET(request: NextRequest) {
  try {
    const workouts = await prisma.workout.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(workouts);
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const workoutSchema = z.object({
      name: z.string().min(1).max(255),
      location: z.string().min(1),
    });

    const validation = workoutSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
    }

    const newWorkout = await prisma.workout.create({
      data: {
        name: body.name,
        location: body.location,
        notes: body.notes,
      },
    });

    return NextResponse.json(newWorkout, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
