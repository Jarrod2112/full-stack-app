import http from "../utils/http";

export const FriendRequestsResources = {
  accept: (friendRequestId) => {
    return http.patch(`/api/friend-requests/accept/${friendRequestId}`);
  },
  create: (toUserId) => {
    return http.post("/api/friend-requests/", { toUserId });
  },
  fetchAll: () => {
    return http.get("/api/friend-requests/");
  },
  reject: (friendRequestId) => {
    return http.patch(`/api/friend-requests/reject/${friendRequestId}`);
  }
}
