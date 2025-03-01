import { Slot } from "../../../unit/package/Primitive/main";
import { MeshRenderer, CylinderCollider } from "../../../unit/package/StyledObject/main";
import { Cell } from "../../game/map";
import { Material, Mesh } from "../style";

export const CellRender = ({ cell }: { cell: Cell }) => (
  <Slot position={cell.point}>
    <CylinderCollider height={0.1} radius={0.99} />
    {cell.cellState.type === "red" ? (
      <MeshRenderer styledMaterial={Material.red} styledMesh={Mesh.hex} />
    ) : cell.cellState.type === "blue" ? (
      <MeshRenderer styledMaterial={Material.blue} styledMesh={Mesh.hex} />
    ) : (
      <MeshRenderer styledMaterial={Material.white} styledMesh={Mesh.hex} />
    )}
  </Slot>
);