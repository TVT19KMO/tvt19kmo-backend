const _ = require("lodash");
const TaskRoom = require("../models/taskRoom");

const getTaskRooms = async (req, res) => {
  const rooms = await TaskRoom.find({});

  const finalRooms = rooms.map((roomDoc) => {
    const room = roomDoc.toObject();
    room.name = req.i18n.t(`rooms.${room.code}`);
    return room;
  });

  res.json(finalRooms);
};

/**
 * Returns chart presentable statistics about task rooms.
 * @param {*} tasks
 * @param {*} i18n
 * @returns
 */
const getRoomStatistics = async (tasks, i18n) => {
  // Get all available rooms.
  const taskRooms = await TaskRoom.find({});

  // Get rooms from tasks.
  const rooms = _.map(tasks, ({ task }) => task.room);

  // Count rooms by id.
  const roomsByCount = _.countBy(rooms);

  const dataset = {
    labels: [],
    datasets: [{ data: [], backgroundColor: [] }],
  };

  return taskRooms.reduce((acc, { id, code }) => {
    if (!roomsByCount[id]) return acc;
    acc.labels.push(i18n.t(`rooms.${code}`));
    acc.datasets[0].data.push(roomsByCount[id]);
    acc.datasets[0].backgroundColor.push(
      "#" + (((1 << 24) * Math.random()) | 0).toString(16)
    );
    return acc;
  }, dataset);
};

module.exports = {
  getTaskRooms,
  getTaskRoomCount: getRoomStatistics,
};
