<template>
  <div class="item-info" v-for="product of products">
    <div class="image">
      <img :src="product.url" :alt="product.name" />
    </div>
    <div class="description">
      <h3>{{ product.name }}</h3>
      <p>{{ product.description }}</p>
      <p>R$ {{ Number(product.price).toFixed(2) }}</p>
    </div>
    <div class="amount">
      {{ cart[product.id - 1].amount }}
      <div class="quant-btns">
        <img
          @click="$emit('handleAmount', product.id, 'add')"
          src="../assets/angle-up-solid.svg"
        />
        <img
          @click="$emit('handleAmount', product.id, 'sub')"
          src="../assets/angle-down-solid.svg"
        />
      </div>
    </div>
    {{ Number(cart[product.id - 1].amount * product.price).toFixed(2) }}
    <div class="del-btn">
      <img
        @click="$emit('delete', product.id)"
        src="../assets/trash-solid.svg"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps(["products", "cart"]);

defineEmits(["delete", "handleAmount"]);
</script>

<style>
.item-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  background: #f2f2f2;
}

.item-info .image {
  width: 100px;
  height: 100px;
}

.item-info .image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.amount {
  display: flex;
  align-items: baseline;
}

.amount .quant-btns {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 0 1rem;
}

.amount .quant-btns img {
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.del-btn {
  width: 40px;
  height: 40px;
  cursor: pointer;
}
</style>
