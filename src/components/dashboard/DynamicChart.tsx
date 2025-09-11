"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Calendar, TrendingUp, Phone, Clock, DollarSign } from 'lucide-react';

interface ChartData {
  date: string;
  calls: number;
  cost: number;
  duration: number;
  displayDate: string;
  timestamp: number;
}

interface MetricData {
  name: string;
  value: number;
  color: string;
}

type ChartType = 'line' | 'area' | 'bar';
type DataSource = 'calls' | 'cost' | 'duration';
type TimeRange = '7d' | '30d' | '90d';

// Enhanced data generation with realistic patterns
const generateRealTimeData = (timeRange: TimeRange): ChartData[] => {
  const now = new Date();
  const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
  const data: ChartData[] = [];
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Create realistic patterns
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const baseCallsMultiplier = isWeekend ? 0.3 : 1;
    
    // Add some seasonality and randomness
    const seasonality = Math.sin((i / days) * Math.PI * 2) * 0.3 + 1;
    const randomFactor = Math.random() * 0.5 + 0.75;
    
    const calls = Math.floor(
      (5 + Math.random() * 15) * baseCallsMultiplier * seasonality * randomFactor
    );
    
    const avgDuration = 60 + Math.random() * 120; // 1-3 minutes average
    const cost = calls * (500 + Math.random() * 200); // 500-700 credits per call
    
    data.push({
      date: date.toISOString().split('T')[0],
      calls,
      cost,
      duration: avgDuration,
      displayDate: date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: '2-digit' 
      }),
      timestamp: date.getTime()
    });
  }
  
  return data;
};

export default function DynamicChart() {
  const [data, setData] = useState<ChartData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [chartType, setChartType] = useState<ChartType>('line');
  const [dataSource, setDataSource] = useState<DataSource>('calls');
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [isRealTime, setIsRealTime] = useState(true);

  // Pie chart data for distribution
  const pieData: MetricData[] = [
    { name: 'Support Calls', value: 45, color: '#3B82F6' },
    { name: 'Sales Calls', value: 30, color: '#10B981' },
    { name: 'Follow-ups', value: 25, color: '#F59E0B' }
  ];

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      try {
        const chartData = generateRealTimeData(timeRange);
        setData(chartData);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();

    // Real-time updates
    let interval: NodeJS.Timeout;
    if (isRealTime) {
      interval = setInterval(() => {
        loadData();
      }, 15000); // Update every 15 seconds
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timeRange, isRealTime]);

  const CustomTooltip = ({ active, payload, label }: {
    active?: boolean;
    payload?: Array<{
      payload: ChartData;
      value: number;
    }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <p className="text-sm font-medium mb-2">{label}</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-3 w-3 text-blue-600" />
              <span>Calls: {data.calls}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-3 w-3 text-green-600" />
              <span>Avg Duration: {data.duration.toFixed(0)}s</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <DollarSign className="h-3 w-3 text-orange-600" />
              <span>Cost: {data.cost.toLocaleString()} credits</span>
            </div>
          </div>
        </motion.div>
      );
    }
    return null;
  };

  const getDataKey = (): string => {
    switch (dataSource) {
      case 'calls': return 'calls';
      case 'cost': return 'cost';
      case 'duration': return 'duration';
      default: return 'calls';
    }
  };

  const getColor = (): string => {
    switch (dataSource) {
      case 'calls': return '#3B82F6';
      case 'cost': return '#F59E0B';
      case 'duration': return '#10B981';
      default: return '#3B82F6';
    }
  };

  const renderChart = () => {
    const dataKey = getDataKey();
    const color = getColor();

    const commonProps = {
      data,
      margin: { top: 20, right: 30, left: 20, bottom: 20 }
    };

    switch (chartType) {
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
            <XAxis 
              dataKey="displayDate" 
              className="text-xs text-gray-600 dark:text-gray-400"
              tick={{ fontSize: 10 }}
            />
            <YAxis 
              className="text-xs text-gray-600 dark:text-gray-400"
              tick={{ fontSize: 10 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              fill={color}
              fillOpacity={0.3}
              strokeWidth={2}
            />
          </AreaChart>
        );
      
      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
            <XAxis 
              dataKey="displayDate" 
              className="text-xs text-gray-600 dark:text-gray-400"
              tick={{ fontSize: 10 }}
            />
            <YAxis 
              className="text-xs text-gray-600 dark:text-gray-400"
              tick={{ fontSize: 10 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey={dataKey}
              fill={color}
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        );
      
      default:
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
            <XAxis 
              dataKey="displayDate" 
              className="text-xs text-gray-600 dark:text-gray-400"
              tick={{ fontSize: 10 }}
            />
            <YAxis 
              className="text-xs text-gray-600 dark:text-gray-400"
              tick={{ fontSize: 10 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              dot={{ fill: color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
            />
          </LineChart>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="h-64 sm:h-80 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-8 w-8 border-2 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      {/* Chart Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Analytics Dashboard</h3>
          <AnimatePresence>
            {isRealTime && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400"
              >
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                Live
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Time Range */}
          <div className="flex border rounded-md dark:border-gray-700">
            {(['7d', '30d', '90d'] as TimeRange[]).map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? "default" : "ghost"}
                size="sm"
                onClick={() => setTimeRange(range)}
                className="text-xs px-3"
              >
                {range}
              </Button>
            ))}
          </div>

          {/* Data Source */}
          <div className="flex border rounded-md dark:border-gray-700">
            {([
              { key: 'calls', label: 'Calls', icon: Phone },
              { key: 'cost', label: 'Cost', icon: DollarSign },
              { key: 'duration', label: 'Duration', icon: Clock }
            ] as const).map(({ key, label, icon: Icon }) => (
              <Button
                key={key}
                variant={dataSource === key ? "default" : "ghost"}
                size="sm"
                onClick={() => setDataSource(key)}
                className="text-xs px-3 flex items-center gap-1"
              >
                <Icon className="h-3 w-3" />
                {label}
              </Button>
            ))}
          </div>

          {/* Chart Type */}
          <div className="flex border rounded-md dark:border-gray-700">
            {(['line', 'area', 'bar'] as ChartType[]).map((type) => (
              <Button
                key={type}
                variant={chartType === type ? "default" : "ghost"}
                size="sm"
                onClick={() => setChartType(type)}
                className="text-xs px-3 capitalize"
              >
                {type}
              </Button>
            ))}
          </div>

          {/* Real-time Toggle */}
          <Button
            variant={isRealTime ? "default" : "outline"}
            size="sm"
            onClick={() => setIsRealTime(!isRealTime)}
            className="text-xs px-3"
          >
            {isRealTime ? 'Live' : 'Static'}
          </Button>
        </div>
      </div>

      {/* Main Chart */}
      <motion.div
        key={`${chartType}-${dataSource}-${timeRange}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="h-64 sm:h-80 w-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </motion.div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800"
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium">Total Calls</span>
          </div>
          <div className="text-2xl font-bold">
            {data.reduce((sum, item) => sum + item.calls, 0)}
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800"
        >
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium">Avg Duration</span>
          </div>
          <div className="text-2xl font-bold">
            {Math.round(data.reduce((sum, item) => sum + item.duration, 0) / data.length)}s
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800"
        >
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-4 w-4 text-orange-600" />
            <span className="text-sm font-medium">Total Cost</span>
          </div>
          <div className="text-2xl font-bold">
            {Math.round(data.reduce((sum, item) => sum + item.cost, 0)).toLocaleString()}
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800"
        >
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium">Period</span>
          </div>
          <div className="text-2xl font-bold capitalize">
            {timeRange}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}