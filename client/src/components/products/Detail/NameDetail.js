import React, { useState } from "react";
import { ClickAwayListener } from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { Mutation } from "react-apollo";
import NameField from "../../common/fields/NameField";
import EditTools from "../../common/EditTools";

import Mutations from "../../../graphql/mutations";
const { UPDATE_PRODUCT_NAME } = Mutations;

const NameDetail = (props) => {
  const [editing, handleEdit] = useState(false);
  const [name, update] = useState(props.name || "");

  if (editing) {
    return (
      <Mutation mutation={UPDATE_PRODUCT_NAME}>
        {(updateName, data) => (
          <ClickAwayListener onClickAway={() => handleEdit(false)}>
            <div className="editing">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateName({
                    variables: {
                      _id: props._id,
                      name,
                    },
                  }).then(() => handleEdit(false));
                }}
              >
                <NameField
                  name={name}
                  entity="Product"
                  variant="standard"
                  onChange={(e) => update(e.target.value)}
                />
                <button className="update-btn" type="submit" title="Submit Changes">
                  <CheckCircleOutlineIcon />
                </button>
              </form>
            </div>
          </ClickAwayListener>
        )}
      </Mutation>
    );
  } else {
    return (
      <div className="detail-edit name-edit">
        <h1 className="product-name">{name}</h1>
        <EditTools onClick={() => handleEdit(true)} title="Edit Product Name"/>
      </div>
    );
  }
};

export default NameDetail;
