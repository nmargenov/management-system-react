import { useEffect, useState } from "react";
import { UserList } from "./UserList";
import * as userService from "../services/userService";
import { InfoModal } from "./InfoModal";
import { Spinner } from "./Spinner";
import { CreateUserModal } from "./CreateUserModal";
import { DeleteUserModal } from "./DeleteUserModal";
import { EditUserModal } from "./EditUserModal";
import { Error } from "./Error";
import { NoUsers } from "./NoUsers";
import { SearchBar } from "./SearchBar";

export const Main = () => {

  //Start of application
  const [users, setUsers] = useState([]);
  const [isLoadingStart, setIsLoadingStart] = useState(false);
  const [hasErrorStart, setHasErrorStart] = useState(false);

  useEffect(() => {
    setIsLoadingStart(true);
    userService
      .getAll()
      .then((data) => {
        setIsLoadingStart(false);
        setHasErrorStart(false);
        setUsers(data);
      })
      .catch((err) => {
        setIsLoadingStart(false);
        setHasErrorStart(true);
        console.log(err);
      });
  }, []);

  //Details 
  const [detailsInfo, setDetailsInfo] = useState(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  function onDetailsClick(_id) {
    setIsLoadingDetails(true);
    getUserById(_id,setIsLoadingDetails,setDetailsInfo);
  }

  function onDetailsClose() {
    setDetailsInfo(null);
  }

  async function getUserById(_id,loader,setInfo){
    userService
    .getOneById(_id)
    .then((data) => {
      loader(false);
      setInfo(data);
    })
    .catch((err) => {
      loader(false);
      console.log(err);
    });
  }

  //Add User
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  function onAddUserOpen(){
    setIsAddUserOpen(true);
  }

  function onAddUserClose(isCreating){
    if(isCreating){
      return;
    }
    setIsAddUserOpen(false);
  }

  function addCreatedUserToState(newUser){
    setUsers(oldState => [...oldState,newUser]);
  }

  //delete User
  const [isDeleteUserOpen, setIsDeleteUserOpen] = useState(null);

  function onDeleteOpen(id){
    setIsDeleteUserOpen(id);
  }

  function onDeleteClose(isDeleting){
    if(isDeleting){
      return;
    }
    setIsDeleteUserOpen(null);
  }

  function updateUsersStateAfterDelete(id){
    setUsers(oldState=>oldState.filter(u=>u._id !== id));
  }

  //edit User

  const [editInfo, setEditInfo] = useState(null);
  const [isEditInfoLoading, setIsEditInfoLoading] = useState(false);

  function onEditInfoOpen(_id) {
    setIsEditInfoLoading(true);
    getUserById(_id,setIsEditInfoLoading,setEditInfo);
  }

  function onEditInfoClose(isCreating) {
    if(isCreating){
      return;
    }
    setEditInfo(null);
  }

  function editUserStateAfterEdit(user){
    setUsers(oldState=>oldState.map(u=>u._id === user._id ? {...u, ...user}:u));
  }

  return (
    <main className="main">
      {editInfo && <EditUserModal editState={editUserStateAfterEdit} {...editInfo} {...editInfo.address} onClose={onEditInfoClose}/>}
      {isDeleteUserOpen && <DeleteUserModal updateUsers={updateUsersStateAfterDelete} isDeleteUserOpen={isDeleteUserOpen} onDeleteClose={onDeleteClose}/>}
      {isAddUserOpen && <CreateUserModal addCreatedUserToState={addCreatedUserToState} onAddUserClose={onAddUserClose}/>}
      {(isLoadingDetails || isEditInfoLoading) && <Spinner/>}
      {!isLoadingDetails && detailsInfo && <InfoModal {...detailsInfo} {...detailsInfo.address} onDetailsClose={onDetailsClose}/>}
      {!isLoadingStart && !hasErrorStart && <section className="card users-container">
      <SearchBar users={users}/>

        {users.length >= 1 && <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Image</th>
                <th>
                  First name
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="arrow-down"
                    className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                  >
                    <path
                      fill="currentColor"
                      d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                    ></path>
                  </svg>
                </th>
                <th>
                  Last name
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="arrow-down"
                    className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                  >
                    <path
                      fill="currentColor"
                      d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                    ></path>
                  </svg>
                </th>
                <th>
                  Email
                  <svg
                    className="icon"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="arrow-down"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                  >
                    <path
                      fill="currentColor"
                      d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                    ></path>
                  </svg>
                </th>
                <th>
                  Phone
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="arrow-down"
                    className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                  >
                    <path
                      fill="currentColor"
                      d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                    ></path>
                  </svg>
                </th>
                <th>
                  Created
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="arrow-down"
                    className="icon active-icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                  >
                    <path
                      fill="currentColor"
                      d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                    ></path>
                  </svg>
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {!isLoadingDetails && !isEditInfoLoading && users.map((user) => (
                <UserList
                  key={user._id}
                  {...user}
                  onDetailsClick={onDetailsClick}
                  onEditClick={onEditInfoOpen}
                  onDeleteOpen={onDeleteOpen}
                />
              ))}
            </tbody>
          </table>
        </div>}

        {users.length===0 && <NoUsers/>}

        {!isLoadingDetails && !isEditInfoLoading && <button className="btn-add btn" onClick={onAddUserOpen}>Add new user</button>}

        <div className="pagination position">
          <div className="limits">
            <span>Items per page:</span>
            <select name="limit" className="limit">
              <option>5</option>
              <option>10</option>
              <option>15</option>
              <option>20</option>
            </select>
          </div>
          <p className="pages">1 - 1 of 1</p>
          <div className="actions">
            <button className="btn" title="First Page">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="angles-left"
                className="svg-inline--fa fa-angles-left"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M77.25 256l137.4-137.4c12.5-12.5 12.5-32.75 0-45.25s-32.75-12.5-45.25 0l-160 160c-12.5 12.5-12.5 32.75 0 45.25l160 160C175.6 444.9 183.8 448 192 448s16.38-3.125 22.62-9.375c12.5-12.5 12.5-32.75 0-45.25L77.25 256zM269.3 256l137.4-137.4c12.5-12.5 12.5-32.75 0-45.25s-32.75-12.5-45.25 0l-160 160c-12.5 12.5-12.5 32.75 0 45.25l160 160C367.6 444.9 375.8 448 384 448s16.38-3.125 22.62-9.375c12.5-12.5 12.5-32.75 0-45.25L269.3 256z"
                ></path>
              </svg>
            </button>

            <button className="btn" title="Previous Page">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="angle-left"
                className="svg-inline--fa fa-angle-left"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 512"
              >
                <path
                  fill="currentColor"
                  d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z"
                ></path>
              </svg>
            </button>
            <button className="btn" title="Next Page">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="angle-right"
                className="svg-inline--fa fa-angle-right"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 512"
              >
                <path
                  fill="currentColor"
                  d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"
                ></path>
              </svg>
            </button>

            <button className="btn" title="Last Page">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="angles-right"
                className="svg-inline--fa fa-angles-right"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M246.6 233.4l-160-160c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25L178.8 256l-137.4 137.4c-12.5 12.5-12.5 32.75 0 45.25C47.63 444.9 55.81 448 64 448s16.38-3.125 22.62-9.375l160-160C259.1 266.1 259.1 245.9 246.6 233.4zM438.6 233.4l-160-160c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25L370.8 256l-137.4 137.4c-12.5 12.5-12.5 32.75 0 45.25C239.6 444.9 247.8 448 256 448s16.38-3.125 22.62-9.375l160-160C451.1 266.1 451.1 245.9 438.6 233.4z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </section>}
      {!isLoadingStart && hasErrorStart && <Error/>}
      {isLoadingStart &&<Spinner/>}
    </main>
  );
};
