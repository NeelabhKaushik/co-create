import { FaRedo, FaUndo } from "react-icons/fa";

import { useRefs } from "../../hooks/useRefs";
import { useMyMoves } from "@/recoil/room";
import { useSavedMoves } from "@/recoil/savedMoves";

const HistoryBtns = () => {
  const { redoRef, undoRef } = useRefs();

  const { myMoves } = useMyMoves();
  const savedMoves = useSavedMoves();

  return (
    <>
      <button
        className="btn-icon text-xl"
        ref={redoRef}
        disabled={!savedMoves.length}
      >
        <FaRedo />
      </button>
      <button
        className="btn-icon text-xl"
        ref={undoRef}
        disabled={!myMoves.length}
      >
        <FaUndo />
      </button>
    </>
  );
};

export default HistoryBtns;
