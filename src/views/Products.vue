<template>
  <div class="products">
    <div class="container h-100">
      <div class="intro h-100">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-6">
            <h3>Products Page</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde,
              ducimus.
            </p>
          </div>
          <div class="col-md-6">
            <img src="/img/svg/products.svg" alt="" class="img-fluid" />
          </div>
        </div>
      </div>
      <hr />
      <div class="product-test">
        <h3 class="d-inline-block">Product List</h3>
        <button @click="addNewProduct()" class="btn btn-primary float-right">
          Add Product
        </button>
        <table class="table table-striped">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Modify</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, id) in products" :key="id">
              <td>{{ product.name }}</td>
              <td>{{ product.price }}</td>
              <td>
                <button @click="editProduct(product)" class="btn btn-primary">
                  Edit
                </button>
                <button @click="deleteProduct(product)" class="btn btn-danger">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="edit"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editLabel">Edit</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <input
                type="text"
                placeholder="Product Name"
                v-model="product.name"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <input
                type="text"
                placeholder="Price"
                v-model="product.price"
                class="form-control"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              @click="addProduct()"
              type="button"
              class="btn btn-primary"
              v-if="modal == 'new'"
            >
              Save changes
            </button>
            <button
              @click="updateProduct()"
              type="button"
              class="btn btn-primary"
              v-if="modal == 'edit'"
            >
              Apply changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { db } from "../firebase";
import $ from "jquery";

export default {
  name: "Products",
  props: {
    msg: String
  },
  data() {
    return {
      products: [],
      product: {
        name: "",
        price: ""
      },
      modal: null
    };
  },
  firestore() {
    return {
      products: db.collection("products")
    };
  },
  methods: {
    // Show modal dialog for adding new data
    addNewProduct() {
      this.modal = "new";
      $("#edit").modal("show");
    },
    // Add the new data
    addProduct() {
      this.$firestore.products.add(this.product);
      $("#edit").modal("hide");
    },
    // Show the modal dialog and fill in data to prepare a data update
    editProduct(doc) {
      this.modal = "edit";
      this.product = Object.assign({}, doc);
      $("#edit").modal("show");
    },
    // Update the data in the db
    updateProduct() {
      this.$firestore.products.doc(this.product.id).update(this.product);
      $("#edit").modal("hide");
    },
    // Delete a doc in db
    deleteProduct(doc) {
      this.$firestore.products.doc(doc.id).delete();
    }
  },
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
