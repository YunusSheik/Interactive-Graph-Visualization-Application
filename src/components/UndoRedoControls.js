import { useDispatch, useSelector } from "react-redux";
import { undo, redo } from "../store/graphSlice";

function UndoRedoControls() {
  const dispatch = useDispatch();
  const past = useSelector((state) => state.graph.past);
  const future = useSelector((state) => state.graph.future);

  return (
    <div className="undo-redo-controls">
      <button
        onClick={() => dispatch(undo())}
        disabled={past.length === 0}
        className="button"
      >
        Undo
      </button>
      <button
        onClick={() => dispatch(redo())}
        disabled={future.length === 0}
        className="button"
      >
        Redo
      </button>
    </div>
  );
}

export default UndoRedoControls;
