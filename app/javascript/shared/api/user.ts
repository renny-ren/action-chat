import { get, post, put, patch, destroy } from "../utils/request"

export function fetchMessages(page) {
  return get(`/v1/messages?page=${page}`)
}

export function fetchUser(id) {
  return get(`/v1/users/${id}`)
}

export function updateUser(id, data) {
  return put(`/v1/users/${id}`, data)
}

export function registerUser(params) {
  return post("/users", params)
}

export function loginUser(params) {
  return post("/users/sign_in", params)
}

export function logoutUser() {
  return destroy("/users/sign_out")
}
