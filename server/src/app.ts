import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import gemRoutes from './routes/gem.routes';
import birthChartRoutes from './routes/birth-chart.routes';
import astroDetailsRoutes from './routes/astro-details.routes';
import planetRoutes from './routes/planets.routes';
import numeroTableRoutes from './routes/numero-table.routes';


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', gemRoutes);

// Add this line with your other route configurations
app.use('/api', astroDetailsRoutes);


// Add this line with your other route configurations
app.use('/api', planetRoutes);

// Add this line with your other route configurations
app.use('/api', birthChartRoutes);

// Add this line with your other route configurations
app.use('/api', numeroTableRoutes);

export default app;


