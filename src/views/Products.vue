<template>
  <div class="text-end">
    <button class="btn btn-secondary" type="button" @click.prevent="openModal">增加一個產品</button>
  </div>
  <table class="table mt-4">
    <thead>
      <tr>
        <th width="120">分類</th>
        <th>產品名稱</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="100">是否啟用</th>
        <th width="200">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in products" :key="item.id">
        <td>{{ item.category }}</td>
        <td>{{ item.title}}</td>
        <td class="text-right">{{ item.origin_price}}</td>
        <td class="text-right">{{ item.price }}</td>
        <td>
          <span class="text-success" v-if="item.is_enabled">啟用</span>
          <span class="text-muted" v-else>未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm">編輯</button>
            <button class="btn btn-outline-danger btn-sm">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <ProductModal ref="productModal" :product="tempProduct"></ProductModal>
</template>

<script>
import ProductModal from '../components/ProductModel';
export default {
  data () {
    return {
      products: [],
      pagination: {},
      tempProduct: {}
    };
  },
  methods: {
    getProducts () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products`;
      console.log(api);
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          console.log(res.data);
          this.products = res.data.products;
          this.pagination = res.data.pagination;
        }
      });
    },
    openModal () {
      this.tempProduct = {};
      const productComponent = this.$refs.productModal;
      productComponent.showModal();
    }
  },
  // 區域註冊將ProductModal.vue加入到這個元件 並且呈現到上方template內
  components: {
    ProductModal
  },
  created () {
    this.getProducts()
  }
};
</script>
