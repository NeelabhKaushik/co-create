import { CgScreen } from "react-icons/cg";

import BackgroundModal from "../../modals/BackgroundModal";
import { useModal } from "@/recoil/modal";

const BackgroundPicker = () => {
  const { openModal } = useModal();

  return (
    <button className="btn-icon" onClick={() => openModal(<BackgroundModal />)}>
      <CgScreen />
    </button>
  );
};

export default BackgroundPicker;
