<template>
  <Loading :active="isLoading"></Loading>
  <div class="container-fluid">
    <div class="row">
      <div class="col-6">
        <div class="p-3 border bg-light">
          <table class="table mt-4">
            <thead>
              <tr>
                <th width="50">圖片</th>
                <th width="80">產品名稱</th>
                <th width="300">價格</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in tempProducts" :key="item.id">
                <td><img :src="item.imageUrl" alt="item.id" style="width: 200px; height: 200px;"></td>
                <td style="font-weight: bold; text-decoration: underline;">{{ item.title }}</td>
                <td>
                  <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
                  <del class="h6" v-if="item.price">原價 {{ item.origin_price }} 元</del>
                  <div class="h5" v-if="item.price">現在只要 {{ item.price }} 元</div>
                </td>
                <td>
                  <div class="btn-group">
                    <button class="btn btn-outline-primary btn-sm" @click="getUserID(item.id)">查看更多</button>
                    <button class="btn btn-outline-danger btn-sm" :disabled="this.status.loadingItem === item.id" @click="addCart(item.id)">
                      <div class="spinner-border spinner-grow-sm" role="status" v-if="this.status.loadingItem === item.id">
                        <span class="visually-hidden"></span>
                      </div>
                      加入購物車
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- 購物車列表 -->
      <div class="col-6" >
        <div class="p-3 border bg-light">
          <table class="table mt-4" >
            <thead>
              <tr>
                <th width="50">刪除</th>
                <th width="100">品名</th>
                <th width="50">數量</th>
                <th width="100">單價</th>
              </tr>
            </thead>
            <tbody v-if="tempCart.carts">
              <tr v-for="item in tempCart.carts" :key="item.id">
                <td>
                    <button type="button" class="btn-close" aria-label="Close" @click.prevent="DelCart(item.id)"></button>
                </td>
                <td>
                  {{ item.product.title }}
                  <div class="text-success" v-if="tempCart.final_total !== tempCart.total">
                    已套用優惠券
                  </div>
                </td>
                <td>
                  <div class="input-group input-group-sm">
                    <input type="number" class="form-control" v-model.number="item.qty" min="1" @change="updateCart(item)" :disabled="item.id === this.status.loadingItem">
                    <div class="input-group-text">/ {{ item.product.unit }}</div>
                  </div>
                </td>
                <td>
                  <small v-if="tempCart.final_total !== tempCart.total" class="text-success">折扣價：</small>
                  {{ $filters.currency(item.final_total) }}
                </td>
              </tr>
            </tbody>
            <tfoot>
            <tr>
              <td colspan="3" class="text-end">總計</td>
              <td class="text-end">{{ $filters.currency(tempCart.total) }}</td>
            </tr>
            <tr v-if="tempCart.final_total !== tempCart.total">
              <td colspan="3" class="text-end text-success">折扣價</td>
              <td class="text-end text-success">{{ $filters.currency(tempCart.final_total) }}</td>
            </tr>
            </tfoot>
          </table>
          <div class="input-group mb-3 mt-3">
            <input type="text" class="form-control rounded" placeholder="請輸入優惠碼" v-model="coupon_code">
            <button class="btn btn-info ms-1" id="inputGroup-sizing-default" @click.prevent="addCouponCode">套用優惠券</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container mt-5">
    <VForm @submit="createOrder" v-slot="{ errors }">
      {{ errors }}
      <div class="form-group">
        <label for="exampleInputEmail1">Email</label>
        <VField
         type="email" name="Email" class="form-control" rules="email|required" :class="{ 'is-invalid': errors['Email']}" id="exampleInputEmail1" placeholder="請輸入 Email" aria-describedby="emailHelp" v-model="form.user.email">
        </VField>
        <ErrorMessage name="Email" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="form-group">
        <label for="Name">收件人姓名</label>
        <VField 
          type="text" name="姓名" class="form-control" rules="required" :class="{ 'is-invalid': errors['姓名']}" id="Name" placeholder="請輸入 姓名" v-model="form.user.name">
        </VField>
        <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="form-group">
        <label for="telphone">收件人電話</label>
        <VField
         type="text" name="電話" class="form-control" rules="required" :class="{ 'is-invalid': errors['電話']}" id="telphone" placeholder="請輸入 電話" v-model="form.user.tel">
        </VField>
        <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="form-group">
        <label for="address">收件人地址</label>
        <VField 
          type="text" name="地址" class="form-control" rules="required" :class="{ 'is-invalid': errors['地址']}" id="address" placeholder="請輸入 地址" v-model="form.user.address">
        </VField>
        <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="form-group">
        <label for="message">留言</label>
          <textarea class="form-control" id="message" rows="3" v-model="form.message"></textarea>
      </div>
      <div class="d-flex justify-content-end mt-3">
          <button type="submit" class="btn btn-danger">確認送出</button>
      </div>
    </VForm>
  </div>
</template>

<script>
export default {
  data () {
    return {
      UserCart: {},
      tempProducts: {},
      status: {
        loadingItem: '' // 對應品項ID 用來判斷產品在加入API時是否一致 若不一致則跑等待的icon圖示
      },
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      tempCart: {},
      isLoading: false,
      coupon_code: ''
    }
  },
  methods: {
    getUserData () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.isLoading = true;
      this.$http.get(api).then((res) => {
        this.isLoading = false
        // console.log(res.data);
        this.tempProducts = res.data.products;
      })
    },
    getUserID (userID) {
      this.$router.push(`/user/userProduct/${userID}`)
    },
    addCart (id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.status.loadingItem = id;
      const cartItem = {
        product_id: id,
        qty: 1
      };
      this.$http.post(api, { data: cartItem }).then((res) => {
        console.log(res);
        this.status.loadingItem = '';
        this.$httpMessageState(res, '加入購物車');
        this.updateCart(cartItem);
      })
    },
    getCart () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.isLoading = true;
      this.$http.get(api).then((res) => {
        // console.log(res);
        this.isLoading = false;
        this.tempCart = res.data.data;
      });
    },
    DelCart (id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.isLoading = true;
      this.$http.delete(api).then((res) => {
        this.isLoading = false;
        if (res.data.success) {
          this.$httpMessageState(res, '刪除產品')
          this.getCart();
        }
      })
    },
    updateCart (item) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      const cartItem = {
        product_id: item.product_id,
        qty: item.qty
      };
      this.status.loadingItem = item.id;
      this.$http.put(api, { data: cartItem }).then((res) => {
        this.status.loadingItem = '';
        this.getCart();
      })
    },
    addCouponCode () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`;
      const couponCode = {
        code: this.coupon_code
      }
      this.$http.post(api, { data: couponCode }).then((res) => {
        this.$httpMessageState(res, '加入優惠券')
        console.log(res);
        this.getCart();
      })
    },
    createOrder () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`;
      const order = this.form;
      this.$http.post(api, { data: order }).then((res) => {
        console.log(res);
      })
    }
  },
  created () {
    this.getUserData();
    this.getCart();
  }
}
</script>
