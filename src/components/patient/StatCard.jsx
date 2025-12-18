import React from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, unit, status, isPrimary, chartColor, data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative p-5 rounded-[24px] overflow-hidden h-40 flex flex-col justify-between transition-all hover:shadow-lg ${
        isPrimary 
          ? 'bg-gradient-to-r from-blue-700 to-blue-600 text-white shadow-xl shadow-blue-200' 
          : 'bg-white text-gray-800 shadow-sm border border-gray-100'
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-start">
        <h3 className={`text-sm font-medium ${isPrimary ? 'text-blue-100' : 'text-gray-500'}`}>{title}</h3>
        {/* Icon Placeholder */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isPrimary ? 'bg-white/20' : 'bg-gray-50'}`}>
           {isPrimary ? '❤️' : '⚡'} 
        </div>
      </div>

      {/* Content & Chart Row */}
      <div className="flex items-end justify-between mt-2">
        <div>
          <div className="flex items-baseline gap-1">
            <h2 className="text-2xl font-bold">{value}</h2>
            <span className={`text-xs ${isPrimary ? 'text-blue-200' : 'text-gray-400'}`}>{unit}</span>
          </div>
          <span className={`text-[10px] px-2 py-1 rounded-full mt-2 inline-block ${
             isPrimary ? 'bg-white/20 text-white' : 
             status === 'Low' ? 'bg-red-100 text-red-500' : 'bg-green-100 text-green-600'
          }`}>
            {status}
          </span>
        </div>

        {/* Mini Wave Chart */}
        <div className="w-24 h-12">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id={`g-${title}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartColor} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={chartColor} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="uv" stroke={chartColor} strokeWidth={2} fillOpacity={1} fill={`url(#g-${title})`} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;