import { AiOutlineDelete } from "react-icons/ai";
import { BsArrowsMove } from "react-icons/bs";
import { FiCopy } from "react-icons/fi";

import { useRefs } from "../../hooks/useRefs";
import { useOptionsValue } from "@/recoil/options";

const SelectionBtns = () => {
  const { selection } = useOptionsValue();
  const { selectionRefs } = useRefs();

  let top;
  let left;

  if (selection) {
    const { x, y, width, height } = selection;
    top = Math.min(y, y + height) - 40;
    left = Math.min(x, x + width);
  } else {
    left = -40;
    top = -40;
  }

  return (
    <div
      className="absolute left-0 top-0 z-50 flex items-center justify-center gap-2"
      style={{ top, left }}
    >
      <button
        className="rounded-full bg-gray-200 p-2"
        ref={(ref) => {
          if (ref && selectionRefs.current) selectionRefs.current[0] = ref;
        }}
      >
        <BsArrowsMove />
      </button>
      <button
        className="rounded-full bg-gray-200 p-2"
        ref={(ref) => {
          if (ref && selectionRefs.current) selectionRefs.current[1] = ref;
        }}
      >
        <FiCopy />
      </button>
      <button
        className="rounded-full bg-gray-200 p-2"
        ref={(ref) => {
          if (ref && selectionRefs.current) selectionRefs.current[2] = ref;
        }}
      >
        <AiOutlineDelete />
      </button>
    </div>
  );
};

export default SelectionBtns;
