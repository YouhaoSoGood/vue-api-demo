<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>新增優惠券</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
              <div class="mb-3">
                <label for="title" class="form-label">名稱</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  v-model="tempCoupons.title"
                  placeholder="請輸入名稱"
                />
              </div>
              <div class="mb-3">
                <label for="coupon_code">優惠碼</label>
                <input
                  type="text"
                  class="form-control"
                  id="coupon_code"
                  v-model="tempCoupons.code"
                  placeholder="請輸入優惠碼"
                />
              </div>
              <div class="mb-3">
                  <label for="duedate" class="form-label">到期日</label>
                  <input
                    type="date"
                    class="form-control"
                    id="duedate"
                    v-model="late_due_date"
                  />
              </div>
              <div class="mb-3">
                  <label for="price" class="form-label">折扣百分比</label>
                  <input
                    type="number"
                    class="form-control"
                    id="price"
                    v-model="tempCoupons.percent"
                    placeholder="請輸入折扣百分比"
                  />
              </div>       
              <div class="mb-3">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="tempCoupons.is_enabled"
                    :true-value="1"
                    :false-value="0"
                    id="is_enabled"
                  />
                  <label class="form-check-label" for="is_enabled">
                    是否啟用
                  </label>
                </div>
              </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-info"
            @click="$emit('update-coupon', tempCoupons)"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// CouponModal.vue是用來設計並展示新增優惠券及編輯的畫面
import modalMixin from '../mixins/modalMixin.js'
export default {
  props: {
    coupon: {}
  },
  data () {
    return {
      tempCoupons: {},
      late_due_date: ''
    }
  },
  emits: ['update-coupon'],
  watch: {
    coupon () {
      this.tempCoupons = this.coupon;
      // 將時間格式改為 YYYY-MM-DD
      const dateAndTime = new Date(this.tempCoupons.due_date * 1000).toISOString().split('T');
      this.late_due_date = dateAndTime;
    },
    // 監聽data內late_due_date屬性發生變化時觸發 名稱必須一樣不能亂取
    late_due_date () {
      this.tempCoupons.due_date = Math.floor(new Date(this.late_due_date) / 1000);
    }
  },
  // 可呼叫到mixins資料夾內的元件
  mixins: [modalMixin]
};
</script>
