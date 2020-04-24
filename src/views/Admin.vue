<template>
  <div class="admin">
    <div class="page-wrapper default-theme sidebar-bg bg1 toggled">
      <a
        id="show-sidebar"
        @click="closeMenu"
        class="btn btn-sm btn-dark"
        href="#"
      >
        <i class="fas fa-bars"></i>
      </a>
      <nav id="sidebar" class="sidebar-wrapper">
        <div class="sidebar-content">
          <!-- sidebar-brand  -->
          <div class="sidebar-item sidebar-brand">
            <a href="#">Vue Shop</a>
            <div id="close-sidebar" @click="closeMenu">
              <i class="fas fa-times"></i>
            </div>
          </div>
          <!-- sidebar-header  -->
          <div class="sidebar-item sidebar-header">
            <div class="user-pic">
              <img
                class="img-responsive img-rounded"
                :src="userPhoto"
                alt="User picture"
              />
            </div>
            <div class="user-info">
              <p class="user-name first-letter">{{ user.displayName }}</p>
              <span class="user-role"> {{ user.email }} </span>
              <span class="user-status">
                <i class="fa fa-circle"></i>
                <span>Online</span>
              </span>
            </div>
          </div>
          <!-- sidebar-search  -->
          <div class="sidebar-item sidebar-search">
            <div>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control search-menu"
                  placeholder="Search..."
                />
                <div class="input-group-append">
                  <span class="input-group-text">
                    <i class="fa fa-search" aria-hidden="true"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <!-- sidebar-menu  -->
          <div class="sidebar-item sidebar-menu">
            <div class="header-menu">
              <span>Menu</span>
            </div>
          </div>
          <div class="sidebar-item sidebar-menu">
            <ul>
              <li>
                <router-link to="/admin/overview">
                  <i class="fa fa-chart-line"></i>
                  <span>Overview</span>
                </router-link>
              </li>
              <li>
                <router-link to="/admin/products">
                  <i class="fab fa-amazon"></i>
                  <span>Products</span>
                </router-link>
              </li>
              <li>
                <router-link to="/admin/orders">
                  <i class="fa fa-shopping-cart"></i>
                  <span>Orders</span>
                </router-link>
              </li>
              <li>
                <router-link to="/admin/charts">
                  <i class="fa fa-chart-line"></i>
                  <span>Charts</span>
                </router-link>
              </li>
              <li>
                <router-link to="/admin/profile">
                  <i class="fa fa-user"></i>
                  <span>Profile</span>
                </router-link>
              </li>
              <li>
                <a href="#" @click="logout()">
                  <i class="fa fa-power-off"></i>
                  <span>Logout</span>
                </a>
              </li>
            </ul>
          </div>
          <!-- sidebar-menu  -->
        </div>
      </nav>
      <!-- sidebar-content  -->
      <main class="page-content">
        <router-view />
      </main>
      <!-- page-content" -->
    </div>
    <!-- page-wrapper -->
  </div>
</template>

<script>
import { fb } from "../firebase";
import $ from "jquery";

export default {
  name: "admin",
  methods: {
    closeMenu() {
      $(".page-wrapper").toggleClass("toggled");
    },
    logout() {
      fb.auth()
        .signOut()
        .then(() => {
          window.Toast.fire({
            type: "success",
            title: "User logged out successfully!"
          });
          this.$router.replace("/");
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  data() {
    return {
      userPhoto: "",
      user: null
    };
  },
  created() {
    const user = fb.auth().currentUser;
    if (user) {
      // User is signed in.
      this.userPhoto = user.photoURL ? user.photoURL : "/img/user.png";
      this.user = user;
      // console.log(this.userName + " signed in!");
    }
  }
};
</script>

<style scoped>
p.first-letter {
  text-transform: capitalize;
}
li {
  float: left;
}
</style>
