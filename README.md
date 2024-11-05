# KPN Assessment BE

An Express.js API with a PostgreSQL database for KPN Assessment, structured using a Model-Controller pattern for clean and organized code. The API supports basic CRUD operations, with methods defined as single, modular functions rather than complex or extendable patterns, making it lightweight and easy to maintain.

## Features

- Modular Model-Controller Structure: Separates data logic and request handling for readability and simplicity.
- CRUD Operations: Basic create, read, update, and delete functionality.
- ES6 Syntax: Uses modern JavaScript for cleaner, more efficient code.
- TypeScript: Strongly typed syntax to maintain functional consistency and readability.
- Naming Conventions: Consistent method prefixes (e.g., create, get, update, delete) for easy navigation and understanding.
- Commit Messages: Structured commit message format for consistency and readability.

## Naming Conventions

This project follows a set of naming conventions to maintain consistency across models, controllers, functions, and variables. Below are the guidelines for naming methods, variables, and other elements in this codebase.

### 1. General Guidelines

- **Use camelCase** for function and variable names.
- **Use PascalCase** for class and component names.
- **Use uppercase with underscores (e.g., `MAX_LIMIT`)** for constants.

### 2. CRUD Operations

CRUD operations should follow these standard prefixes for readability and consistency with common API conventions:

- **Create**: `create<Resource>`  
  Example: `createBusinessUnit`
- **Read** (Single): `get<Resource>ById`  
  Example: `getBusinessUnitById`
- **Read** (Multiple): `get<Resource>`
  Example: `getBusinessUnit`
- **Update**: `update<Resource>`  
  Example: `updateBusinessUnit`
- **Delete**: `delete<Resource>`  
  Example: `deleteBusinessUnit`

### Summary of Common Prefixes

| Prefix   | Use Case                     | Example              |
| -------- | ---------------------------- | -------------------- |
| `create` | Creating new resources       | `createBusinessUnit` |
| `get`    | Retrieving data              | `getBusinessUnit`    |
| `update` | Modifying an existing record | `updateBusinessUnit` |
| `delete` | Removing a record            | `deleteBusinessUnit` |

---

By following these conventions, we can ensure consistency and readability across our codebase. For any exceptions or special cases, please document them in this section as well.

## Commit Message Guidelines

Use the following guidelines when writing commit messages. A consistent commit format improves the readability of the commit history and helps team members understand the purpose of each change.

### 1. Structure

Each commit message should start with a **prefix** that indicates the type of change, followed by a brief description in present-tense, imperative form. Avoid capitalizing the first letter of the description, and keep the message concise (ideally within 50 characters).

**Format**:
`<prefix>: <short description>`

**Example**:
`fix: resolve login error when password is incorrect`

### 2. Prefixes

Use the following prefixes to categorize your commits:

- **feat**: For new features or major functionality additions.
  - Example: `feat: add user authentication module`
- **fix**: For bug fixes and error resolutions.
  - Example: `fix: correct pagination issue on orders page`
- **update**: For changes or improvements that don’t add new features (e.g., refactoring, dependency updates).
  - Example: `update: refactor user validation function`
- **perf**: For performance optimizations or improvements.
  - Example: `perf: optimize database query in order retrieval`

## Additional

Add more convention as needed and update this guideline based on the it so other developer could follow along.
