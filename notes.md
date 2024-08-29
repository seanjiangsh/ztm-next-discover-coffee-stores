# Notes about Next.js and relative topics

## Different Rendering Techniques

### CSR (Client-Side Rendering)

**Key Concepts:**

1. JavaScript renders the page on the client-side.
2. The server sends a minimal HTML shell, and the client fetches and renders data.

**Pros:**

- Fast subsequent navigation as only data is fetched.
- Smooth user experience with dynamic updates.

**Cons:**

- Slower initial load due to JavaScript execution.
- Not ideal for SEO unless using techniques like prerendering.

**Use Cases:**

- Single Page Applications (SPAs)
- Web apps requiring frequent interaction
- Complex user interfaces

---

### SSG (Static Site Generation)

**Key Concepts:**

1. Pages are pre-rendered at build time.
2. Content is static, typically served via a CDN.

**Pros:**

- Fast loading times due to pre-rendering.
- Good for SEO because pages are generated with full HTML.
- Low server cost as pages are served statically.

**Cons:**

- Requires a rebuild for every content update.
- Not suitable for dynamic content that changes frequently.

**Use Cases:**

- Blogs
- Documentation sites
- Marketing websites

---

### ISR (Incremental Static Regeneration)

**Key Concepts:**

1. Combines static site generation with dynamic updates.
2. Pages are pre-rendered at build time and updated incrementally.

**Pros:**

- Fast initial load with static pages.
- Can update content without a full site rebuild.
- Balances performance and content freshness.

**Cons:**

- Requires careful cache management.
- Complexity in ensuring data consistency.

**Use Cases:**

- E-commerce sites
- News websites
- Content-heavy platforms

---

### SSR (Server-Side Rendering)

**Key Concepts:**

1. Pages are generated on the server for each request.
2. HTML is delivered to the client with each page load.

**Pros:**

- Dynamic content is up-to-date on every request.
- Good for SEO as content is rendered server-side.
- Better performance on slower devices since rendering is offloaded to the server.

**Cons:**

- Slower initial load due to server processing.
- Higher server costs due to rendering on every request.

**Use Cases:**

- E-commerce with dynamic pricing
- User dashboards
- Social media platforms

## Caching

- **Request Memorization:**

  Stores function return values for reusability in the React component tree.

- **Data Cache:**

  Consistently stores fetched data results across user requests and deployments.

- **Full Route Cache:**

  Stores the output of a route's rendering, including HTML and React Server Component payload.

- **Router Cache:**

  Reduces server requests on navigation by storing React Server Component Payload in memory across user sessions.
