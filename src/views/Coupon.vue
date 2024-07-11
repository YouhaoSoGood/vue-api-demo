<template>
  <Loading :active="isLoading"></Loading>
  <div class="text-end">
    <button class="btn btn-secondary" type="button" @click.prevent="openCoupons(true)">
      新增優惠券
    </button>
  </div>
  <table class="table mt-4">
    <thead>
      <tr>
        <th width="120">名稱</th>
        <th width="120">折扣百分比</th>
        <th width="120">到期日</th>
        <th width="100">是否啟用</th>
        <th width="200">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in coupons" :key="item.id">
        <td>{{ item.title }}</td>
        <td>{{ item.percent + '%'}}</td>
        <td class="text-right">{{ $filters.filterdate(item.due_date) }}</td>
        <!-- <td class="text-right">{{ item.price }}</td> -->
        <td>
          <span class="text-success" v-if="item.is_enabled === 1">啟用</span>
          <span class="text-muted" v-else>未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button
              class="btn btn-outline-primary btn-sm"
              @click="openCoupons(false, item)"
            >
              編輯
            </button>
            <!-- <button class="btn btn-outline-danger btn-sm" @click="DelModal(item)">刪除</button> -->
            <button
              class="btn btn-outline-danger btn-sm"
              @click="openDelCoupons(item)"
            >
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
    <CouponModal ref="CouponModal" :coupon="tempCoupon" @update-coupon="updateCoupons"></CouponModal>
    <DelModal :item="tempCoupon" ref="delModal" @del-product="DelCoupons"></DelModal>
    <Paginations :pages="pagination" @emit-pages="getCoupons"></Paginations>
</template>

<script>
import CouponModal from '../components/CouponModal'
import DelModal from '../components/DelModal';
import Paginations from '../components/Paginations'

// Coupon.vue是用來展示前端優惠券的畫面
export default {
  data () {
    return {
      coupons: {},
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        code: ''
      },
      isNew: false,
      isLoading: false,
      pagination: {}
    }
  },
  components: {
    CouponModal,
    DelModal,
    Paginations
  },
  props: {
    config: Object
  },  
  methods: {
    getCoupons (page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`
      this.isLoading = true;
      this.$http.get(api, this.tempProduct).then((res) => {
        console.log(res.data);
        this.isLoading = false;
        this.coupons = res.data.coupons;
        this.pagination = res.data.pagination;
      });
    },
    updateCoupons (item) {
      if (this.isNew) {
        const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`;
        this.$http.post(url, { data: item }).then((response) => {
          // console.log(response, item);
          this.$refs.CouponModal.hideModal();
          this.$httpMessageState(response, '更新優惠券')
        });
      } else {
        const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`;
        this.$http.put(url, { data: this.tempCoupon }).then((response) => {
          // console.log(response);
          this.$refs.CouponModal.hideModal();
          this.$httpMessageState(response, '更新優惠券')
        });
      }
    },
    openCoupons (isNew, item) {
      this.isNew = isNew;
      if (this.isNew) {
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000,
          is_enabled: 0
        }
      } else {
        this.tempCoupon = { ...item }
      }
      this.$refs.CouponModal.showModal();
    },
    openDelCoupons (item) {
      this.tempCoupon = { ...item };
      const delModal = this.$refs.delModal;
      delModal.showModal();
    },
    DelCoupons () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`;
      this.$http.delete(api).then((response) => {
        if (response.data.success) {
          this.$httpMessageState(response, '刪除優惠券')
        }
        const delModal = this.$refs.delModal;
        delModal.hideModal();
        this.getCoupons();
      })
    }
  },
  created () {
    this.getCoupons();
  },
  inject: ['emitter']
}
</script>
