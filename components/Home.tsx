import { FormEvent, useEffect, useState } from "react";

import { useRouter } from "next/router";

import { HomeIcon } from "@heroicons/react/24/outline";
import NotFoundModal from "../modals/NotFound";

import { socket } from "@/lib/socket";
import { useModal } from "@/recoil/modal";
import { useSetRoomId } from "@/recoil/room";
import input from "postcss/lib/input";

const Home = () => {
  const { openModal } = useModal();
  const setAtomRoomId = useSetRoomId();

  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const router = useRouter();

  useEffect(() => {
    document.body.style.backgroundColor = "white";
  }, []);

  useEffect(() => {
    socket.on("created", (roomIdFromServer) => {
      setAtomRoomId(roomIdFromServer);
      router.push(roomIdFromServer);
    });

    const handleJoinedRoom = (roomIdFromServer: string, failed?: boolean) => {
      if (!failed) {
        setAtomRoomId(roomIdFromServer);
        router.push(roomIdFromServer);
      } else {
        openModal(<NotFoundModal id={roomId} />);
      }
    };

    socket.on("joined", handleJoinedRoom);

    return () => {
      socket.off("created");
      socket.off("joined", handleJoinedRoom);
    };
  }, [openModal, roomId, router, setAtomRoomId]);

  useEffect(() => {
    socket.emit("leave_room");
    setAtomRoomId("");
  }, [setAtomRoomId]);

  const handleCreateRoom = () => {
    socket.emit("create_room", username);
  };

  const handleJoinRoom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (roomId) socket.emit("join_room", roomId, username);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#03040B]">
      <div className="flex flex-col items-center py-24">
        <div className="space-y-1">
          <h2 className="text-stroke animate-title z-10 cursor-default whitespace-nowrap bg-white bg-clip-text text-center text-3xl font-bold text-transparent duration-1000 sm:text-5xl md:text-6xl">
            Share Your Ideas With
          </h2>
          <h1 className="animate-fade-in-3 z-10 cursor-default whitespace-nowrap bg-white bg-gradient-to-r from-purple-300 to-purple-800 bg-clip-text text-center text-4xl font-bold text-transparent duration-1000 sm:text-6xl md:text-7xl">
            C0-CR3ATE
          </h1>
        </div>

        <div className="flex flex-col space-y-8 md:w-[400px]">
          <h5 className="animate-fade-in-3 z-10 cursor-default whitespace-nowrap bg-white bg-gradient-to-r from-purple-300 to-purple-800 bg-clip-text text-center text-2xl font-bold text-transparent duration-1000 sm:text-6xl md:text-5xl">
            <div className="shadow-outline-gray focus-within:!shadow-outline-gray-focus group mt-5 flex items-center gap-x-4 rounded-[9px] bg-[#090D11] py-1 pl-4 pr-1 transition-all duration-300 focus-within:bg-[#15141B] hover:bg-[#15141B] hover:shadow-transparent">
              <HomeIcon className="hidden h-6 w-6 text-[#4B4C52] transition-colors duration-300 group-focus-within:text-white group-hover:text-white sm:inline" />
              <input
                placeholder="Enter Your Name"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value.slice(0, 15))}
                className="btn flex-1 bg-transparent text-sm text-white placeholder-[#4B4C52] outline-none placeholder:transition-colors placeholder:duration-300 group-focus-within:placeholder-white sm:text-base"
              />
              <button
                className={`btn text-sm disabled:cursor-not-allowed disabled:!bg-[#8c62ff] disabled:opacity-50 disabled:grayscale-[65%] md:text-base`}
                disabled={!input}
                onClick={handleCreateRoom}
              >
                <span className="default">Create</span>

                <div className="plane">
                  <div className="left"></div>
                  <div className="right"></div>
                </div>
              </button>
            </div>
            OR
          </h5>
          <form
            onSubmit={handleJoinRoom}
            className="newsletter-form animate-fade-in-3 mt-10"
          >
            <div className="shadow-outline-gray focus-within:!shadow-outline-gray-focus group flex items-center gap-x-4 rounded-[9px] bg-[#090D11] py-1 pl-4 pr-1 transition-all duration-300 focus-within:bg-[#15141B] hover:bg-[#15141B] hover:shadow-transparent">
              <HomeIcon className="hidden h-6 w-6 text-[#4B4C52] transition-colors duration-300 group-focus-within:text-white group-hover:text-white sm:inline" />
              <input
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="Enter Room Name"
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
    </div>
  );
};

export default Home;
