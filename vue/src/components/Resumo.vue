<template>
  <div class="resumo-container">
    <h1>Resumo</h1>
    <hr />
    <h2>Frete</h2>
    <div class="cep">
      <div class="cep-input">
        <span>CEP</span>
        <input
          type="text"
          placeholder="590000-000"
          v-model="cepInput.value"
          maxlength="9"
        />
        <button @click="$emit('getFrete', cepInput)">Ok</button>
      </div>
      <span>{{ frete.value.toFixed(2) }}</span>
    </div>
    <div class="address">{{ frete.address }}</div>
    <hr />
    <div class="itens-price">
      <span>Itens ({{ totalAmount }})</span>
      <span>{{ totalPrice }}</span>
    </div>
    <div class="frete-price">
      <span>Frete</span>
      <span>{{ frete.value.toFixed(2) }}</span>
    </div>
    <hr />
    <div class="total-price">
      <span>Total</span>
      <span>{{ cartPrice }}</span>
    </div>
    <button class="send-btn" :disabled="!isReady" @click="$emit('handleCart')">
      Fechar Pedido
    </button>
  </div>
</template>

<script lang="ts" setup>
import { watch, reactive } from "vue";
defineProps(["totalPrice", "totalAmount", "frete", "cartPrice", "isReady"]);
defineEmits(["getFrete", "handleCart"]);

const cepInput = reactive({ value: "" });

watch(cepInput, () => {
  let value = cepInput.value;
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d{5})(\d)/, "$1-$2");
  cepInput.value = value;
});
</script>

<style>
hr {
  width: 100%;
  border-color: #f2f2f2;
  margin: 12px 0;
}
.resumo-container {
  display: flex;
  flex-direction: column;
  margin: 48px auto;
  background: purple;
  border-radius: 10px;
  color: white;
  width: 25%;
  height: 460px;
  padding: 10px;
}
.cep {
  display: flex;
  justify-content: space-between;
}
.cep .cep-input {
  display: flex;
  justify-content: space-evenly;
  gap: 24px;
}

.cep .cep-input input {
  background: rgba(158, 158, 158, 0.4);
  border: none;
  border-radius: 10px;
  text-align: center;
  height: 30px;
  margin-right: 5px;
  color: aqua;
}

.cep .cep-input input::placeholder {
  color: aqua;
  opacity: 0.5;
}

.cep .cep-input input:focus {
  outline: none;
}

.cep .cep-input button {
  cursor: pointer;
  color: purple;
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 5px;
  background: aqua;
  font-weight: 600;
  transition: 0.3s ease-in-out;
}

.cep .cep-input button:hover {
  color: aqua;
  background: transparent;
}

.itens-price {
  display: flex;
  justify-content: space-between;
}

.frete-price {
  display: flex;
  justify-content: space-between;
}

.total-price {
  display: flex;
  justify-content: space-between;
}

button.send-btn {
  cursor: pointer;
  color: purple;
  border: none;
  border-radius: 5px;
  background: aqua;
  font-weight: 600;
  font-size: 40px;
  padding: 12px;
  transition: 0.3s ease-in-out;
  margin-top: 22px;
}

button.send-btn:hover {
  color: aqua;
  background: transparent;
}

button.send-btn:disabled {
  color: #ccc;
  background: transparent;
  cursor: not-allowed;
}
</style>
