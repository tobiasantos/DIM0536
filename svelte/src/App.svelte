<main>
  <div class="cart">
    <div class="header">
      <h1>Carrinho de compras</h1>
      <h3>{totalAmount ? `Você tem ${totalAmount} ${itemHandler}` : "Você não possui itens no carrinho"}</h3>
    </div>
  </div>
  <section>
    {#if productList.length === 0}
    <h1>Não há itens no carrinho.</h1>
    {:else}
    <ItemDisplay {productList} {cart} on:delete={(e)=>removeItem(e.detail)} on:add={(e)=>addProduct(e.detail)} on:sub={(e)=>subProduct(e.detail)} />
    {/if}
    <Resumo {totalPrice} {totalAmount} {frete} {cartPrice} on:getCep={(e) => getCep(e.detail)} {isReady} on:submit={()=>handleSubmit()} />
  </section>
</main>

<script lang="ts">
  import { products } from "./data/products";
  import ItemDisplay from "./components/ItemDisplay.svelte";
  import Resumo from "./components/Resumo.svelte";
  
  let cart = (products.map(p => {return {id: p.id, amount: 0}}));

  let productList = (products);
  
  $: totalAmount = cart.reduce((acc, curr) => acc + curr.amount, 0);

  $: itemHandler = totalAmount === 1 ? 'item' : 'itens';

  function removeItem (id: number) {
    productList = productList.filter(p => p.id !== id);
    cart = cart.filter(p => p.id !== id);
  }

  function addProduct(id: number) {
    const index = cart.findIndex(p => p.id === id);
    if (index === -1) return;
    cart[index].amount++;
  }

  function subProduct(id: number) {
    const index = cart.findIndex(p => p.id === id);
    if (index === -1) return;
    if (cart[index].amount === 0) return;
    cart[index].amount--;
  }

  let frete = { address: "", value: 0 };

  $: totalPrice = cart.reduce((acc, curr) => {
    const product = products.find(p => p.id === curr.id);
    return acc + (product.price * curr.amount);
  }, 0);

  async function getCep(cep: string) {
    if (cep.length === 9) {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (data.logradouro) {
        frete.address = data.logradouro + " - " + data.bairro + "/" + data.localidade;
        frete.value = (Number(data.ddd) * Number(data.siafi)) / 10000;
      } else {
      frete.address = "CEP não encontrado";
      frete.value = 0;
      }
    } else {
      frete.address = "CEP inválido";
      frete.value = 0;
    }
  }

  $: cartPrice = Number(totalPrice + frete.value).toFixed(2);

  let isReady = false;

  $: {
    if (frete.value > 0 && totalAmount > 0) {
      isReady = true;
    } else {
      isReady = false;
    }
  }

  function handleSubmit() {
    alert('Pedido feito!');
    console.log({ carrinho: [...cart], total: cartPrice})
  }

</script>

<style>
  section {
    display: flex;
    justify-content: space-between;
  }
  </style>