import fs from 'fs/promises';
import { join } from 'path';
import { cleanDir, getAmountFromArgv, getRandomTasksArr } from './utils';

const dailyDir = `${__dirname}/../daily`;
const tasksDir = `${__dirname}/../src/tasks`;
const noTasksFound = 'ERROR >>> No tasks found. Add a task to "./src/tasks" or check the paths'

export const generateDaily = async (): Promise<void> => {
  await cleanDir(dailyDir);
  const loadExercises = await fs.readdir(tasksDir);

  if (!loadExercises.length) {
    console.log(noTasksFound);
    return;
  }
  const { dailyExercises, error } = getRandomTasksArr(
    getAmountFromArgv(),
    loadExercises
  );

  if (error) {
    console.log(error);
    return;
  }

  for (const exercise of dailyExercises) {
    const exerciseFolder = await fs.readdir(join(tasksDir, exercise));
    await fs.mkdir(join(dailyDir, exercise));

    for (const file of exerciseFolder) {
      await fs.copyFile(
        join(tasksDir, exercise, file),
        join(dailyDir, exercise, file)
      );
    }
  }
};

generateDaily();