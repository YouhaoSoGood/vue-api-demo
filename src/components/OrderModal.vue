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
              <span>訂單展示</span>
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
              <div class="col-sm-8">
                <div class="mb-3">
                  <label for="title" class="form-label">產品名稱</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="tempOrders.title"
                    placeholder="請輸入標題"
                  />
                </div>
                <div class="row gx-2">
                  <div class="mb-3 col-md-6">
                    <label for="category" class="form-label">分類</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      v-model="tempOrders.category"
                      placeholder="請輸入分類"
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">單位</label>
                    <input
                      type="text"
                      class="form-control"
                      id="unit"
                      v-model="tempOrders.unit"
                      placeholder="請輸入單位"
                    />
                  </div>
                </div>
                <div class="row gx-2">
                  <div class="mb-3 col-md-6">
                    <label for="origin_price" class="form-label">原價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="origin_price"
                      v-model.number="tempOrders.origin_price"
                      placeholder="請輸入原價"
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">售價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      v-model.number="tempOrders.price"
                      placeholder="請輸入售價"
                    />
                  </div>
                </div>
                <hr />
                <div class="mb-3">
                  <label for="description" class="form-label">產品描述</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    v-model="tempOrders.description"
                    placeholder="請輸入產品描述"
                  ></textarea>
                </div>
                <div class="mb-3">
                  <label for="content" class="form-label">說明內容</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    v-model="tempOrders.content"
                    placeholder="請輸入產品說明內容"
                  ></textarea>
                </div>
                <div class="mb-3">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="tempOrders.is_enabled"
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
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
              取消
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="$emit('update-order', tempOrders)"
            >
            <!-- 利用emit來觸發外層事件 會將tempProduct的資料傳入到Products.vue的updateProduct(item)內 -->
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import modalMixin from '../mixins/modalMixin.js'
export default {
  props: {
    order: {}
  },
  data () {
    return {
      tempOrders: {}
    }
  },
  emits: ['update-order'],
  watch: {
    order () {
      this.tempCoupons = this.order;
    }
  },
  mixins: [modalMixin]
}
</script>
