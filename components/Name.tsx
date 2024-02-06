import { FormEvent, useEffect, useState } from "react";

import { useRouter } from "next/router";
import { socket } from "@/lib/socket";
import NotFoundModal from "@/modals/NotFound";
import { useModal } from "@/recoil/modal";
import { useSetRoomId } from "@/recoil/room";
import { HomeIcon } from "@heroicons/react/24/outline";
import input from "postcss/lib/input";

const NameInput = () => {
  const setRoomId = useSetRoomId();
  const { openModal } = useModal();

  const [name, setName] = useState("");

  const router = useRouter();
  const roomId = (router.query.roomId || "").toString();

  useEffect(() => {
    if (!roomId) return;

    socket.emit("check_room", roomId);

    socket.on("room_exists", (exists) => {
      if (!exists) {
        router.push("/");
      }
    });

    // eslint-disable-next-line consistent-return
    return () => {
      socket.off("room_exists");
    };
  }, [roomId, router]);

  useEffect(() => {
    const handleJoined = (roomIdFromServer: string, failed?: boolean) => {
      if (failed) {
        router.push("/");
        openModal(<NotFoundModal id={roomIdFromServer} />);
      } else setRoomId(roomIdFromServer);
    };

    socket.on("joined", handleJoined);

    return () => {
      socket.off("joined", handleJoined);
    };
  }, [openModal, router, setRoomId]);

  const handleJoinRoom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    socket.emit("join_room", roomId, name);
  };
  return (
    <div className="flex flex-col items-center py-24">
      <div className="space-y-1">
        <h2 className="text-stroke animate-title z-10 cursor-default whitespace-nowrap bg-white bg-clip-text text-center text-3xl font-bold text-transparent duration-1000 sm:text-5xl md:text-6xl">
          BEST BEST BEST
        </h2>
        <h1 className="animate-fade-in-3 z-10 cursor-default whitespace-nowrap bg-white bg-gradient-to-r from-purple-300 to-purple-800 bg-clip-text text-center text-4xl font-bold text-transparent duration-1000 sm:text-6xl md:text-7xl">
          C0-CR3ATE
        </h1>
      </div>
      <div className="flex flex-col space-y-8 md:w-[400px]">
        <form
          onSubmit={handleJoinRoom}
          className="newsletter-form animate-fade-in-3 mt-10"
        >
          <div className="shadow-outline-gray focus-within:!shadow-outline-gray-focus group flex items-center gap-x-4 rounded-[9px] bg-[#090D11] py-1 pl-4 pr-1 transition-all duration-300 focus-within:bg-[#15141B] hover:bg-[#15141B] hover:shadow-transparent">
            <HomeIcon className="hidden h-6 w-6 text-[#4B4C52] transition-colors duration-300 group-focus-within:text-white group-hover:text-white sm:inline" />
            <input
              onChange={(e) => setName(e.target.value.slice(0, 15))}
              placeholder="Enter Your Name"
              required
              className="flex-1 bg-transparent text-sm text-white placeholder-[#4B4C52] outline-none placeholder:transition-colors placeholder:duration-300 group-focus-within:placeholder-white sm:text-base"
            />
            <button
              className={`${
                "" && "active"
              } text-sm disabled:cursor-not-allowed disabled:!bg-[#17141F] disabled:opacity-50 disabled:grayscale-[65%] md:text-base`}
              disabled={!input}
              type="submit"
            >
              <span className="default">Join</span>
              <span className="success">
                <svg viewBox="0 0 16 16">
                  <polyline points="3.75 9 7 12 13 5"></polyline>
                </svg>
                Done
              </span>
              <svg className="trails" viewBox="0 0 33 64">
                <path d="M26,4 C28,13.3333333 29,22.6666667 29,32 C29,41.3333333 28,50.6666667 26,60"></path>
                <path d="M6,4 C8,13.3333333 9,22.6666667 9,32 C9,41.3333333 8,50.6666667 6,60"></path>
              </svg>
              <div className="plane">
                <div className="left"></div>
                <div className="right"></div>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NameInput;
