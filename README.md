# \<stacked-sheet>

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation
```bash
npm i stacked-sheet
```

## Usage
```html
<script type="module">
  import 'stacked-sheet/stacked-sheet.js';
  import 'stacked-sheet/stacked-sheets-holder.js';
</script>

<stacked-sheets-holder>
  <stacked-sheet
    title='Search for user'>
    <input type="text" name="search"/>
    <button>Search</button>
  </stacked-sheet>

  <stacked-sheet
    title='Add user'>
    <input type="text" name="fullname"/>
    <button>Add</button>
  </stacked-sheet>

</stacked-sheets-holder>

```

## Linting
```bash
npm run lint
```

## Formating
```bash
npm run format
```

## Testing using karma
```bash
npm run test
```

## Demoing
```bash
npm run demo
```

## Building
```bash
npm run build
```