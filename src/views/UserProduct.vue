<template>
  <Loading :active="isLoading"></Loading>
  <div class="container">
    <div aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/user/userCart">回購物</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ tempProducts.title }}
        </li>
      </ol>
    </div>
    <div class="row justify-content-center" >
      <article class="col-8">
        <h1>{{ tempProducts.title }}</h1>
        <h6>{{ tempProducts.content }}</h6>
        <h6>{{ tempProducts.description }}</h6>
        <div>
          <img :src="tempProducts.imageUrl" class="img-fluid mb-3 w-75" />
        </div>
      </article>
      <div class="col-4">
        <div class="h5" v-if="!tempProducts.price">
          {{ tempProducts.origin_price }} 元
        </div>
        <del class="h6" v-if="tempProducts.price"
          >原價 {{ tempProducts.origin_price }} 元</del
        >
        <div class="h5" v-if="tempProducts.price">
          現在只要 {{ tempProducts.price }} 元
        </div>
        <hr>
        <button type="button" class="btn btn-outline-danger" @click.prevent="addCart(tempProducts.id)">
          <div class="spinner-border spinner-grow-sm" role="status" v-if="this.status.loadingItem === tempProducts.id">
                <span class="visually-hidden"></span>
          </div>
          加入購物車
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tempProducts: {},
      id: '',
      status: {
        loadingItem: '' // 對應品項ID
      },
      isLoading: false
    }
  },
  methods: {
    getUserProduct () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`;
      this.isLoading = true;
      this.$http.get(api).then((res) => {
        // console.log(res.data.product);
        this.isLoading = false;
        this.tempProducts = res.data.product;
      });
    },
    addCart (id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.status.loadingItem = id;
      const cart = {
        product_id: id,
        qty: 1
      };
      this.$http.post(api, { data: cart }).then((res) => {
        console.log(res);
        this.status.loadingItem = '';
        this.$httpMessageState(res, '加入購物車')
      })
    }
  },
  created () {
    this.id = this.$route.params.productId;
    this.getUserProduct();
  }
};
</script>
