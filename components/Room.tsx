"use client";

import { useRoom } from "@/recoil/room";
import RoomContextProvider from "../context/Room.context";
import NameInput from "./Name";
import UserList from "./Users";
import Canvas from "./board/Canvas";
import MousePosition from "./board/MousePosition";
import MousesRenderer from "./board/MouseRenderer";
import MoveImage from "./board/MoveImage";
import SelectionBtns from "./board/SelectionButtons";
import Chat from "./chat/Chat";
import ToolBar from "./toolbar/ToolBar";

const Room = () => {
  const room = useRoom();
  console.log(room);

  if (!room.id) return <NameInput />;

  return (
    <RoomContextProvider>
      <div className="relative h-full w-full overflow-hidden">
        <UserList />
        <ToolBar />
        <SelectionBtns />
        <MoveImage />
        <Canvas />
        <MousePosition />
        <MousesRenderer />
        <Chat />
      </div>
    </RoomContextProvider>
  );
};

export default Room;
