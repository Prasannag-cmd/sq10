-- ============================================================
-- SQUAARETEN CONSTRUCTION — Supabase Schema
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- ============================================================

-- 1. PLOTS TABLE
CREATE TABLE IF NOT EXISTS plots (
  id BIGSERIAL PRIMARY KEY,
  plot_number TEXT NOT NULL,
  phase INTEGER NOT NULL DEFAULT 1,
  plot_area NUMERIC NOT NULL DEFAULT 0,
  road_area NUMERIC NOT NULL DEFAULT 0,
  total_area NUMERIC NOT NULL DEFAULT 0,
  cents TEXT,
  facing TEXT DEFAULT 'East',
  dimensions TEXT,
  points TEXT,
  label_x NUMERIC,
  label_y NUMERIC,
  price_per_sqft NUMERIC DEFAULT 1250,
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'reserved', 'sold')),
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS bookings (
  id BIGSERIAL PRIMARY KEY,
  customer_name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  plot_id BIGINT REFERENCES plots(id) ON DELETE SET NULL,
  plot_number TEXT NOT NULL,
  phase INTEGER NOT NULL DEFAULT 1,
  plot_size TEXT,
  booking_status TEXT NOT NULL DEFAULT 'reserved' CHECK (booking_status IN ('reserved', 'sold', 'cancelled')),
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. AUTO-UPDATE updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER plots_updated_at
  BEFORE UPDATE ON plots
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 4. ROW LEVEL SECURITY
ALTER TABLE plots ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Public can READ plots (for the website)
CREATE POLICY "Public can read plots"
  ON plots FOR SELECT
  USING (true);

-- Authenticated users can do everything with plots
CREATE POLICY "Authenticated users can insert plots"
  ON plots FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update plots"
  ON plots FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete plots"
  ON plots FOR DELETE
  TO authenticated
  USING (true);

-- Authenticated users can do everything with bookings
CREATE POLICY "Authenticated users can read bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert bookings"
  ON bookings FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update bookings"
  ON bookings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete bookings"
  ON bookings FOR DELETE
  TO authenticated
  USING (true);

-- 5. ENABLE REALTIME
ALTER PUBLICATION supabase_realtime ADD TABLE plots;
ALTER PUBLICATION supabase_realtime ADD TABLE bookings;

-- 6. SEED DATA — Phase 1 Plots (from karuppiahNagarPlots.js)
INSERT INTO plots (plot_number, phase, plot_area, road_area, total_area, cents, facing, dimensions, points, label_x, label_y, price_per_sqft, status) VALUES
('17', 1, 1939, 420, 2359, '5 Cents 181 sq.ft', 'East', '61.5 × 35 ft', '17.00,15.00 55.00,15.00 54.31,26.50 16.31,26.50', 35.66, 20.75, 1250, 'available'),
('16', 1, 2186, 420, 2606, '5 Cents 428 sq.ft', 'East', '62.5 × 35 ft', '16.31,26.50 54.31,26.50 53.62,38.00 15.62,38.00', 34.97, 32.25, 1250, 'reserved'),
('15', 1, 2204, 420, 2624, '6 Cents 10 sq.ft', 'East', '63 × 35 ft', '15.62,38.00 53.62,38.00 52.93,49.50 14.93,49.50', 34.28, 43.75, 1250, 'available'),
('14', 1, 2223, 420, 2643, '6 Cents 29 sq.ft', 'East', '63.5 × 35 ft', '14.93,49.50 52.93,49.50 52.24,61.00 14.24,61.00', 33.59, 55.25, 1250, 'available'),
('13', 1, 2241, 420, 2661, '6 Cents 47 sq.ft', 'East', '64 × 35 ft', '14.24,61.00 52.24,61.00 51.55,72.50 13.55,72.50', 32.90, 66.75, 1250, 'available'),
('12', 1, 2259, 420, 2679, '6 Cents 65 sq.ft', 'East', '64.5 × 35 ft', '13.55,72.50 51.55,72.50 50.86,84.00 12.86,84.00', 32.20, 78.25, 1250, 'sold'),
('11', 1, 2283, 420, 2703, '6 Cents 89 sq.ft', 'East', '65 × 35 ft', '12.86,84.00 50.86,84.00 50.17,95.50 12.17,95.50', 31.52, 89.75, 1250, 'available'),
('10', 1, 1542, 420, 1962, '4 Cents 220 sq.ft', 'East', '44 × 35 ft', '12.17,95.50 50.17,95.50 49.48,107.00 11.48,107.00', 30.83, 101.25, 1250, 'available'),
('9',  1, 1277, 360, 1637, '3 Cents 330 sq.ft', 'East', '43 × 31 ft', '11.48,107.00 49.48,107.00 48.88,117.00 10.88,117.00', 30.18, 112.00, 1250, 'sold'),
('8',  1, 1218, 360, 1578, '3 Cents 271 sq.ft', 'East', '40.5 × 31 ft', '10.88,117.00 48.88,117.00 48.28,127.00 10.28,127.00', 29.58, 122.00, 1250, 'reserved'),
('7',  1, 1178, 360, 1538, '3 Cents 231 sq.ft', 'East', '38 × 31 ft', '10.28,127.00 48.28,127.00 47.68,137.00 9.68,137.00', 28.98, 132.00, 1250, 'reserved'),
('6',  1, 1123, 360, 1483, '3 Cents 176 sq.ft', 'East', '38 × 31 ft', '9.68,137.00 47.68,137.00 47.08,147.00 9.08,147.00', 28.38, 142.00, 1250, 'available'),
('5',  1, 1089, 360, 1449, '3 Cents 142 sq.ft', 'East', '36.5 × 31 ft', '9.08,147.00 47.08,147.00 46.48,157.00 8.48,157.00', 27.78, 152.00, 1250, 'reserved'),
('4',  1, 1108, 360, 1468, '3 Cents 161 sq.ft', 'East', '36 × 31 ft', '8.48,157.00 46.48,157.00 45.88,167.00 7.88,167.00', 27.18, 162.00, 1250, 'available'),
('3',  1, 1201, 360, 1561, '3 Cents 254 sq.ft', 'East', '39.5 × 31 ft', '7.88,167.00 45.88,167.00 45.28,177.00 7.28,177.00', 26.58, 172.00, 1250, 'sold'),
('2',  1, 1284, 360, 1644, '3 Cents 337 sq.ft', 'East', '42 × 31 ft', '7.28,177.00 45.28,177.00 44.68,187.00 6.68,187.00', 25.98, 182.00, 1250, 'available'),
('1',  1, 3460, 825, 4285, '9 Cents 365 sq.ft', 'East', '46 × 80 ft', '6.68,187.00 44.68,187.00 43.00,215.00 1.00,215.00', 23.84, 201.00, 1250, 'reserved'),
('18', 1, 2520, 420, 2940, '6 Cents 326 sq.ft', 'West', '72 × 35 ft', '63.00,15.00 98.00,15.00 97.31,26.50 62.31,26.50', 80.16, 20.75, 1250, 'available'),
('19', 1, 2459, 420, 2879, '6 Cents 265 sq.ft', 'West', '70 × 35 ft', '62.31,26.50 97.31,26.50 96.62,38.00 61.62,38.00', 79.47, 32.25, 1250, 'sold'),
('20', 1, 2476, 420, 2896, '6 Cents 282 sq.ft', 'West', '70.5 × 35 ft', '61.62,38.00 96.62,38.00 95.93,49.50 60.93,49.50', 78.78, 43.75, 1250, 'available'),
('21', 1, 2485, 420, 2905, '6 Cents 291 sq.ft', 'West', '71 × 35 ft', '60.93,49.50 95.93,49.50 95.24,61.00 60.24,61.00', 78.09, 55.25, 1250, 'available'),
('22', 1, 2494, 420, 2914, '6 Cents 300 sq.ft', 'West', '71 × 35 ft', '60.24,61.00 95.24,61.00 94.55,72.50 59.55,72.50', 77.39, 66.75, 1250, 'available'),
('23', 1, 2511, 420, 2931, '6 Cents 317 sq.ft', 'West', '71 × 35 ft', '59.55,72.50 94.55,72.50 93.86,84.00 58.86,84.00', 76.70, 78.25, 1250, 'available'),
('24', 1, 2520, 420, 2940, '6 Cents 326 sq.ft', 'West', '72 × 35 ft', '58.86,84.00 93.86,84.00 93.17,95.50 58.17,95.50', 76.02, 89.75, 1250, 'reserved'),
('25', 1, 2520, 420, 2940, '6 Cents 326 sq.ft', 'West', '72 × 35 ft', '58.17,95.50 93.17,95.50 92.48,107.00 57.48,107.00', 75.33, 101.25, 1250, 'available'),
('26', 1, 2139, 0,   2139, '4 Cents 397 sq.ft', 'West', '145 × 15 ft', '57.48,107.00 102.48,107.00 102.24,111.00 57.24,111.00', 72.36, 109.00, 1250, 'available'),
('27', 1, 1298, 360, 1658, '3 Cents 351 sq.ft', 'West', '28 × 30 ft', '57.24,111.00 92.24,111.00 91.73,119.50 56.73,119.50', 74.48, 115.25, 1250, 'reserved'),
('28', 1, 1335, 360, 1695, '3 Cents 388 sq.ft', 'West', '44.5 × 30 ft', '56.73,119.50 91.73,119.50 91.22,128.00 56.22,128.00', 73.97, 123.75, 1250, 'reserved'),
('29', 1, 1335, 360, 1695, '3 Cents 388 sq.ft', 'West', '44.5 × 30 ft', '56.22,128.00 91.22,128.00 90.71,136.50 55.71,136.50', 73.46, 132.25, 1250, 'sold'),
('30', 1, 1335, 360, 1695, '3 Cents 388 sq.ft', 'West', '44.5 × 30 ft', '55.71,136.50 90.71,136.50 90.20,145.00 55.20,145.00', 72.95, 140.75, 1250, 'sold'),
('31', 1, 1331, 360, 1691, '3 Cents 384 sq.ft', 'West', '44.5 × 30.5 ft', '55.20,145.00 90.20,145.00 89.69,153.50 54.69,153.50', 72.44, 149.25, 1250, 'sold'),
('32', 1, 1316, 360, 1676, '3 Cents 369 sq.ft', 'West', '43.5 × 30.5 ft', '54.69,153.50 89.69,153.50 89.18,162.00 54.18,162.00', 71.94, 157.75, 1250, 'sold'),
('33', 1, 1319, 360, 1679, '3 Cents 372 sq.ft', 'West', '43.5 × 23 ft', '54.18,162.00 89.18,162.00 88.67,170.50 53.67,170.50', 71.43, 166.25, 1250, 'sold'),
('34', 1, 1245, 360, 1605, '3 Cents 298 sq.ft', 'West', '43.5 × 23 ft', '53.67,170.50 88.67,170.50 88.16,179.00 53.16,179.00', 70.91, 174.75, 1250, 'sold'),
('35A',1, 200,  60,  260,  '0.6 Cents 0 sq.ft', 'West', '40 × 6.5 ft', '53.16,179.00 88.16,179.00 87.92,183.00 52.92,183.00', 70.54, 181.00, 1250, 'available'),
('35', 1, 1740, 702, 2442, '5 Cents 264 sq.ft', 'West', '43 × 40.5 ft', '52.92,183.00 87.92,183.00 87.02,198.00 52.02,198.00', 69.97, 190.50, 1250, 'sold');

-- SEED DATA — Phase 2 Plots
INSERT INTO plots (plot_number, phase, plot_area, road_area, total_area, cents, facing, dimensions, points, label_x, label_y, price_per_sqft, status) VALUES
('8', 2, 2260.150, 605.340, 2865.49, '7.56 Cents', 'East', '21.34 × 23.6 ft', '5,15 50,15 50,62 5,62', 27.5, 38.5, 1250, 'available'),
('7', 2, 1745.020, 487.540, 2232.56, '5.13 Cents', 'East', '21.35 × 12.36 ft', '5,62 50,62 50,110 5,110', 27.5, 86, 1250, 'available'),
('6', 2, 1237.429, 387.140, 1624.569, '3.73 Cents', 'East', '15.39 × 9.00 ft', '5,110 50,110 50,158 5,158', 27.5, 134, 1250, 'available'),
('5', 2, 1109.270, 576.831, 1686.101, '5.27 Cents', 'East', '13.88 × 12.35 ft', '5,158 50,158 50,205 5,205', 27.5, 182, 1250, 'available'),
('1', 2, 2855.335, 595.185, 3450.52, '6.55 Cents', 'West', '16.91 × 12.99 ft', '60,15 105,15 105,62 60,62', 82.5, 38.5, 1250, 'available'),
('2', 2, 2232.560, 487.540, 2720.10, '5.13 Cents', 'West', '16.52 × 12.36 ft', '60,62 105,62 105,110 60,110', 82.5, 86, 1250, 'available'),
('3', 2, 2064.680, 450.590, 2515.27, '4.74 Cents', 'West', '16.23 × 9.15 ft', '60,110 105,110 105,158 60,158', 82.5, 134, 1250, 'available'),
('4', 2, 1449.290, 836.266, 2285.556, '6.80 Cents', 'West', '16.59 × 6.16 ft', '60,158 105,158 105,205 60,205', 82.5, 182, 1250, 'available');
