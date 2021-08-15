import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { ClickAwayListener } from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import EditTools from "../../common/EditTools";

import Mutations from "../../../graphql/mutations";
const { UPDATE_PRODUCT_DESCRIPTION } = Mutations;

const DescriptionDetail = (props) => {
  const [editing, handleEdit] = useState(false);
  const [description, update] = useState(props.description || "");

  if (editing) {
    return (
      <Mutation mutation={UPDATE_PRODUCT_DESCRIPTION}>
        {(updateDescription, data) => (
          <ClickAwayListener onClickAway={() => handleEdit(false)}>
            <div className="editing">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateDescription({
                    variables: {
                      _id: props._id,
                      description,
                    },
                  }).then(() => handleEdit(false));
                }}
              >
                <textarea
                  className="update-description"
                  value={description}
                  onChange={(e) => update(e.target.value)}
                />
                <button
                  className="update-btn"
                  type="submit"
                  title="Submit Changes"
                >
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
      <div className="detail-edit description-edit">
        <p className="product-description">{description}</p>
        <EditTools
          onClick={() => handleEdit(true)}
          title="Edit Product Description"
        />
      </div>
    );
  }
};

export default DescriptionDetail;
