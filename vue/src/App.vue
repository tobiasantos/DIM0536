<template>
  <div class="cart">
    <div class="header">
      <h1>Carrinho de compras</h1>
      <h3 v-if="totalAmount > 1">Você tem {{ totalAmount }} itens</h3>
      <h3 v-else>Você tem {{ totalAmount }} item</h3>
    </div>

    <section>
      <div class="menu-container">
        <EmptyListPrev v-if="productsList.length === 0" />
        <ItemMenu
          v-else
          :products="productsList"
          :cart="cart"
          @delete="removeItem"
          @handleAmount="handleAmount"
        />
      </div>
      <Resumo
        :totalAmount="totalAmount"
        :totalPrice="totalPrice"
        :frete="frete"
        :cep="cep"
        :cartPrice="cartPrice"
        :isReady="isReady"
        @getFrete="getFrete"
        @handleCart="handleCart"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch, computed, ref } from "vue";
import { products } from "./data/products";
import ItemMenu from "./components/ItemMenu.vue";
import EmptyListPrev from "./components/EmptyListPrev.vue";
import Resumo from "./components/Resumo.vue";

let cart = reactive(
  products.map((product) => {
    return {
      id: product.id,
      amount: 0,
    };
  })
);

let productsList = reactive(products);

function removeItem(id: number) {
  productsList = productsList.filter((product) => product.id !== id);
  const index = cart.findIndex((product) => product.id === id);
  cart[index].id = -1;
  // cart = cart.filter((product) => product.id === id);
}

function handleAmount(id: number, reference: "add" | "sub") {
  const index = cart.findIndex((product) => product.id === id);
  if (index === -1) return;
  if (reference === "sub") {
    if (cart[index].amount === 0) return;
    cart[index].amount--;
  } else {
    cart[index].amount++;
  }
}

const cep = reactive({ value: "" });

const frete = reactive({ address: "", value: 0 });

const totalPrice = computed(() => {
  let total = 0;
  cart.forEach((product) => {
    if (product.id > 0) {
      const item = products.find((item) => item.id === product.id);
      if (item) total += item.price * product.amount;
    }
  });
  return total.toFixed(2);
});

const getFrete = async (cep: { value: string }) => {
  if (cep.value.length === 9) {
    await fetch(`https://viacep.com.br/ws/${cep.value}/json`)
      .then((res) => res.json())
      .then((data) => {
        if (data.logradouro) {
          frete.address =
            data.logradouro + " - " + data.bairro + "/" + data.localidade;
          frete.value = (Number(data.ddd) * Number(data.siafi)) / 10000;
        } else {
          frete.address = "CEP não encontrado";
          frete.value = 0;
        }
      });
  } else {
    frete.address = "CEP inválido";
    frete.value = 0;
  }
};

const cartPrice = computed(() => {
  return (Number(totalPrice.value) + Number(frete.value)).toFixed(2);
});

const isReady = ref(false);

const totalAmount = ref(0);

watch([frete, totalAmount], () => {
  if (frete.value > 0 && totalAmount.value > 0) {
    isReady.value = true;
  } else {
    isReady.value = false;
  }
});

watch(cart, () => {
  totalAmount.value = 0;
  cart.forEach((product) => {
    if (product.id > 0) totalAmount.value += product.amount;
  });
});

const handleCart = () => {
  const aux = cart.map((x) => {
    if (x.id > 0) {
      return {
        id: x.id,
        quantidade: x.amount,
      };
    }
  });

  console.log({
    carrinho: aux.filter((x) => x !== undefined),
    cep: cep.value,
    preco: cartPrice.value,
  });
};
</script>

<style scoped>
section {
  display: flex;
  justify-content: space-between;
}
.menu-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 70%;
}
</style>
