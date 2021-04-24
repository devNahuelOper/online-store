import React, { useState } from "react";
import { ClickAwayListener } from "@material-ui/core";
import { Mutation } from "react-apollo";
import NameField from "../../common/fields/NameField";

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
            <div>
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
              ></form>
            </div>
          </ClickAwayListener>
        )}
      </Mutation>
    );
  }
};

export default NameDetail;
