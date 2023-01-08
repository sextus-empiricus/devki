import fs from 'fs/promises';
import { join as pathJoin } from 'path';

const dailyDir = `${__dirname}/../daily`;
const historyDir = `${__dirname}/../history`;

const noTasksFound =
  'ERROR >>> No tasks found. Add a task to "./daily" or check the paths';

export const saveDaily = async (): Promise<void> => {
  const now = new Date();
  const loadDaily = await fs.readdir(dailyDir);
  const dirDateName = now.toLocaleDateString().split('.').join('-');
  const dirTimeName = now
    .toLocaleTimeString('en-US', { hour12: false })
    .split(':')
    .join('_');

  if (!loadDaily.length) {
    console.log(noTasksFound);
    return;
  }

  try {
    await fs.access(pathJoin(historyDir, dirDateName));
  } catch (error) {
    await fs.mkdir(pathJoin(historyDir, dirDateName));
  }

  await fs.mkdir(pathJoin(historyDir, dirDateName, dirTimeName));

  for (const task of loadDaily) {
    const taskFolder = await fs.readdir(pathJoin(dailyDir, task));

    await fs.mkdir(pathJoin(historyDir, dirDateName, dirTimeName, task));

    for (const file of taskFolder) {
      await fs.copyFile(
        pathJoin(dailyDir, task, file),
        pathJoin(historyDir, dirDateName, dirTimeName, task, file)
      );
    }
  }
};

saveDaily();
