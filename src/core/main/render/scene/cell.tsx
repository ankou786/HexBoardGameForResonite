import { Slot } from "../../../unit/package/Primitive/main";
import { MeshRenderer, CylinderCollider } from "../../../unit/package/StyledObject/main";
import { Cell } from "../../game/map";
import { Material, Mesh } from "../style";

export const CellRender = ({ cell }: { cell: Cell }) => {
  let material;
  switch (cell.cellState.type) {
    case "red":
      material = Material.red;
      break;
    case "blue":
      material = Material.blue;
      break;
    case "winBlue":
      material = Material.winBlue;
      break;
    case "winRed":
      material = Material.winRed;
      break;
    default:
      material = Material.white;
  }

  return (
    <Slot position={cell.point}>
      <CylinderCollider height={0.1} radius={0.99} />
      <MeshRenderer styledMaterial={material} styledMesh={Mesh.hex} />
    </Slot>
  );
};