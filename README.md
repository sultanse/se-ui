# se-ui

React component library built with TypeScript and Tailwind CSS.

## Installation

```bash
bun add se-ui
```

## Usage

```tsx
import { Button } from "se-ui/button"
import "se-ui/index.css"

export function App() {
  return <Button>Save</Button>
}
```

Every UI component is imported through its own package entry, for example `se-ui/dialog` or `se-ui/accordion`.
