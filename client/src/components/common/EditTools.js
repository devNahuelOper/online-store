import React from "react";
import { IconContext } from "react-icons";
import { FaPencilAlt } from "react-icons/fa";

const EditTools = ({ onClick, title, icon = "pencil"}) => {
  return (
    <div className={`edit-tools ${icon}-tool`} onClick={onClick} title={title}>
      <IconContext.Provider value={{ className: `custom-icon ${icon}`}}>
        {icon === "pencil" && <FaPencilAlt />}
      </IconContext.Provider>
    </div>
  )
}

export default EditTools;