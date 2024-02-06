import { socket } from "@/lib/socket";
import { useRoom } from "@/recoil/room";
import UserMouse from "./UserMouse";

const MousesRenderer = () => {
  const { users } = useRoom();

  return (
    <>
      {[...users.keys()].map((userId) => {
        if (userId === socket.id) return null;
        return <UserMouse userId={userId} key={userId} />;
      })}
    </>
  );
};

export default MousesRenderer;
