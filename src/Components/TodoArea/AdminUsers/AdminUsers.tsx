import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { ClientTypes } from "../../../Models/Enums";
import { UserTypeModel } from "../../../Models/UserTypeModel";
import store from "../../../Redux/Store";
import { usersDownloadedAction } from "../../../Redux/UsersAppState";
import notify from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import CustomLink from "../../RoutingArea/CustomLink/CustomLink";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import "./AdminUsers.css";

function AdminUsers(): JSX.Element {
  const [users, setUsers] = useState<UserTypeModel[]>(
    store.getState().usersReducer.users
  );

  let userType: string;
  if (localStorage.getItem("user") !== null) {
    userType = JSON.parse(localStorage.getItem("user")).type;
  } else {
    userType = null;
  }

  //<= 1 since user app state can be filled with only one user if user was logged first for add coupon to get users mail
  useEffect(() => {
    if (store.getState().usersReducer.users.length <= 1) {
      web
        .getAllUsers()
        .then((res) => {
          setUsers(res.data);
          // Update App State (Global State)
          store.dispatch(usersDownloadedAction(res.data));
        })
        .catch((err) => {
          notify.error(err);
        });
    }
    return store.subscribe(() => {
      setUsers(store.getState().usersReducer.users);
    });
  }, [users]);

  return (
    <div className="AdminUsers flex-center-col">
      {users.length > 0 && userType === ClientTypes.ADMIN ? (
        <div className="Table flex-center-col">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>id</th>
                <th>Email</th>
                <th>Password</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr data-index={index}>
                  <td>
                    {/* <CustomLink to={`/admin/companies/${company.id}`}> */}
                    {user.id}
                    {/* </CustomLink> */}
                  </td>

                  <td>{user.email}</td>
                  <td>{user.password}</td>
                </tr>
              ))}
              <tr>
                <th> </th>
                <th>Total users#:</th>
                <th>{store.getState().usersReducer.users.length}</th>
              </tr>
            </tbody>
          </Table>
        </div>
      ) : (
        <h3>
          <EmptyView msg={"Only Admin can see the list!"} />
        </h3>
      )}
    </div>
  );
}

export default AdminUsers;
