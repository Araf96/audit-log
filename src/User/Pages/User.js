import React,{useState, useCallback, useEffect, useContext} from "react";
import axios from "axios";

import { useModal } from "../../hooks/modal-hook";
import UserList from "../Components/UserList";
import { AuthContext } from "../../Context/authCTX";
import LoadingSpinner from "../../Shared/Components/ActionElements/LoadingSpinner";
import Modal from "../../Shared/Components/UIElements/Modal";
import Button from "../../Shared/Components/ActionElements/Button";

const User = (props) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modal, modalOpenHandler, modalCloseHandler] = useModal();
  const auth = useContext(AuthContext);

  const reqFunction = useCallback(async () => {
    setIsLoading(true);
    try {
      var url = `${process.env.REACT_APP_SERVER_URL}/users`;

      const response = await axios.get(url, {
        headers: { "x-auth": auth.uToken },
      });
      setUsers(response.data.users);
      setIsLoading(false);
    } catch (e) {
      var message = "";
      if (e.response) {
        if (!e.response.data) {
          message = e.message || "Something went wrong.";
        } else {
          message = e.response.data.message || "Something went wrong.";
        }
        if (e.response.status !== 404) {
          modalOpenHandler(message, "ERROR");
        }
      } else {
        message = "Something went wrong.";
      }
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    reqFunction();
  }, []);

  return (
    <React.Fragment>
      <Modal
        show={modal.isOpen}
        header="ERROR"
        footer={
          <Button danger onClick={modalCloseHandler}>
            CLOSE
          </Button>
        }
      >
        <p>{modal.message}</p>
      </Modal>
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && users.length === 0 && (
        <h3 className="center">No site found</h3>
      )}
      {!isLoading && users.length !== 0 && (
        <UserList users={users}/>
      )}
    </React.Fragment>
  )
};

export default User;
