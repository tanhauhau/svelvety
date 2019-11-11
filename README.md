# svelvety

Reactivity on Svelte rely on the assignment statement, `=`.

This works fine for when we are dealing with primitives, eg: `number`, `string`, `boolean`, however it's awkward to use them with objects or arrays. The official fix is to add an assignment to fix the reactivity:

```js
function addNumber() {
  numbers.push(numbers.length + 1);
  // to fix the reactivity
  numbers = numbers;
}
```

Well, a much better workaround is to use [Svelte Stores](https://svelte.dev/tutorial/writable-stores), which you can use the store across multiple components, except you have to adopt the `.set` or `.update` function instead.

So, there's gotta be a better solution for this.

That solution turns out to be using [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) + Svelte store.

That's what `svelvety` is.

```html
<script>
  import svelvety from 'svelvety';
  const numberStore = svelvety([]);
  const numbers = numberStore.get();

  /* we use proxy, so whatever you are doing with the numbers
     will be updated to the store.
   */
  function addNumber() {
    numbers.push(numbers.length + 1);
  }
</script>

<!-- use `$` for the numberStore  -->
{#each $numberStore as number}
  <div>{number}</div>
{/each}

<button on:click={addNumber}>Add a number</button>
```

## LICENSE

MIT