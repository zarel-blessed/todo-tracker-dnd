import { SetStateAction } from "react";

const Overlay = ({ setEditMode }: { setEditMode: React.Dispatch<SetStateAction<boolean>> }) => {
  return (
    <div className="overlay" onClick={() => setEditMode(false)} />
  );
}

export default Overlay;
