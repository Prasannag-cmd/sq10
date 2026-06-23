/* ============================================================
   KARUPPIAH NAGAR — Plots Database (Shared)
   Contains all plot specifications from the layout documents
   ============================================================ */

const PRICE_PER_SQFT = 1250; // Pricing standard rate for Karuppiah Nagar

const rawPlots = [
  // LEFT COLUMN: Plots 1 to 17 (Bottom to Top in coordinate stacking)
  { id: '17', plotArea: 1939, roadArea: 420, totalArea: 2359, cents: '5 Cents 181 sq.ft', facing: 'East', status: 'available', dimensions: '61.5 × 35 ft', points: '17.00,15.00 55.00,15.00 54.31,26.50 16.31,26.50', labelX: 35.66, labelY: 20.75 },
  { id: '16', plotArea: 2186, roadArea: 420, totalArea: 2606, cents: '5 Cents 428 sq.ft', facing: 'East', status: 'reserved', dimensions: '62.5 × 35 ft', points: '16.31,26.50 54.31,26.50 53.62,38.00 15.62,38.00', labelX: 34.97, labelY: 32.25 },
  { id: '15', plotArea: 2204, roadArea: 420, totalArea: 2624, cents: '6 Cents 10 sq.ft', facing: 'East', status: 'available', dimensions: '63 × 35 ft', points: '15.62,38.00 53.62,38.00 52.93,49.50 14.93,49.50', labelX: 34.28, labelY: 43.75 },
  { id: '14', plotArea: 2223, roadArea: 420, totalArea: 2643, cents: '6 Cents 29 sq.ft', facing: 'East', status: 'available', dimensions: '63.5 × 35 ft', points: '14.93,49.50 52.93,49.50 52.24,61.00 14.24,61.00', labelX: 33.59, labelY: 55.25 },
  { id: '13', plotArea: 2241, roadArea: 420, totalArea: 2661, cents: '6 Cents 47 sq.ft', facing: 'East', status: 'available', dimensions: '64 × 35 ft', points: '14.24,61.00 52.24,61.00 51.55,72.50 13.55,72.50', labelX: 32.90, labelY: 66.75 },
  { id: '12', plotArea: 2259, roadArea: 420, totalArea: 2679, cents: '6 Cents 65 sq.ft', facing: 'East', status: 'sold', dimensions: '64.5 × 35 ft', points: '13.55,72.50 51.55,72.50 50.86,84.00 12.86,84.00', labelX: 32.20, labelY: 78.25 },
  { id: '11', plotArea: 2283, roadArea: 420, totalArea: 2703, cents: '6 Cents 89 sq.ft', facing: 'East', status: 'available', dimensions: '65 × 35 ft', points: '12.86,84.00 50.86,84.00 50.17,95.50 12.17,95.50', labelX: 31.52, labelY: 89.75 },
  { id: '10', plotArea: 1542, roadArea: 420, totalArea: 1962, cents: '4 Cents 220 sq.ft', facing: 'East', status: 'available', dimensions: '44 × 35 ft', points: '12.17,95.50 50.17,95.50 49.48,107.00 11.48,107.00', labelX: 30.83, labelY: 101.25 },
  { id: '9', plotArea: 1277, roadArea: 360, totalArea: 1637, cents: '3 Cents 330 sq.ft', facing: 'East', status: 'sold', dimensions: '43 × 31 ft', points: '11.48,107.00 49.48,107.00 48.88,117.00 10.88,117.00', labelX: 30.18, labelY: 112.00 },
  { id: '8', plotArea: 1218, roadArea: 360, totalArea: 1578, cents: '3 Cents 271 sq.ft', facing: 'East', status: 'reserved', dimensions: '40.5 × 31 ft', points: '10.88,117.00 48.88,117.00 48.28,127.00 10.28,127.00', labelX: 29.58, labelY: 122.00 },
  { id: '7', plotArea: 1178, roadArea: 360, totalArea: 1538, cents: '3 Cents 231 sq.ft', facing: 'East', status: 'reserved', dimensions: '38 × 31 ft', points: '10.28,127.00 48.28,127.00 47.68,137.00 9.68,137.00', labelX: 28.98, labelY: 132.00 },
  { id: '6', plotArea: 1123, roadArea: 360, totalArea: 1483, cents: '3 Cents 176 sq.ft', facing: 'East', status: 'available', dimensions: '38 × 31 ft', points: '9.68,137.00 47.68,137.00 47.08,147.00 9.08,147.00', labelX: 28.38, labelY: 142.00 },
  { id: '5', plotArea: 1089, roadArea: 360, totalArea: 1449, cents: '3 Cents 142 sq.ft', facing: 'East', status: 'reserved', dimensions: '36.5 × 31 ft', points: '9.08,147.00 47.08,147.00 46.48,157.00 8.48,157.00', labelX: 27.78, labelY: 152.00 },
  { id: '4', plotArea: 1108, roadArea: 360, totalArea: 1468, cents: '3 Cents 161 sq.ft', facing: 'East', status: 'available', dimensions: '36 × 31 ft', points: '8.48,157.00 46.48,157.00 45.88,167.00 7.88,167.00', labelX: 27.18, labelY: 162.00 },
  { id: '3', plotArea: 1201, roadArea: 360, totalArea: 1561, cents: '3 Cents 254 sq.ft', facing: 'East', status: 'sold', dimensions: '39.5 × 31 ft', points: '7.88,167.00 45.88,167.00 45.28,177.00 7.28,177.00', labelX: 26.58, labelY: 172.00 },
  { id: '2', plotArea: 1284, roadArea: 360, totalArea: 1644, cents: '3 Cents 337 sq.ft', facing: 'East', status: 'available', dimensions: '42 × 31 ft', points: '7.28,177.00 45.28,177.00 44.68,187.00 6.68,187.00', labelX: 25.98, labelY: 182.00 },
  { id: '1', plotArea: 3460, roadArea: 825, totalArea: 4285, cents: '9 Cents 365 sq.ft', facing: 'East', status: 'reserved', dimensions: '46 × 80 ft', points: '6.68,187.00 44.68,187.00 43.00,215.00 1.00,215.00', labelX: 23.84, labelY: 201.00 },

  // RIGHT COLUMN: Plots 18 to 35A (Top to Bottom in coordinate stacking)
  { id: '18', plotArea: 2520, roadArea: 420, totalArea: 2940, cents: '6 Cents 326 sq.ft', facing: 'West', status: 'available', dimensions: '72 × 35 ft', points: '63.00,15.00 98.00,15.00 97.31,26.50 62.31,26.50', labelX: 80.16, labelY: 20.75 },
  { id: '19', plotArea: 2459, roadArea: 420, totalArea: 2879, cents: '6 Cents 265 sq.ft', facing: 'West', status: 'sold', dimensions: '70 × 35 ft', points: '62.31,26.50 97.31,26.50 96.62,38.00 61.62,38.00', labelX: 79.47, labelY: 32.25 },
  { id: '20', plotArea: 2476, roadArea: 420, totalArea: 2896, cents: '6 Cents 282 sq.ft', facing: 'West', status: 'available', dimensions: '70.5 × 35 ft', points: '61.62,38.00 96.62,38.00 95.93,49.50 60.93,49.50', labelX: 78.78, labelY: 43.75 },
  { id: '21', plotArea: 2485, roadArea: 420, totalArea: 2905, cents: '6 Cents 291 sq.ft', facing: 'West', status: 'available', dimensions: '71 × 35 ft', points: '60.93,49.50 95.93,49.50 95.24,61.00 60.24,61.00', labelX: 78.09, labelY: 55.25 },
  { id: '22', plotArea: 2494, roadArea: 420, totalArea: 2914, cents: '6 Cents 300 sq.ft', facing: 'West', status: 'available', dimensions: '71 × 35 ft', points: '60.24,61.00 95.24,61.00 94.55,72.50 59.55,72.50', labelX: 77.39, labelY: 66.75 },
  { id: '23', plotArea: 2511, roadArea: 420, totalArea: 2931, cents: '6 Cents 317 sq.ft', facing: 'West', status: 'available', dimensions: '71 × 35 ft', points: '59.55,72.50 94.55,72.50 93.86,84.00 58.86,84.00', labelX: 76.70, labelY: 78.25 },
  { id: '24', plotArea: 2520, roadArea: 420, totalArea: 2940, cents: '6 Cents 326 sq.ft', facing: 'West', status: 'reserved', dimensions: '72 × 35 ft', points: '58.86,84.00 93.86,84.00 93.17,95.50 58.17,95.50', labelX: 76.02, labelY: 89.75 },
  { id: '25', plotArea: 2520, roadArea: 420, totalArea: 2940, cents: '6 Cents 326 sq.ft', facing: 'West', status: 'available', dimensions: '72 × 35 ft', points: '58.17,95.50 93.17,95.50 92.48,107.00 57.48,107.00', labelX: 75.33, labelY: 101.25 },
  { id: '26', plotArea: 2139, roadArea: 0, totalArea: 2139, cents: '4 Cents 397 sq.ft', facing: 'West', status: 'available', dimensions: '145 × 15 ft', points: '57.48,107.00 102.48,107.00 102.24,111.00 57.24,111.00', labelX: 72.36, labelY: 109.00 },
  { id: '27', plotArea: 1298, roadArea: 360, totalArea: 1658, cents: '3 Cents 351 sq.ft', facing: 'West', status: 'reserved', dimensions: '28 × 30 ft', points: '57.24,111.00 92.24,111.00 91.73,119.50 56.73,119.50', labelX: 74.48, labelY: 115.25 },
  { id: '28', plotArea: 1335, roadArea: 360, totalArea: 1695, cents: '3 Cents 388 sq.ft', facing: 'West', status: 'reserved', dimensions: '44.5 × 30 ft', points: '56.73,119.50 91.73,119.50 91.22,128.00 56.22,128.00', labelX: 73.97, labelY: 123.75 },
  { id: '29', plotArea: 1335, roadArea: 360, totalArea: 1695, cents: '3 Cents 388 sq.ft', facing: 'West', status: 'sold', dimensions: '44.5 × 30 ft', points: '56.22,128.00 91.22,128.00 90.71,136.50 55.71,136.50', labelX: 73.46, labelY: 132.25 },
  { id: '30', plotArea: 1335, roadArea: 360, totalArea: 1695, cents: '3 Cents 388 sq.ft', facing: 'West', status: 'sold', dimensions: '44.5 × 30 ft', points: '55.71,136.50 90.71,136.50 90.20,145.00 55.20,145.00', labelX: 72.95, labelY: 140.75 },
  { id: '31', plotArea: 1331, roadArea: 360, totalArea: 1691, cents: '3 Cents 384 sq.ft', facing: 'West', status: 'sold', dimensions: '44.5 × 30.5 ft', points: '55.20,145.00 90.20,145.00 89.69,153.50 54.69,153.50', labelX: 72.44, labelY: 149.25 },
  { id: '32', plotArea: 1316, roadArea: 360, totalArea: 1676, cents: '3 Cents 369 sq.ft', facing: 'West', status: 'sold', dimensions: '43.5 × 30.5 ft', points: '54.69,153.50 89.69,153.50 89.18,162.00 54.18,162.00', labelX: 71.94, labelY: 157.75 },
  { id: '33', plotArea: 1319, roadArea: 360, totalArea: 1679, cents: '3 Cents 372 sq.ft', facing: 'West', status: 'sold', dimensions: '43.5 × 23 ft', points: '54.18,162.00 89.18,162.00 88.67,170.50 53.67,170.50', labelX: 71.43, labelY: 166.25 },
  { id: '34', plotArea: 1245, roadArea: 360, totalArea: 1605, cents: '3 Cents 298 sq.ft', facing: 'West', status: 'sold', dimensions: '43.5 × 23 ft', points: '53.67,170.50 88.67,170.50 88.16,179.00 53.16,179.00', labelX: 70.91, labelY: 174.75 },
  { id: '35A', plotArea: 200, roadArea: 60, totalArea: 260, cents: '0.6 Cents 0 sq.ft', facing: 'West', status: 'available', dimensions: '40 × 6.5 ft', points: '53.16,179.00 88.16,179.00 87.92,183.00 52.92,183.00', labelX: 70.54, labelY: 181.00 },
  { id: '35', plotArea: 1740, roadArea: 702, totalArea: 2442, cents: '5 Cents 264 sq.ft', facing: 'West', status: 'sold', dimensions: '43 × 40.5 ft', points: '52.92,183.00 87.92,183.00 87.02,198.00 52.02,198.00', labelX: 69.97, labelY: 190.50 }
];

