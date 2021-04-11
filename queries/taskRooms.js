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

module.exports = {
  getTaskRooms,
};
