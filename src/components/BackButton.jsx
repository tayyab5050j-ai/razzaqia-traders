import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      className="back-btn"
      onClick={() => navigate(-1)}
    >
      <FaArrowLeft />
    </button>
  );
}