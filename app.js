/**
 * NutriPulse - Calorie & Macro Tracker
 * Pure Vanilla JavaScript ES Module / Controller
 * Persistent storage via localStorage
 */

// ==========================================================================
// 1. PRESET FOOD DATABASE
// ==========================================================================
const PRESET_FOODS = [
    { id: 'p1', name: 'Chicken Breast (Cooked)', per100g: { kcal: 165, protein: 31, carbs: 0, fats: 3.6 }, defaultUnit: 'g' },
    { id: 'p2', name: 'Eggs (Whole, Large)', per100g: { kcal: 143, protein: 12.6, carbs: 0.7, fats: 9.5 }, defaultUnit: 'g' },
    { id: 'p3', name: 'Oatmeal (Rolled Oats)', per100g: { kcal: 389, protein: 16.9, carbs: 66.3, fats: 6.9 }, defaultUnit: 'g' },
    { id: 'p4', name: 'White Rice (Cooked)', per100g: { kcal: 130, protein: 2.7, carbs: 28, fats: 0.3 }, defaultUnit: 'g' },
    { id: 'p5', name: 'Salmon Filet (Grilled)', per100g: { kcal: 206, protein: 22, carbs: 0, fats: 12 }, defaultUnit: 'g' },
    { id: 'p6', name: 'Banana', per100g: { kcal: 89, protein: 1.1, carbs: 22.8, fats: 0.3 }, defaultUnit: 'g' },
    { id: 'p7', name: 'Apple (Fresh)', per100g: { kcal: 52, protein: 0.3, carbs: 13.8, fats: 0.2 }, defaultUnit: 'g' },
    { id: 'p8', name: 'Greek Yogurt (Plain 0%)', per100g: { kcal: 59, protein: 10, carbs: 3.6, fats: 0.4 }, defaultUnit: 'g' },
    { id: 'p9', name: 'Avocado', per100g: { kcal: 160, protein: 2, carbs: 8.5, fats: 14.7 }, defaultUnit: 'g' },
    { id: 'p10', name: 'Whey Protein Powder', per100g: { kcal: 375, protein: 80, carbs: 5, fats: 3 }, defaultUnit: 'g' },
    { id: 'p11', name: 'Almonds (Raw)', per100g: { kcal: 579, protein: 21, carbs: 22, fats: 50 }, defaultUnit: 'g' },
    { id: 'p12', name: 'Peanut Butter', per100g: { kcal: 588, protein: 25, carbs: 20, fats: 50 }, defaultUnit: 'g' },
    { id: 'p13', name: 'Whole Wheat Bread', per100g: { kcal: 247, protein: 13, carbs: 41, fats: 3.4 }, defaultUnit: 'g' },
    { id: 'p14', name: 'Sweet Potato (Baked)', per100g: { kcal: 90, protein: 2, carbs: 20.7, fats: 0.1 }, defaultUnit: 'g' },
    { id: 'p15', name: 'Broccoli (Steam Cooked)', per100g: { kcal: 35, protein: 2.4, carbs: 7.2, fats: 0.4 }, defaultUnit: 'g' },
    { id: 'p16', name: 'Cottage Cheese (Low Fat)', per100g: { kcal: 86, protein: 11, carbs: 3.4, fats: 2.3 }, defaultUnit: 'g' },
    { id: 'p17', name: 'Sirloin Steak (Grilled)', per100g: { kcal: 244, protein: 27, carbs: 0, fats: 15 }, defaultUnit: 'g' },
    { id: 'p18', name: 'Whole Milk', per100g: { kcal: 61, protein: 3.2, carbs: 4.8, fats: 3.3 }, defaultUnit: 'g' },
    { id: 'p19', name: 'Dark Chocolate (70%)', per100g: { kcal: 598, protein: 7.8, carbs: 46, fats: 43 }, defaultUnit: 'g' },
    { id: 'p20', name: 'Orange Juice (Natural)', per100g: { kcal: 45, protein: 0.7, carbs: 10.4, fats: 0.2 }, defaultUnit: 'g' },
    { id: 'p21', name: 'Tuna (Canned in Water)', per100g: { kcal: 116, protein: 26, carbs: 0, fats: 1 }, defaultUnit: 'g' },
    { id: 'p22', name: 'Pasta (Cooked)', per100g: { kcal: 158, protein: 5.8, carbs: 31, fats: 0.9 }, defaultUnit: 'g' },
    { id: 'p23', name: 'Olive Oil', per100g: { kcal: 884, protein: 0, carbs: 0, fats: 100 }, defaultUnit: 'g' },
    { id: 'p24', name: 'Mixed Salad Greens', per100g: { kcal: 17, protein: 1.2, carbs: 3.3, fats: 0.3 }, defaultUnit: 'g' }
];

// ==========================================================================
// 2. STORAGE MANAGER (localStorage Interface)
// ==========================================================================
const STORAGE_KEYS = {
    GOALS: 'nutripulse_user_goals',
    LOGS: 'nutripulse_daily_logs',
    CUSTOM_FOODS: 'nutripulse_custom_foods',
    WEIGHT: 'nutripulse_weight_logs',
    THEME: 'nutripulse_theme'
};

const DEFAULT_GOALS = {
    calories: 2000,
    protein: 150,
    carbs: 225,
    fats: 65,
    water: 2500
};

