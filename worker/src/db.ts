export async function queryAll<T>(db: D1Database, sql: string, bindings: unknown[] = []) {
  const result = await db.prepare(sql).bind(...bindings).all<T>();
  return result.results ?? [];
}

export async function queryFirst<T>(db: D1Database, sql: string, bindings: unknown[] = []) {
  const result = await db.prepare(sql).bind(...bindings).first<T>();
  return result ?? null;
}

export async function execute(db: D1Database, sql: string, bindings: unknown[] = []) {
  return db.prepare(sql).bind(...bindings).run();
}
