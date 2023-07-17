<div class="display-container">
{#each productList as product, i}
  <div class="item-info">
    <div class="image">
      <img src={product.url} alt={product.name} />
    </div>
    <div class="description">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>R$ {product.price.toFixed(2)}</p>
    </div>
    <div class="amount">
      {cart[i].amount}
      <div class="quant-btns">
        <img src={botaoAdd} alt="add button" on:click={() => dispatch("add", product.id)}>
        <img src={botaoSub} alt="sub button" on:click={() => dispatch("sub", product.id)}>
      </div>
    </div>
    {(cart[i].amount * product.price).toFixed(2)}
    <div class="del-btn">
      <img src={botaoDel} alt='delete button' on:click={() => dispatch("delete", product.id)}>
    </div>
  </div>
{/each}
</div>

<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { ItemType, CartItemType } from "../types/types";
  import botaoAdd from '../assets/angle-up-solid.svg'
  import botaoSub from '../assets/angle-down-solid.svg'
  import botaoDel from '../assets/trash-solid.svg'

  export let productList: ItemType[];
  export let cart: CartItemType[];

  // const botaoAdd = '../assets/angle-up-solid.svg'
  // const botaoSub = '../assets/angle-down-solid.svg'
  // const botaoDel = '../assets/trash-solid.svg'

  const dispatch = createEventDispatcher<{
    addProduct: number;
    subProduct: number;
    removeItem: number;
  }>();
</script>

<style>
  .display-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 70%;
  }

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