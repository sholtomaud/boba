import { test, describe } from 'node:test';
import assert from 'node:assert';
import { fetchUsers, validateUser } from './user-service.ts';

const ada = { name: 'Ada', role: 'Engineer' };

describe('user-service', () => {
  test('fetchUsers returns the users from the API', async () => {
    const fetchStub = async (url: string) => {
      assert.strictEqual(url, 'data/users.json');
      return Response.json([ada]);
    };
    assert.deepStrictEqual(await fetchUsers(fetchStub as typeof fetch), [ada]);
  });

  test('fetchUsers rejects when the request fails', async () => {
    const fetchStub = async () => new Response('', { status: 500 });
    await assert.rejects(fetchUsers(fetchStub as typeof fetch), /HTTP 500/);
  });

  test('validateUser rejects duplicate names, ignoring case', () => {
    assert.strictEqual(validateUser({ name: 'Grace', role: 'x' }, [ada]), '');
    assert.match(validateUser({ name: 'ada', role: 'x' }, [ada]), /already/);
  });
});
