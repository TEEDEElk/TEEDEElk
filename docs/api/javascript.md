# JavaScript / TypeScript API

Below is a template for documenting exported functions, classes, and types.

## Example module: `src/math/add.ts`
```ts
/**
 * Adds two numbers and returns the sum.
 * @example
 * add(2, 3) // 5
 */
export function add(a: number, b: number): number {
  return a + b;
}
```

### Documentation entry
- **Function**: `add(a: number, b: number): number`
- **Description**: Adds two numbers and returns the sum.
- **Parameters**:
  - `a`: number — First addend
  - `b`: number — Second addend
- **Returns**: number — Sum of `a` and `b`
- **Examples**:
  ```ts
  import { add } from "./math/add";
  console.log(add(2, 3)); // 5
  ```

## Auto-generation with TypeDoc
To auto-generate documentation for all exported symbols:

```bash
npm i -D typedoc typedoc-plugin-markdown
npx typedoc --plugin typedoc-plugin-markdown --out docs/api/ts --excludePrivate --excludeInternal src
```

Then add the generated Markdown files under `docs/api/ts` and link them via `mkdocs.yml`.