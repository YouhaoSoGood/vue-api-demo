<template>
  <Loading :active="isLoading"></Loading>
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
            <!-- <button class="btn btn-outline-danger btn-sm" @click="DelModal(item)">刪除</button> -->
            <button class="btn btn-outline-danger btn-sm" @click="openDelModal(item)">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- tempProduct會透過props傳送進ProductModal.vue的product -->
  <!-- 前內後外 會從ProductModal.vue中觸發emit後傳回updateProduct -->
  <ProductModal ref="productModal" :product="tempProduct" @update-product="updateProduct"></ProductModal>
  <DelModal ref="delModal" @del-product="delproduct"></DelModal>
</template>

<script>
import ProductModal from '../components/ProductModel';
import DelModal from '../components/DelModal';
export default {
  data () {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      isLoading: false 
    };
  },
  // 區域註冊將ProductModal.vue加入到這個元件 並且呈現到上方template內
  components: {
    ProductModal,
    DelModal
  },
  methods: {
    // 取得產品
    getProducts () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products`;
      // console.log(api);
      this.isLoading = true;
      this.$http.get(api).then((res) => {
        this.isLoading = false;
        if (res.data.success) {
          // console.log(res.data);
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
        // console.log(response);
        productComponent.hideModal();
        if (response.data.success) {
          this.getProducts();
          this.emitter.emit('push-message', {
            style: 'success',
            title: '更新成功'
          })
        } else {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '更新失敗',
            content: response.data.message.join('、')
          })
          console.log(response.data);
        }
      });
    },
    // 開啟刪除視窗
    openDelModal (item) {
      this.tempProduct = { ...item };
      const delModal = this.$refs.delModal;
      delModal.showModal();
    },
    delproduct () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`
      this.$http.delete(api).then((res) => {
        console.log('已成功刪除資料');
        if (res.data.success) {
          this.emitter.emit('push-message', {
            style: 'success',
            title: '成功刪除'
          })
        }
        const delModal = this.$refs.delModal;
        delModal.hideModal();
        this.getProducts();
      })
    }
  },
  created () {
    this.getProducts()
  },
  inject: ['emitter']
};
</script>
