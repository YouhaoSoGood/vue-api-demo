<template>
    <!-- <Loading :active="isLoading"></Loading> -->
    <table class="table mt-4">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th>購買款項</th>
          <th>應付金額</th>
          <th>是否付款</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in orders" :key="item.id">
          <td>{{ item.paid_date }}</td>
          <td>{{ item.id}}</td>
          <td class="text-right">{{ $filters.currency(item.origin_price)}}</td>
          <td class="text-right">{{ $filters.currency(item.price) }}</td>
          <td>
            <span class="text-success" v-if="item.is_enabled">已付款</span>
            <span class="text-muted" v-else>未付款</span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">檢視</button>
              <button class="btn btn-outline-danger btn-sm" @click="openDelModal(item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <OrderModal></OrderModal>
    <DelModal></DelModal>
    <Paginations></Paginations> -->
</template>

<script>
// import OrderModal from '../components/OrderModal.vue'
// import DelModal from '../components/DelModal';
// import Paginations from '../components/Paginations'

export default {
  data () {
    return {
      orders: {}
    }
  },
  components: {
    // OrderModal,
    // DelModal,
    // Paginations
  },  
  methods: {
    getOrder (page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders/?page=${page}`;
      // this.isLoading = true;
      this.$http.get(api).then((res) => {
        console.log(res.data.orders);
        this.order = res.data.orders;
      });
    }
  },
  created () {
    this.getOrder();
  }
}
</script>
