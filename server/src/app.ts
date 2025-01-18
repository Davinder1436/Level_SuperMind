// src/app.ts
import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import gemRoutes from './routes/gem.routes';
import birthChartRoutes from './routes/birth-chart.routes';
import astroDetailsRoutes from './routes/astro-details.routes';
import planetRoutes from './routes/planets.routes';
import numeroTableRoutes from './routes/numero-table.routes';
import chatRoutes, { setupWebSocket } from './routes/chat.routes';

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Middleware
app.use(cors());
app.use(express.json());

// Setup WebSocket
setupWebSocket(wss);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', gemRoutes);
app.use('/api', astroDetailsRoutes);
app.use('/api', planetRoutes);
app.use('/api', birthChartRoutes);
app.use('/api', numeroTableRoutes);
app.use('/api', chatRoutes);

export default app;
