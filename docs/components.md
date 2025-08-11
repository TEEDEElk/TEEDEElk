# Components

Document services, modules, and UI components here. For each component include:
- Name
- Purpose
- Public props/inputs
- Events/outputs
- Dependencies
- Examples

## Example (UI Component)
**Component**: `Button`
- **Props**:
  - `label: string` — Button text
  - `onClick: () => void` — Click handler
- **Example** (React):
  ```tsx
  import { Button } from "./components/Button";

  export default function Example() {
    return <Button label="Save" onClick={() => alert("Saved")} />;
  }
  ```

## Example (Service Component)
**Service**: `EmailSender`
- **Methods**: `send(to, subject, body)`
- **Example**:
  ```ts
  const sender = new EmailSender({ provider: "ses" });
  await sender.send("a@b.com", "Hello", "World");
  ```