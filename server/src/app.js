"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const gem_routes_1 = __importDefault(require("./routes/gem.routes"));
const birth_chart_routes_1 = __importDefault(require("./routes/birth-chart.routes"));
const astro_details_routes_1 = __importDefault(require("./routes/astro-details.routes"));
const planets_routes_1 = __importDefault(require("./routes/planets.routes"));
const numero_table_routes_1 = __importDefault(require("./routes/numero-table.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/auth', auth_routes_1.default);
app.use('/api', gem_routes_1.default);
// Add this line with your other route configurations
app.use('/api', astro_details_routes_1.default);
// Add this line with your other route configurations
app.use('/api', planets_routes_1.default);
// Add this line with your other route configurations
app.use('/api', birth_chart_routes_1.default);
// Add this line with your other route configurations
app.use('/api', numero_table_routes_1.default);
exports.default = app;
