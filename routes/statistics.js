const router = require("express").Router();
const _ = require("lodash");
const { AssignedTask, Child, TaskRoom } = require("../models");
const { mw } = require("../app/utils");
const { getTaskDifficultyCount } = require("../queries/taskDifficulties");
const { getTaskRoomCount } = require("../queries/taskRooms");

// Apply router middleware.
router.use(mw.authenticate);

/*
 *** get assigned tasks by id
 */
router.get("/tasks", async ({ userId, i18n }, res) => {
  const tasks = await AssignedTask.find({ assigner: userId }).populate("task");

  const finished = _.filter(tasks, ({ finished }) => finished);
  const inProgress = _.filter(
    tasks,
    ({ finished, deleted }) => !finished && !deleted
  );

  const difficulties = await getTaskDifficultyCount(finished, i18n);
  const rooms = await getTaskRoomCount(finished, i18n);

  res.json({
    tasks: _.countBy(tasks, ({ task, finished }) => (finished ? task : null)),
    difficulties,
    rooms,
    tasks: {
      finished: finished.length,
      inProgress: inProgress.length,
    },
  });
});

router.get("/children/:childId", async () => {});

module.exports = router;
