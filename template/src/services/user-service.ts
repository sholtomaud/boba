export interface User {
  name: string;
  role: string;
}

/**
 * Loads the users from the app's API — here a static JSON file in `public/`,
 * so the example needs no backend. The URL is relative to the app's base URL.
 *
 * Services hold logic that needs no DOM, which keeps them unit-testable with
 * `node --test`: pass a stand-in for `fetch` as `fetchImpl`.
 */
export async function fetchUsers(
  fetchImpl: typeof fetch = fetch
): Promise<User[]> {
  const response = await fetchImpl('data/users.json');
  if (!response.ok) {
    throw new Error(`Could not load users (HTTP ${response.status})`);
  }
  return response.json();
}

/** Why a new user can't be added, or `''` if they can. */
export function validateUser(user: User, existing: User[]): string {
  const taken = existing.some(
    (other) => other.name.toLowerCase() === user.name.toLowerCase()
  );
  return taken ? `${user.name} is already in the list.` : '';
}