const StorageManager = {
    getGoals() {
        const data = localStorage.getItem(STORAGE_KEYS.GOALS);
        return data ? JSON.parse(data) : { ...DEFAULT_GOALS };
    },
    saveGoals(goals) {
        localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals));
    },
    getLogs(dateStr) {
        const allLogs = JSON.parse(localStorage.getItem(STORAGE_KEYS.LOGS) || '{}');
        return allLogs[dateStr] || {
            breakfast: [],
            lunch: [],
            dinner: [],
            snacks: [],
            water: 0,
            burned: 0
        };
    },
    saveLogs(dateStr, logData) {
        const allLogs = JSON.parse(localStorage.getItem(STORAGE_KEYS.LOGS) || '{}');
        allLogs[dateStr] = logData;
        localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(allLogs));
    },
    getAllLogs() {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.LOGS) || '{}');
    },
    getCustomFoods() {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOM_FOODS) || '[]');
    },
    saveCustomFood(food) {
        const customFoods = this.getCustomFoods();
        customFoods.push(food);
        localStorage.setItem(STORAGE_KEYS.CUSTOM_FOODS, JSON.stringify(customFoods));
    },
    deleteCustomFood(id) {
        let customFoods = this.getCustomFoods();
        customFoods = customFoods.filter(f => f.id !== id);
        localStorage.setItem(STORAGE_KEYS.CUSTOM_FOODS, JSON.stringify(customFoods));
    },
    getWeightLogs() {
        const logs = JSON.parse(localStorage.getItem(STORAGE_KEYS.WEIGHT) || '[]');
        return logs.sort((a, b) => new Date(a.date) - new Date(b.date));
    },
    saveWeightLog(entry) {
        const logs = this.getWeightLogs();
        const existingIdx = logs.findIndex(l => l.date === entry.date);
        if (existingIdx >= 0) {
            logs[existingIdx] = entry;
        } else {
            logs.push(entry);
        }
        localStorage.setItem(STORAGE_KEYS.WEIGHT, JSON.stringify(logs));
    },
    deleteWeightLog(id) {
        let logs = this.getWeightLogs();
        logs = logs.filter(l => l.id !== id);
        localStorage.setItem(STORAGE_KEYS.WEIGHT, JSON.stringify(logs));
    },
    exportBackupJSON() {
        const data = {
            goals: this.getGoals(),
            dailyLogs: this.getAllLogs(),
            customFoods: this.getCustomFoods(),
            weightLogs: this.getWeightLogs(),
            exportedAt: new Date().toISOString()
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `NutriPulse_Backup_${new Date().toISOString().slice(0,10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
    },
    importBackupJSON(jsonStr) {
        try {
            const data = JSON.parse(jsonStr);
            if (data.goals) localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(data.goals));
            if (data.dailyLogs) localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(data.dailyLogs));
            if (data.customFoods) localStorage.setItem(STORAGE_KEYS.CUSTOM_FOODS, JSON.stringify(data.customFoods));
            if (data.weightLogs) localStorage.setItem(STORAGE_KEYS.WEIGHT, JSON.stringify(data.weightLogs));
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    },
    clearAll() {
        localStorage.removeItem(STORAGE_KEYS.GOALS);
        localStorage.removeItem(STORAGE_KEYS.LOGS);
        localStorage.removeItem(STORAGE_KEYS.CUSTOM_FOODS);
        localStorage.removeItem(STORAGE_KEYS.WEIGHT);
    }
};

// ==========================================================================
// 3. CANVAS CHART RENDERER (Zero Dependencies)
// ==========================================================================
const ChartRenderer = {
    isLightTheme() {
        return document.body.classList.contains('light-theme');
    },

    render7DayTrend(canvas, logsMap, goals) {
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const light = this.isLightTheme();
        ctx.clearRect(0, 0, width, height);

        // Get past 7 days dates
        const dates = [];
        const today = new Date();
        for (let i = 6; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(today.getDate() - i);
            dates.push(d.toISOString().slice(0, 10));
        }

        const padding = { top: 30, right: 30, bottom: 40, left: 50 };
        const chartW = width - padding.left - padding.right;
        const chartH = height - padding.top - padding.bottom;

        // Calculate max calories for scale
        let maxKcal = goals.calories;
        const kcalValues = dates.map(d => {
            const log = logsMap[d] || { breakfast: [], lunch: [], dinner: [], snacks: [] };
            let total = 0;
            ['breakfast', 'lunch', 'dinner', 'snacks'].forEach(m => {
                (log[m] || []).forEach(item => total += item.kcal);
            });
            if (total > maxKcal) maxKcal = total;
            return total;
        });

        maxKcal = Math.ceil((maxKcal * 1.15) / 500) * 500; // grid rounding

        // Draw background grid
        ctx.strokeStyle = light ? 'rgba(15, 23, 42, 0.1)' : 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1;
        const gridSteps = 4;
        for (let i = 0; i <= gridSteps; i++) {
            const y = padding.top + (chartH / gridSteps) * i;
            const val = Math.round(maxKcal - (maxKcal / gridSteps) * i);
            ctx.beginPath();
            ctx.moveTo(padding.left, y);
            ctx.lineTo(width - padding.right, y);
            ctx.stroke();

            ctx.fillStyle = '#64748b';
            ctx.font = '11px Plus Jakarta Sans, sans-serif';
            ctx.textAlign = 'right';
            ctx.fillText(val, padding.left - 8, y + 4);
        }

        // Draw Goal Target Line
        const goalY = padding.top + chartH - (goals.calories / maxKcal) * chartH;
        ctx.strokeStyle = '#f97316';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(padding.left, goalY);
        ctx.lineTo(width - padding.right, goalY);
        ctx.stroke();
        ctx.setLineDash([]); // reset

        // Label for Goal Line
        ctx.fillStyle = '#f97316';
        ctx.font = 'bold 11px Plus Jakarta Sans, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`Target: ${goals.calories} kcal`, width - padding.right - 100, goalY - 6);

        // Draw Bars
        const barWidth = 32;
        const gap = (chartW - dates.length * barWidth) / (dates.length + 1);

        dates.forEach((dateStr, idx) => {
            const kcal = kcalValues[idx];
            const barH = (kcal / maxKcal) * chartH;
            const x = padding.left + gap + idx * (barWidth + gap);
            const y = padding.top + chartH - barH;

            // Bar Gradient
            const grad = ctx.createLinearGradient(x, y, x, padding.top + chartH);
            if (kcal > goals.calories + 100) {
                grad.addColorStop(0, '#f97316');
                grad.addColorStop(1, '#ea580c');
            } else {
                grad.addColorStop(0, '#34d399');
                grad.addColorStop(1, '#059669');
            }

            ctx.fillStyle = grad;
            ctx.beginPath();
            if (barH > 6) {
                ctx.roundRect(x, y, barWidth, barH, [6, 6, 0, 0]);
            } else {
                ctx.rect(x, y, barWidth, barH);
            }
            ctx.fill();

            // Calorie text on top of bar
            if (kcal > 0) {
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 11px Plus Jakarta Sans, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(kcal, x + barWidth / 2, y - 6);
            }

            // Date label
            const dObj = new Date(dateStr + 'T00:00:00');
            const dayLabel = dObj.toLocaleDateString('en-US', { weekday: 'short' });
            ctx.fillStyle = light ? '#475569' : '#94a3b8';
            ctx.font = '11px Plus Jakarta Sans, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(dayLabel, x + barWidth / 2, height - 12);
        });
    },

    renderMacroDonut(canvas, proteinG, carbsG, fatsG) {
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const light = this.isLightTheme();
        ctx.clearRect(0, 0, width, height);

        const pKcal = proteinG * 4;
        const cKcal = carbsG * 4;
        const fKcal = fatsG * 9;
        const totalKcal = pKcal + cKcal + fKcal;

        const centerX = width / 2;
        const centerY = height / 2 - 10;
        const outerRadius = 80;
        const innerRadius = 52;

        if (totalKcal === 0) {
            ctx.fillStyle = light ? 'rgba(15, 23, 42, 0.08)' : 'rgba(255, 255, 255, 0.08)';
            ctx.beginPath();
            ctx.arc(centerX, centerY, outerRadius, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#64748b';
            ctx.font = '12px Plus Jakarta Sans, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('No Data', centerX, centerY + 4);
            return;
        }

        const segments = [
            { label: 'Protein', kcal: pKcal, color: '#10b981' },
            { label: 'Carbs', kcal: cKcal, color: '#38bdf8' },
            { label: 'Fats', kcal: fKcal, color: '#a855f7' }
        ];

        let startAngle = -Math.PI / 2;

        segments.forEach(seg => {
            const sliceAngle = (seg.kcal / totalKcal) * (Math.PI * 2);
            const endAngle = startAngle + sliceAngle;

            ctx.beginPath();
            ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle);
            ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true);
            ctx.closePath();
            ctx.fillStyle = seg.color;
            ctx.fill();

            startAngle = endAngle;
        });

        // Inner Text
        ctx.fillStyle = light ? '#0f172a' : '#ffffff';
        ctx.font = 'bold 16px Plus Jakarta Sans, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`${Math.round(totalKcal)}`, centerX, centerY);
        ctx.fillStyle = light ? '#64748b' : '#94a3b8';
        ctx.font = '10px Plus Jakarta Sans, sans-serif';
        ctx.fillText('total kcal', centerX, centerY + 14);

        // Legend below
        const legendY = height - 20;
        const gap = width / 3;
        segments.forEach((seg, i) => {
            const x = gap * i + gap / 2;
            const pct = Math.round((seg.kcal / totalKcal) * 100);

            ctx.fillStyle = seg.color;
            ctx.beginPath();
            ctx.arc(x - 22, legendY, 5, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = light ? '#334155' : '#e2e8f0';
            ctx.font = '11px Plus Jakarta Sans, sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText(`${seg.label} ${pct}%`, x - 14, legendY + 4);
        });
    },

    renderWeightTrend(canvas, weightLogs) {
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const light = this.isLightTheme();
        ctx.clearRect(0, 0, width, height);

        if (!weightLogs || weightLogs.length === 0) {
            ctx.fillStyle = '#64748b';
            ctx.font = '13px Plus Jakarta Sans, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('No weight records logged yet. Add your first weight log!', width / 2, height / 2);
            return;
        }

        const padding = { top: 30, right: 30, bottom: 40, left: 45 };
        const chartW = width - padding.left - padding.right;
        const chartH = height - padding.top - padding.bottom;

        const weights = weightLogs.map(l => Number(l.weight));
        let minW = Math.min(...weights);
        let maxW = Math.max(...weights);

        if (minW === maxW) {
            minW -= 2;
            maxW += 2;
        } else {
            minW = Math.floor(minW - 1);
            maxW = Math.ceil(maxW + 1);
        }

        // Grid lines
        ctx.strokeStyle = light ? 'rgba(15, 23, 42, 0.1)' : 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1;
        const steps = 4;
        for (let i = 0; i <= steps; i++) {
            const y = padding.top + (chartH / steps) * i;
            const val = (maxW - ((maxW - minW) / steps) * i).toFixed(1);
            ctx.beginPath();
            ctx.moveTo(padding.left, y);
            ctx.lineTo(width - padding.right, y);
            ctx.stroke();

            ctx.fillStyle = '#64748b';
            ctx.font = '11px Plus Jakarta Sans, sans-serif';
            ctx.textAlign = 'right';
            ctx.fillText(val, padding.left - 6, y + 4);
        }

        // Plot Points & Line
        const pts = weightLogs.map((l, i) => {
            const x = padding.left + (chartW / (weightLogs.length - 1 || 1)) * i;
            const y = padding.top + chartH - ((l.weight - minW) / (maxW - minW)) * chartH;
            return { x, y, weight: l.weight, date: l.date };
        });

        // Fill Area under Line
        ctx.beginPath();
        ctx.moveTo(pts[0].x, padding.top + chartH);
        pts.forEach(p => ctx.lineTo(p.x, p.y));
        ctx.lineTo(pts[pts.length - 1].x, padding.top + chartH);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, padding.top, 0, padding.top + chartH);
        grad.addColorStop(0, 'rgba(56, 189, 248, 0.25)');
        grad.addColorStop(1, 'rgba(56, 189, 248, 0.0)');
        ctx.fillStyle = grad;
        ctx.fill();

        // Stroke Line
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        pts.forEach((p, i) => {
            if (i === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
        });
        ctx.stroke();

        // Draw Circles
        pts.forEach(p => {
            ctx.fillStyle = light ? '#ffffff' : '#0f172a';
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = light ? '#0f172a' : '#ffffff';
            ctx.font = 'bold 10px Plus Jakarta Sans, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(`${p.weight}kg`, p.x, p.y - 10);
        });
    }
};

// ==========================================================================
// 4. MAIN APP CONTROLLER
// ==========================================================================
class CalorieApp {
    constructor() {
        this.selectedDate = new Date().toISOString().slice(0, 10);
        this.activeTab = 'dashboard';
        this.selectedFoodForAdd = null;
        this.theme = localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';

        this.initDOM();
        this.bindEvents();
        this.applyTheme(this.theme);
        this.renderAll();
    }

    initDOM() {
        // Core elements
        this.datePicker = document.getElementById('date-picker-input');
        this.currentDateLabel = document.getElementById('current-date-label');
        this.btnPrevDay = document.getElementById('btn-prev-day');
        this.btnNextDay = document.getElementById('btn-next-day');
        this.btnToday = document.getElementById('btn-today');

        // Navigation Tabs
        this.navTabs = document.querySelectorAll('.nav-tab');
        this.tabContents = document.querySelectorAll('.tab-content');

        // Theme Toggle
        this.themeToggleBtn = document.getElementById('theme-toggle');

        // Modal
        this.addFoodModal = document.getElementById('modal-add-food');
        this.foodSearchInput = document.getElementById('food-search-input');
        this.searchResultsList = document.getElementById('search-results-list');
        this.selectedFoodPanel = document.getElementById('selected-food-panel');
        this.selFoodAmountInput = document.getElementById('sel-food-amount');
        this.selMealTypeSelect = document.getElementById('sel-meal-type');
        this.modalSubtabs = document.querySelectorAll('.modal-tab');

        // Initial date input setting
        this.datePicker.value = this.selectedDate;
        this.updateDateDisplay();
    }

    bindEvents() {
        // Date Navigation
        this.datePicker.addEventListener('change', (e) => {
            this.selectedDate = e.target.value;
            this.updateDateDisplay();
            this.renderAll();
        });

        this.btnPrevDay.addEventListener('click', () => this.changeDate(-1));
        this.btnNextDay.addEventListener('click', () => this.changeDate(1));
        this.btnToday.addEventListener('click', () => {
            this.selectedDate = new Date().toISOString().slice(0, 10);
            this.datePicker.value = this.selectedDate;
            this.updateDateDisplay();
            this.renderAll();
        });

        // Tab Navigation
        this.navTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTab = tab.dataset.tab;
                this.switchTab(targetTab);
            });
        });

        // Add Meal Food Triggers
        document.querySelectorAll('.btn-add-meal-food').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const meal = e.currentTarget.dataset.meal;
                this.openAddFoodModal(meal);
            });
        });

        document.getElementById('btn-quick-add-food').addEventListener('click', () => {
            this.openAddFoodModal('breakfast');
        });

        document.getElementById('btn-open-create-food-modal').addEventListener('click', () => {
            this.openAddFoodModal('breakfast');
            this.switchModalSubtab('custom-create');
        });

        // Modal Controls
        document.getElementById('btn-close-food-modal').addEventListener('click', () => {
            this.addFoodModal.close();
        });

        this.modalSubtabs.forEach(tab => {
            tab.addEventListener('click', () => {
                this.switchModalSubtab(tab.dataset.modaltab);
            });
        });

        // Food Search Input
        this.foodSearchInput.addEventListener('input', () => {
            this.renderSearchResults();
        });

        // Amount Input Change Calculation
        this.selFoodAmountInput.addEventListener('input', () => {
            this.updateSelectedFoodPreview();
        });

        // Confirm Add Food
        document.getElementById('btn-confirm-add-food').addEventListener('click', () => {
            this.addFoodToCurrentLog();
        });

        // Create Custom Food Form
        document.getElementById('form-create-custom-food').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleCreateCustomFood();
        });

        // Water Buttons
        document.querySelectorAll('.water-btn[data-amount]').forEach(btn => {
            btn.addEventListener('click', () => {
                const amount = Number(btn.dataset.amount);
                this.addWater(amount);
            });
        });

        document.getElementById('btn-reset-water').addEventListener('click', () => {
            this.resetWater();
        });

        // Exercise Burn Form
        document.getElementById('exercise-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const burnedVal = Number(document.getElementById('exercise-input').value);
            if (burnedVal >= 0) {
                const logs = StorageManager.getLogs(this.selectedDate);
                logs.burned = burnedVal;
                StorageManager.saveLogs(this.selectedDate, logs);
                document.getElementById('exercise-input').value = '';
                this.renderDashboard();
            }
        });

        // Quick Edit Goals
        document.getElementById('btn-edit-goals-quick').addEventListener('click', () => {
            this.switchTab('settings');
        });

        // Weight Entry Form
        document.getElementById('form-weight-entry').addEventListener('submit', (e) => {
            e.preventDefault();
            const date = document.getElementById('weight-date').value;
            const weight = Number(document.getElementById('weight-value').value);
            const note = document.getElementById('weight-note').value;

            if (date && weight) {
                StorageManager.saveWeightLog({
                    id: Date.now().toString(),
                    date,
                    weight,
                    note
                });
                document.getElementById('weight-value').value = '';
                document.getElementById('weight-note').value = '';
                this.renderWeightTab();
            }
        });

        // BMR/TDEE Calculator Form Apply
        document.getElementById('calculator-form').addEventListener('input', () => {
            this.updateBMRCalculator();
        });

        document.getElementById('btn-apply-calculated-goals').addEventListener('click', () => {
            const targetKcal = Number(document.getElementById('calc-target-result').textContent.replace(/[^0-9]/g, ''));
            if (targetKcal > 0) {
                // Apply standard 30% Protein, 45% Carbs, 25% Fat
                const protein = Math.round((targetKcal * 0.30) / 4);
                const carbs = Math.round((targetKcal * 0.45) / 4);
                const fats = Math.round((targetKcal * 0.25) / 9);

                const newGoals = {
                    ...StorageManager.getGoals(),
                    calories: targetKcal,
                    protein,
                    carbs,
                    fats
                };
                StorageManager.saveGoals(newGoals);
                this.renderAll();
                alert(`Updated goals applied: ${targetKcal} kcal (${protein}g Protein, ${carbs}g Carbs, ${fats}g Fat)`);
            }
        });

        // Custom Goals Form Submit
        document.getElementById('form-goals-editor').addEventListener('submit', (e) => {
            e.preventDefault();
            const calories = Number(document.getElementById('goal-calories').value);
            const protein = Number(document.getElementById('goal-protein').value);
            const carbs = Number(document.getElementById('goal-carbs').value);
            const fats = Number(document.getElementById('goal-fats').value);
            const water = Number(document.getElementById('goal-water').value);

            StorageManager.saveGoals({ calories, protein, carbs, fats, water });
            this.renderAll();
            alert('Custom nutrient targets saved successfully!');
        });

        // Data Management Backup Buttons
        document.getElementById('btn-export-json').addEventListener('click', () => {
            StorageManager.exportBackupJSON();
        });

        document.getElementById('input-import-json').addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const success = StorageManager.importBackupJSON(event.target.result);
                    if (success) {
                        alert('Data successfully imported!');
                        this.renderAll();
                    } else {
                        alert('Error importing JSON. Please check file format.');
                    }
                };
                reader.readAsText(file);
            }
        });

        document.getElementById('btn-clear-all-data').addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all calorie, food, and weight records? This action cannot be undone.')) {
                StorageManager.clearAll();
                this.renderAll();
            }
        });

        // Theme Toggle
        this.themeToggleBtn.addEventListener('click', () => this.toggleTheme());
    }

    applyTheme(theme) {
        this.theme = theme;
        document.body.classList.toggle('light-theme', theme === 'light');
        localStorage.setItem(STORAGE_KEYS.THEME, theme);

        // Redraw canvases so chart colors match the active theme
        if (this.activeTab === 'analytics') this.renderAnalyticsTab();
        if (this.activeTab === 'weight') this.renderWeightTab();
    }

    toggleTheme() {
        this.applyTheme(this.theme === 'light' ? 'dark' : 'light');
    }

    changeDate(offsetDays) {
        const d = new Date(this.selectedDate + 'T00:00:00');
        d.setDate(d.getDate() + offsetDays);
        this.selectedDate = d.toISOString().slice(0, 10);
        this.datePicker.value = this.selectedDate;
        this.updateDateDisplay();
        this.renderAll();
    }

    updateDateDisplay() {
        const todayStr = new Date().toISOString().slice(0, 10);
        const dObj = new Date(this.selectedDate + 'T00:00:00');
        const formatted = dObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

        if (this.selectedDate === todayStr) {
            this.currentDateLabel.textContent = `Today, ${formatted}`;
        } else {
            const dayName = dObj.toLocaleDateString('en-US', { weekday: 'short' });
            this.currentDateLabel.textContent = `${dayName}, ${formatted}`;
        }
    }

    switchTab(tabName) {
        this.activeTab = tabName;
        this.navTabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tabName));
        this.tabContents.forEach(c => c.classList.toggle('active', c.id === `tab-${tabName}`));

        if (tabName === 'analytics') this.renderAnalyticsTab();
        if (tabName === 'weight') this.renderWeightTab();
        if (tabName === 'settings') this.renderSettingsTab();
    }

    renderAll() {
        this.renderDashboard();
        if (this.activeTab === 'analytics') this.renderAnalyticsTab();
        if (this.activeTab === 'weight') this.renderWeightTab();
        if (this.activeTab === 'settings') this.renderSettingsTab();
    }

    renderDashboard() {
        const goals = StorageManager.getGoals();
        const logs = StorageManager.getLogs(this.selectedDate);

        // Calculate totals across breakfast, lunch, dinner, snacks
        let totalEaten = 0;
        let totalProtein = 0;
        let totalCarbs = 0;
        let totalFats = 0;

        const meals = ['breakfast', 'lunch', 'dinner', 'snacks'];
        meals.forEach(meal => {
            const list = logs[meal] || [];
            let mealKcal = 0;
            list.forEach(item => {
                mealKcal += item.kcal;
                totalEaten += item.kcal;
                totalProtein += item.protein;
                totalCarbs += item.carbs;
                totalFats += item.fats;
            });
            document.getElementById(`kcal-${meal}`).textContent = Math.round(mealKcal);
            this.renderMealListUI(meal, list);
        });

        const burned = logs.burned || 0;
        const netEaten = totalEaten - burned;
        const remaining = goals.calories - netEaten;

        // Overview Numbers
        document.getElementById('overview-remaining-val').textContent = Math.round(remaining).toLocaleString();
        document.getElementById('overview-goal-val').textContent = goals.calories.toLocaleString();
        document.getElementById('overview-eaten-val').textContent = Math.round(totalEaten).toLocaleString();
        document.getElementById('overview-burned-val').textContent = Math.round(burned).toLocaleString();
        document.getElementById('exercise-burned-display').textContent = Math.round(burned).toLocaleString();

        // SVG Ring Offset
        const ringCircle = document.getElementById('calorie-ring-bar');
        const circumference = 565.48; // 2 * pi * 90
        const progressPct = Math.min(Math.max(netEaten / goals.calories, 0), 1);
        const offset = circumference - (progressPct * circumference);
        ringCircle.style.strokeDashoffset = offset;

        // Macro Bars & Values
        document.getElementById('macro-protein-eaten').textContent = `${Math.round(totalProtein)}g`;
        document.getElementById('macro-protein-goal').textContent = `${goals.protein}g`;
        document.getElementById('macro-protein-bar').style.width = `${Math.min((totalProtein / goals.protein) * 100, 100)}%`;

        document.getElementById('macro-carbs-eaten').textContent = `${Math.round(totalCarbs)}g`;
        document.getElementById('macro-carbs-goal').textContent = `${goals.carbs}g`;
        document.getElementById('macro-carbs-bar').style.width = `${Math.min((totalCarbs / goals.carbs) * 100, 100)}%`;

        document.getElementById('macro-fats-eaten').textContent = `${Math.round(totalFats)}g`;
        document.getElementById('macro-fats-goal').textContent = `${goals.fats}g`;
        document.getElementById('macro-fats-bar').style.width = `${Math.min((totalFats / goals.fats) * 100, 100)}%`;

        // Macro Percentage Calculation
        const totalMacroKcal = (totalProtein * 4) + (totalCarbs * 4) + (totalFats * 9);
        if (totalMacroKcal > 0) {
            document.getElementById('protein-pct').textContent = `${Math.round(((totalProtein * 4) / totalMacroKcal) * 100)}%`;
            document.getElementById('carbs-pct').textContent = `${Math.round(((totalCarbs * 4) / totalMacroKcal) * 100)}%`;
            document.getElementById('fats-pct').textContent = `${Math.round(((totalFats * 9) / totalMacroKcal) * 100)}%`;
        } else {
            document.getElementById('protein-pct').textContent = `30%`;
            document.getElementById('carbs-pct').textContent = `45%`;
            document.getElementById('fats-pct').textContent = `25%`;
        }

        // Water Progress
        const waterLogged = logs.water || 0;
        document.getElementById('water-current-val').textContent = waterLogged;
        document.getElementById('water-target-val').textContent = goals.water;
        const waterPct = Math.min((waterLogged / goals.water) * 100, 100);
        document.getElementById('water-progress-bar').style.width = `${waterPct}%`;
    }

    renderMealListUI(meal, foodList) {
        const container = document.getElementById(`list-${meal}`);
        if (!foodList || foodList.length === 0) {
            container.innerHTML = `<div class="empty-meal-placeholder">No foods logged yet for ${meal}</div>`;
            return;
        }

        container.innerHTML = foodList.map((item, index) => `
            <div class="food-item-row">
                <div class="food-item-main">
                    <span class="food-item-name">${this.escapeHTML(item.name)}</span>
                    <span class="food-item-sub">${item.amount}${item.unit} • P: ${Math.round(item.protein)}g | C: ${Math.round(item.carbs)}g | F: ${Math.round(item.fats)}g</span>
                </div>
                <div class="food-item-right">
                    <span class="food-item-kcal">${Math.round(item.kcal)} kcal</span>
                    <button class="delete-food-btn" data-meal="${meal}" data-index="${index}" title="Remove Item">&times;</button>
                </div>
            </div>
        `).join('');

        // Bind delete listeners
        container.querySelectorAll('.delete-food-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const m = e.currentTarget.dataset.meal;
                const idx = Number(e.currentTarget.dataset.index);
                this.deleteFoodItem(m, idx);
            });
        });
    }

    deleteFoodItem(meal, index) {
        const logs = StorageManager.getLogs(this.selectedDate);
        if (logs[meal] && logs[meal][index]) {
            logs[meal].splice(index, 1);
            StorageManager.saveLogs(this.selectedDate, logs);
            this.renderDashboard();
        }
    }

    addWater(amount) {
        const logs = StorageManager.getLogs(this.selectedDate);
        logs.water = (logs.water || 0) + amount;
        StorageManager.saveLogs(this.selectedDate, logs);
        this.renderDashboard();
    }

    resetWater() {
        const logs = StorageManager.getLogs(this.selectedDate);
        logs.water = 0;
        StorageManager.saveLogs(this.selectedDate, logs);
        this.renderDashboard();
    }

    // Modal Operations
    openAddFoodModal(meal) {
        this.selMealTypeSelect.value = meal;
        this.foodSearchInput.value = '';
        this.selectedFoodForAdd = null;
        this.selectedFoodPanel.classList.add('hidden');
        this.switchModalSubtab('preset-search');
        this.renderSearchResults();
        this.addFoodModal.showModal();
    }

    switchModalSubtab(subtabName) {
        this.modalSubtabs.forEach(t => t.classList.toggle('active', t.dataset.modaltab === subtabName));
        document.getElementById('subtab-preset-search').classList.toggle('active', subtabName === 'preset-search');
        document.getElementById('subtab-custom-create').classList.toggle('active', subtabName === 'custom-create');
    }

    renderSearchResults() {
        const query = this.foodSearchInput.value.toLowerCase().trim();
        const customFoods = StorageManager.getCustomFoods();
        const allAvailable = [...PRESET_FOODS, ...customFoods];

        const filtered = allAvailable.filter(f => f.name.toLowerCase().includes(query));

        if (filtered.length === 0) {
            this.searchResultsList.innerHTML = `<div class="empty-meal-placeholder">No matching foods found. Create a custom food item!</div>`;
            return;
        }

        this.searchResultsList.innerHTML = filtered.map(item => `
            <div class="preset-item" data-id="${item.id}">
                <div>
                    <div class="preset-name">${this.escapeHTML(item.name)}</div>
                    <div class="preset-sub">P: ${item.per100g.protein}g | C: ${item.per100g.carbs}g | F: ${item.per100g.fats}g</div>
                </div>
                <span class="header-badge">${item.per100g.kcal} kcal/100g</span>
            </div>
        `).join('');

        this.searchResultsList.querySelectorAll('.preset-item').forEach(el => {
            el.addEventListener('click', () => {
                const id = el.dataset.id;
                this.searchResultsList.querySelectorAll('.preset-item').forEach(i => i.classList.remove('selected'));
                el.classList.add('selected');
                this.selectFoodForLogging(allAvailable.find(f => f.id === id));
            });
        });
    }

    selectFoodForLogging(foodObj) {
        if (!foodObj) return;
        this.selectedFoodForAdd = foodObj;
        document.getElementById('sel-food-name').textContent = foodObj.name;
        document.getElementById('sel-food-per-100g').textContent = `${foodObj.per100g.kcal} kcal per 100g`;
        this.selFoodAmountInput.value = 100;
        this.selectedFoodPanel.classList.remove('hidden');
        this.updateSelectedFoodPreview();
    }

    updateSelectedFoodPreview() {
        if (!this.selectedFoodForAdd) return;
        const amount = Number(this.selFoodAmountInput.value) || 0;
        const factor = amount / 100;
        const per = this.selectedFoodForAdd.per100g;

        document.getElementById('calc-food-kcal').textContent = `${Math.round(per.kcal * factor)} kcal`;
        document.getElementById('calc-food-protein').textContent = `${(per.protein * factor).toFixed(1)}g`;
        document.getElementById('calc-food-carbs').textContent = `${(per.carbs * factor).toFixed(1)}g`;
        document.getElementById('calc-food-fats').textContent = `${(per.fats * factor).toFixed(1)}g`;
    }

    addFoodToCurrentLog() {
        if (!this.selectedFoodForAdd) return;
        const amount = Number(this.selFoodAmountInput.value) || 100;
        const meal = this.selMealTypeSelect.value;
        const factor = amount / 100;
        const per = this.selectedFoodForAdd.per100g;

        const logItem = {
            id: Date.now().toString(),
            name: this.selectedFoodForAdd.name,
            amount: amount,
            unit: 'g',
            kcal: Math.round(per.kcal * factor),
            protein: Number((per.protein * factor).toFixed(1)),
            carbs: Number((per.carbs * factor).toFixed(1)),
            fats: Number((per.fats * factor).toFixed(1))
        };

        const logs = StorageManager.getLogs(this.selectedDate);
        if (!logs[meal]) logs[meal] = [];
        logs[meal].push(logItem);
        StorageManager.saveLogs(this.selectedDate, logs);

        this.addFoodModal.close();
        this.renderDashboard();
    }

    handleCreateCustomFood() {
        const name = document.getElementById('new-food-name').value.trim();
        const serving = document.getElementById('new-food-serving').value.trim();
        const calories = Number(document.getElementById('new-food-calories').value);
        const protein = Number(document.getElementById('new-food-protein').value);
        const carbs = Number(document.getElementById('new-food-carbs').value);
        const fats = Number(document.getElementById('new-food-fats').value);

        if (name && calories >= 0) {
            const customItem = {
                id: 'c_' + Date.now(),
                name,
                serving,
                per100g: {
                    kcal: calories,
                    protein,
                    carbs,
                    fats
                }
            };
            StorageManager.saveCustomFood(customItem);
            document.getElementById('form-create-custom-food').reset();
            alert('Custom food created!');
            this.switchModalSubtab('preset-search');
            this.renderSearchResults();
            this.renderSettingsTab();
        }
    }

    // Analytics Tab
    renderAnalyticsTab() {
        const goals = StorageManager.getGoals();
        const logsMap = StorageManager.getAllLogs();

        // 7-day canvas
        const trendCanvas = document.getElementById('chart-calorie-trend');
        ChartRenderer.render7DayTrend(trendCanvas, logsMap, goals);

        // 7-day avg macro donut
        let totalP = 0, totalC = 0, totalF = 0, totalWater = 0;
        let count = 0;
        let maxKcal = 0;
        let metGoals = 0;

        const dates = [];
        const today = new Date();
        for (let i = 6; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(today.getDate() - i);
            dates.push(d.toISOString().slice(0, 10));
        }

        dates.forEach(d => {
            const log = logsMap[d];
            if (log) {
                count++;
                let dayKcal = 0;
                ['breakfast', 'lunch', 'dinner', 'snacks'].forEach(m => {
                    (log[m] || []).forEach(item => {
                        dayKcal += item.kcal;
                        totalP += item.protein;
                        totalC += item.carbs;
                        totalF += item.fats;
                    });
                });
                totalWater += (log.water || 0);
                if (dayKcal > maxKcal) maxKcal = dayKcal;
                if (Math.abs(dayKcal - goals.calories) <= 200) metGoals++;
            }
        });

        const donutCanvas = document.getElementById('chart-macro-donut');
        ChartRenderer.renderMacroDonut(donutCanvas, totalP, totalC, totalF);

        // Highlight Cards
        const totalLoggedDays = count || 1;
        const avgKcal = Math.round(((totalP * 4) + (totalC * 4) + (totalF * 9)) / totalLoggedDays);
        document.getElementById('stat-avg-calories').textContent = `${avgKcal} kcal`;
        document.getElementById('stat-max-calories').textContent = `${Math.round(maxKcal)} kcal`;
        document.getElementById('stat-goal-adherence').textContent = `${Math.round((metGoals / 7) * 100)}%`;
        document.getElementById('stat-total-water').textContent = `${(totalWater / 1000).toFixed(1)} Liters`;
    }

    // Weight Tab
    renderWeightTab() {
        document.getElementById('weight-date').value = this.selectedDate;
        const logs = StorageManager.getWeightLogs();

        const canvas = document.getElementById('chart-weight-trend');
        ChartRenderer.renderWeightTrend(canvas, logs);

        const tbody = document.getElementById('table-weight-body');
        if (logs.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5" class="empty-cell">No weight entries recorded yet.</td></tr>`;
            return;
        }

        tbody.innerHTML = logs.map((item, idx) => {
            let diffStr = '--';
            if (idx > 0) {
                const diff = (item.weight - logs[idx - 1].weight).toFixed(1);
                diffStr = diff > 0 ? `+${diff} kg` : `${diff} kg`;
            }
            return `
                <tr>
                    <td><strong>${item.date}</strong></td>
                    <td>${item.weight} kg</td>
                    <td class="${diffStr.startsWith('+') ? 'text-orange' : 'text-emerald'}">${diffStr}</td>
                    <td>${this.escapeHTML(item.note || '-')}</td>
                    <td><button class="delete-food-btn" data-weightid="${item.id}">&times;</button></td>
                </tr>
            `;
        }).join('');

        tbody.querySelectorAll('.delete-food-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.dataset.weightid;
                StorageManager.deleteWeightLog(id);
                this.renderWeightTab();
            });
        });
    }

    // Settings Tab
    renderSettingsTab() {
        const goals = StorageManager.getGoals();
        document.getElementById('goal-calories').value = goals.calories;
        document.getElementById('goal-protein').value = goals.protein;
        document.getElementById('goal-carbs').value = goals.carbs;
        document.getElementById('goal-fats').value = goals.fats;
        document.getElementById('goal-water').value = goals.water;

        this.updateBMRCalculator();
        this.renderCustomFoodLibraryTable();
    }

    updateBMRCalculator() {
        const gender = document.getElementById('calc-gender').value;
        const age = Number(document.getElementById('calc-age').value) || 25;
        const height = Number(document.getElementById('calc-height').value) || 175;
        const weight = Number(document.getElementById('calc-weight').value) || 70;
        const activity = Number(document.getElementById('calc-activity').value) || 1.375;
        const goalOffset = Number(document.getElementById('calc-goal').value) || 0;

        // Mifflin-St Jeor Equation
        let bmr = (10 * weight) + (6.25 * height) - (5 * age);
        bmr = gender === 'male' ? bmr + 5 : bmr - 161;

        const tdee = Math.round(bmr * activity);
        const target = Math.max(tdee + goalOffset, 1200);

        document.getElementById('calc-bmr-result').textContent = `${Math.round(bmr)} kcal`;
        document.getElementById('calc-tdee-result').textContent = `${tdee} kcal`;
        document.getElementById('calc-target-result').textContent = `${target} kcal`;
    }

    renderCustomFoodLibraryTable() {
        const customFoods = StorageManager.getCustomFoods();
        const tbody = document.getElementById('table-custom-foods-body');

        if (customFoods.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" class="empty-cell">No custom foods created yet. Click above to create your first recipe/item.</td></tr>`;
            return;
        }

        tbody.innerHTML = customFoods.map(item => `
            <tr>
                <td><strong>${this.escapeHTML(item.name)}</strong></td>
                <td>${item.serving || '100g'}</td>
                <td class="text-emerald"><strong>${item.per100g.kcal} kcal</strong></td>
                <td>${item.per100g.protein}g</td>
                <td>${item.per100g.carbs}g</td>
                <td>${item.per100g.fats}g</td>
                <td><button class="delete-food-btn" data-custid="${item.id}">&times;</button></td>
            </tr>
        `).join('');

        tbody.querySelectorAll('.delete-food-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.dataset.custid;
                StorageManager.deleteCustomFood(id);
                this.renderCustomFoodLibraryTable();
            });
        });
    }

    escapeHTML(str) {
        if (!str) return '';
        return str.replace(/[&<>"']/g, match => {
            const escapeMap = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
            return escapeMap[match];
        });
    }
}

// Initialize Application when DOM ready
document.addEventListener('DOMContentLoaded', () => {
    window.nutriApp = new CalorieApp();
});
