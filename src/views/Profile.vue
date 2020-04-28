<template>
  <div class="products">
    <div class="container">
      <div class="intro h-100">
        <div class="row h-100 align-items-center">
          <div class="col-md-6 ml-3">
            <h3>Profile settings</h3>

            <p>
              Change your profile settings here
            </p>
          </div>
          <div class="col-md-5">
            <img
              src="/img/svg/profile.svg"
              width="300"
              alt=""
              class="img-fluid"
            />
          </div>
        </div>
      </div>

      <div class="profile-content">
        <ul class="nav nav-pills ml-3" id="myTab" role="tablist">
          <li class="nav-item">
            <a
              class="nav-link active"
              id="profile-tab"
              data-toggle="tab"
              href="#profile"
              role="tab"
              aria-controls="profile"
              aria-selected="true"
              >Profile</a
            >
          </li>

          <li class="nav-item">
            <a
              class="nav-link"
              id="account-tab"
              data-toggle="tab"
              href="#account"
              role="tab"
              aria-controls="account"
              aria-selected="false"
              >Account settings</a
            >
          </li>
        </ul>

        <div class="tab-content" id="myTabContent">
          <div
            class="tab-pane fade show active pt-3"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <div class="container">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <input
                      type="text"
                      name=""
                      v-model="profile.name"
                      placeholder="Full name"
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="profile.phone"
                      placeholder="Phone"
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="profile.address"
                      placeholder="Address"
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="col-md-8">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="profile.postCode"
                      placeholder="Postcode"
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="col-md-4">
                  <div class="form-group">
                    <input
                      type="submit"
                      @click="updateProfile"
                      value="Save Changes"
                      class="btn btn-primary w-100"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="tab-pane fade pt-3"
            id="account"
            role="tabpanel"
            aria-labelledby="account-tab"
          >
            <div class="container">
              <div class="row">
                <!-- <div class="col-md-">
                  <div class="alert alert-info">
                    Please use the Reset password email button for reseting the
                    password. The form doens't work currently
                  </div>
                </div> -->
                <div class="col-md-6">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="account.name"
                      placeholder="User name"
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="account.email"
                      placeholder="Email address"
                      class="form-control"
                    />
                  </div>
                </div>

                <!-- <div class="col-md-6">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="account.password"
                      placeholder="New password"
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="account.confirmPassword"
                      placeholder="Confirm password"
                      class="form-control"
                    />
                  </div>
                </div> -->

                <div class="col-md-6">
                  <div class="form-group">
                    <h4>Choose a profile photo:</h4>
                    <input
                      type="file"
                      @change="uploadImage"
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group d-flex">
                    <div class="img-wrapp">
                      <img :src="account.photoUrl" alt="X" width="80px" />
                      <!-- <span class="delete-img" @click="deleteImage(image,index)">X</span> -->
                    </div>
                  </div>
                </div>

                <div class="col-md-4">
                  <div class="form-group">
                    <input
                      type="submit"
                      @click="saveAccount"
                      value="Save Changes"
                      class="btn btn-primary w-100"
                    />
                  </div>
                </div>

                <!-- <div class="col-md-8">
                  <div class="form-group">
                    <input
                      type="button"
                      @click="resetPassword"
                      value="Reset password email"
                      class="btn btn-success w-100"
                    />
                  </div>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fb, db } from "../firebase";

export default {
  name: "Profile",
  props: {
    msg: String
  },

  data() {
    return {
      profile: {},
      account: {}
    };
  },

  firestore() {
    const user = fb.auth().currentUser;
    if (user != null) {
      this.account.name = user.displayName;
      this.account.email = user.email;
      this.account.photoUrl = user.photoURL;
      // this.account.uid = user.uid;
    }
    return {
      profile: db.collection("profiles").doc(user.uid)
    };
  },
  methods: {
    resetPassword() {
      const auth = fb.auth();
      auth
        .sendPasswordResetEmail(auth.currentUser.email)
        .then(() => {
          window.Toast.fire({
            type: "success",
            title: "Email sent"
          });
        })
        .catch(error => {
          console.log(error);
        });
    },

    updateProfile() {
      // this.$firestore.profile.update(this.profile);
      var user = fb.auth().currentUser;
      db.collection("profiles")
        .doc(user.uid)
        // .set({
        .update({
          name: this.profile.name,
          address: this.profile.address,
          phone: this.profile.phone,
          postCode: this.profile.postCode
        })
        .then(() => {
          console.log("Added data to profile");
        })
        .catch(err => {
          console.log(err);
        });
    },
    uploadImage(e) {
      if (e.target.files[0]) {
        let file = e.target.files[0];

        var storageRef = fb
          .storage()
          .ref("images/" + Math.random() + "_" + file.name);

        let uploadTask = storageRef.put(file);

        uploadTask.on(
          "state_changed",
          // eslint-disable-next-line no-unused-vars
          snapshot => {},
          error => {
            // Handle unsuccessful uploads
            console.log(error);
          },
          () => {
            // Handle successful uploads on complete
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              this.account.photoUrl = downloadURL;
            });
          }
        );
      }
    },
    saveAccount() {
      var user = fb.auth().currentUser;

      user
        .updateProfile({
          displayName: this.account.name,
          photoURL: this.account.photoUrl
        })
        .then(function() {
          // Update successful.
        })
        .catch(function(error) {
          console.log(error);
          // An error happened.
        });
    }
  },
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.img-wrapp {
  position: relative;
}
</style>
