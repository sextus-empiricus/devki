import fs from 'fs/promises';
import { join } from 'path';

export const randomIncludes = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const cleanDir = async (path: string) => {
  const files = await fs.readdir(path);

  for (const file of files) {
    await fs.rm(join(path, file), { force: true, recursive: true });
  }
};

export const getRandomTasksArr = (
  amount: number,
  exercises: string[]
): { dailyExercises: string[]; error: string | null } => {
  const exercisesArr: string[] = [];

  if (amount > exercises.length) {
    return {
      dailyExercises: [],
      error:
        'ERROR >>> The number of generated tasks should not be greater than the number of existing tasks',
    };
  }

  while (exercisesArr.length < amount) {
    const randomIndex = randomIncludes(0, exercises.length - 1);
    const newItem = exercises[randomIndex];

    if (!exercisesArr.includes(newItem)) {
      exercisesArr.push(newItem);
    }
  }

  return { dailyExercises: exercisesArr, error: null };
};

export const getAmountFromArgv = (): number => {
  return process.argv[2] ? Number(process.argv[2].split('-')[1]) : 3;
};
