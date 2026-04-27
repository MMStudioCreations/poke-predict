DELETE FROM alerts;
DELETE FROM predictions;
DELETE FROM grading_pop;
DELETE FROM releases;
DELETE FROM price_history;
DELETE FROM cards;

INSERT INTO cards (id, external_id, name, set_name, rarity, release_date, current_price, trend_7d, trend_30d, catalyst_notes, grading_potential)
VALUES
(1, 'sv08-238', 'Pikachu ex (Special Illustration Rare)', 'Surging Sparks', 'SIR', '2025-11-08', 122.40, 4.2, 11.3, 'Social momentum + event visibility.', 'High PSA 10 potential on centered copies.'),
(2, 'sv03-223', 'Charizard ex', 'Obsidian Flames', 'Ultra Rare', '2023-08-11', 61.85, -1.8, 6.1, 'Reprint pressure fading.', 'Moderate; watch edge whitening.'),
(3, 'sw11-186', 'Giratina V (Alt Art)', 'Lost Origin', 'Alt Art', '2022-09-09', 298.70, 3.1, 9.2, 'Blue-chip chase with strong liquidity.', 'Premium 10 upside if surface is clean.');

INSERT INTO releases (set_name, release_date, notes)
VALUES
('Surging Sparks', '2025-11-08', 'High demand modern set.'),
('Obsidian Flames', '2023-08-11', 'Charizard-heavy demand cycle.'),
('Lost Origin', '2022-09-09', 'Strong alt-art era set.');

INSERT INTO grading_pop (card_id, grading_company, grade, population, as_of_date)
VALUES
(1, 'PSA', '10', 1850, '2026-04-20'),
(2, 'PSA', '10', 3920, '2026-04-20'),
(3, 'PSA', '10', 1640, '2026-04-20');

INSERT INTO price_history (card_id, source, price, observed_at)
VALUES
(1, 'mock', 116.30, '2026-03-27T00:00:00Z'),
(1, 'mock', 122.40, '2026-04-27T00:00:00Z'),
(2, 'mock', 58.30, '2026-03-27T00:00:00Z'),
(2, 'mock', 61.85, '2026-04-27T00:00:00Z'),
(3, 'mock', 273.50, '2026-03-27T00:00:00Z'),
(3, 'mock', 298.70, '2026-04-27T00:00:00Z');

INSERT INTO predictions (card_id, horizon, upside_score, confidence_bucket, momentum_score, catalyst_score, grading_score, volume_score, sentiment_score)
VALUES
(1, '90d', 82.4, 'high', 78, 88, 81, 76, 83),
(2, '30d', 64.8, 'medium', 59, 66, 62, 71, 65),
(3, '180d', 79.2, 'high', 72, 75, 90, 77, 70);