export const allPlots = rawPlots.map(plot => {
  const price = plot.totalArea * PRICE_PER_SQFT;
  const lakhs = price / 100000;
  return {
    ...plot,
    price,
    priceStr: `₹${lakhs.toFixed(2)} Lakhs`,
    area: plot.totalArea,
    areaStr: `${plot.totalArea.toLocaleString()} sq.ft`,
  };
});

// PHASE 2 PLOT DATABASE
const rawPlotsPhase2 = [
  { id: '8', plotArea: 2260.150, roadArea: 605.340, totalArea: 2865.49, cents: '7.56 Cents', facing: 'East', status: 'available', dimensions: '21.34 × 23.6 ft', points: '5,15 50,15 50,62 5,62', labelX: 27.5, labelY: 38.5 },
  { id: '7', plotArea: 1745.020, roadArea: 487.540, totalArea: 2232.56, cents: '5.13 Cents', facing: 'East', status: 'available', dimensions: '21.35 × 12.36 ft', points: '5,62 50,62 50,110 5,110', labelX: 27.5, labelY: 86 },
  { id: '6', plotArea: 1237.429, roadArea: 387.140, totalArea: 1624.569, cents: '3.73 Cents', facing: 'East', status: 'available', dimensions: '15.39 × 9.00 ft', points: '5,110 50,110 50,158 5,158', labelX: 27.5, labelY: 134 },
  { id: '5', plotArea: 1109.270, roadArea: 576.831, totalArea: 1686.101, cents: '5.27 Cents', facing: 'East', status: 'available', dimensions: '13.88 × 12.35 ft', points: '5,158 50,158 50,205 5,205', labelX: 27.5, labelY: 182 },
  { id: '1', plotArea: 2855.335, roadArea: 595.185, totalArea: 3450.52, cents: '6.55 Cents', facing: 'West', status: 'available', dimensions: '16.91 × 12.99 ft', points: '60,15 105,15 105,62 60,62', labelX: 82.5, labelY: 38.5 },
  { id: '2', plotArea: 2232.560, roadArea: 487.540, totalArea: 2720.10, cents: '5.13 Cents', facing: 'West', status: 'available', dimensions: '16.52 × 12.36 ft', points: '60,62 105,62 105,110 60,110', labelX: 82.5, labelY: 86 },
  { id: '3', plotArea: 2064.680, roadArea: 450.590, totalArea: 2515.27, cents: '4.74 Cents', facing: 'West', status: 'available', dimensions: '16.23 × 9.15 ft', points: '60,110 105,110 105,158 60,158', labelX: 82.5, labelY: 134 },
  { id: '4', plotArea: 1449.290, roadArea: 836.266, totalArea: 2285.556, cents: '6.80 Cents', facing: 'West', status: 'available', dimensions: '16.59 × 6.16 ft', points: '60,158 105,158 105,205 60,205', labelX: 82.5, labelY: 182 }
];

export const allPlotsPhase2 = rawPlotsPhase2.map(plot => {
  const price = plot.totalArea * PRICE_PER_SQFT;
  const lakhs = price / 100000;
  return {
    ...plot,
    price,
    priceStr: `₹${lakhs.toFixed(2)} Lakhs`,
    area: plot.totalArea,
    areaStr: `${plot.totalArea.toLocaleString()} sq.ft`,
  };
});
