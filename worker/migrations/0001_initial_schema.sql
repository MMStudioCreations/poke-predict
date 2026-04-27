CREATE TABLE IF NOT EXISTS cards (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  external_id TEXT,
  name TEXT NOT NULL,
  set_name TEXT NOT NULL,
  rarity TEXT NOT NULL,
  release_date TEXT,
  current_price REAL NOT NULL DEFAULT 0,
  trend_7d REAL NOT NULL DEFAULT 0,
  trend_30d REAL NOT NULL DEFAULT 0,
  catalyst_notes TEXT,
  grading_potential TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS price_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  card_id INTEGER NOT NULL,
  source TEXT NOT NULL,
  price REAL NOT NULL,
  observed_at TEXT NOT NULL,
  FOREIGN KEY (card_id) REFERENCES cards(id)
);

CREATE TABLE IF NOT EXISTS releases (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  set_name TEXT NOT NULL,
  release_date TEXT NOT NULL,
  notes TEXT
);

CREATE TABLE IF NOT EXISTS grading_pop (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  card_id INTEGER NOT NULL,
  grading_company TEXT NOT NULL,
  grade TEXT NOT NULL,
  population INTEGER NOT NULL,
  as_of_date TEXT NOT NULL,
  FOREIGN KEY (card_id) REFERENCES cards(id)
);

CREATE TABLE IF NOT EXISTS predictions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  card_id INTEGER NOT NULL,
  horizon TEXT NOT NULL,
  upside_score REAL NOT NULL,
  confidence_bucket TEXT NOT NULL,
  momentum_score REAL NOT NULL,
  catalyst_score REAL NOT NULL,
  grading_score REAL NOT NULL,
  volume_score REAL NOT NULL,
  sentiment_score REAL NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (card_id) REFERENCES cards(id)
);

CREATE TABLE IF NOT EXISTS alerts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  card_id INTEGER,
  type TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (card_id) REFERENCES cards(id)
);

CREATE INDEX IF NOT EXISTS idx_price_history_card_time ON price_history (card_id, observed_at DESC);
CREATE INDEX IF NOT EXISTS idx_predictions_card_horizon ON predictions (card_id, horizon, created_at DESC);
