<template>
  <div class="text-end">
    <button class="btn btn-secondary" type="button" @click.prevent="openModal(true)">增加一個產品</button>
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
            <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">編輯</button>
            <button class="btn btn-outline-danger btn-sm">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- tempProduct會透過props傳送進ProductModal.vue的product -->
  <!-- 前內後外 會從ProductModal.vue中觸發emit後傳回updateProduct -->
  <ProductModal ref="productModal" :product="tempProduct" @update-product="updateProduct"></ProductModal>
</template>

<script>
import ProductModal from '../components/ProductModel';
export default {
  data () {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false
    };
  },
  // 區域註冊將ProductModal.vue加入到這個元件 並且呈現到上方template內
  components: {
    ProductModal
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
    openModal (isNew, item) {
      if (isNew) {
        this.tempProduct = {}
      } else {
        this.tempProduct = { ...item }
      }
      this.isNew = isNew;
      const productComponent = this.$refs.productModal;
      productComponent.showModal();
    },
    updateProduct (item) {
      this.tempProduct = item;
      // 新增
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
      let httpMethod = 'post';

      // 編輯
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
        httpMethod = 'put';
      }
      const productComponent = this.$refs.productModal;
      // 利用變數可以讓api靈活變換put或是post get等方法
      this.$http[httpMethod](api, { data: this.tempProduct }).then((response) => {
        console.log(response.data);
        productComponent.hideModal();
        this.getProducts();
      });
    }
  },
  created () {
    this.getProducts()
  }
};
</script>
