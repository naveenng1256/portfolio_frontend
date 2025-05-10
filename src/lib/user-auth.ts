import { USER } from "./types";

const USER_STORAGE = "_ryt_ride_user_info_";

export function setLoggedInUser(user: USER) {
  localStorage.setItem(USER_STORAGE, JSON.stringify(user));
}

export function removeLoggedInUser() {
  localStorage.removeItem(USER_STORAGE);
}

export function getLoggedInUser() {
  const user = JSON.parse(localStorage.getItem(USER_STORAGE) ?? "{}") as USER;
  return user;
}

export function getLoggedInUserEmail() {
  const user = getLoggedInUser();
  return user?.userEmail ?? "";
}

export function getLoggedInUserID() {
  const user = getLoggedInUser();
  return user?.id ?? "";
}