const currentUser = {
  userMeta() {
    return gon.user_meta
  },

  isSignedIn() {
    return !!this.userMeta()
  },

  id() {
    return gon.user_meta?.id
  },

  nickname() {
    return gon.user_meta?.nickname
  },

  email() {
    return gon.user_meta?.email
  },

  avatarUrl() {
    return gon.user_meta?.avatar_url
  },
}

export default currentUser
