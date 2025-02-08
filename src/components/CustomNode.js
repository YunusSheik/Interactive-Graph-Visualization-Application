import { Handle, Position } from "reactflow";
import { useDispatch } from "react-redux";
import { setSelectedNode } from "../store/graphSlice";

function CustomNode({ data, id }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setSelectedNode(id));
  };

  return (
    <div
      className="custom-node"
      style={{
        background: data.color || "#fff",
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #555",
        fontSize: `${data.fontSize}px`,
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <Handle type="target" position={Position.Top} />
      {data.label}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default CustomNode;
