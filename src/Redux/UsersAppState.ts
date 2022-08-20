import { UserTypeModel } from "../Models/UserTypeModel";

// Step 1 - Create AppState and manage the collection once and in a centralize place
export class UsersAppState {
  public users: UserTypeModel[] = [];
}

// Step 2 - Define all possible action for your application state
export enum UsersActionType {
  UsersDownloaded = "UsersDownloaded",
  UserClear = "UserClear",
  UserAdded = "UserAdded",
}

// Step 3 - Define Action Interface to describe actionAction & payload if needed
export interface UsersAction {
  type: UsersActionType;
  payload?: any;
}

// Step 4 - Export Action Creators functions that gets payload and return relevant Action
export function usersDownloadedAction(users: UserTypeModel[]): UsersAction {
  // console.log("step4 users " + users);
  return { type: UsersActionType.UsersDownloaded, payload: users };
}

export function usersClear(): UsersAction {
  return { type: UsersActionType.UserClear };
}

export function UserAddedAction(user: UserTypeModel): UsersAction {
  return { type: UsersActionType.UserAdded, payload: user };
}

// Step 5 - Reducer function perform the required action
export function usersReducer(
  currentState: UsersAppState = new UsersAppState(),
  action: UsersAction
): UsersAppState {
  const newState = { ...currentState }; //Spread Operator

  switch (action.type) {
    case UsersActionType.UsersDownloaded:
      newState.users = action.payload;
      // console.log("downloaded...");
      // console.log(newState.users);
      // console.log("payload: " + action.payload);
      break;

    case UsersActionType.UserClear:
      newState.users = [];
      break;

    case UsersActionType.UserAdded:
      newState.users.push(action.payload);
      break;
  }
  return newState;
}
