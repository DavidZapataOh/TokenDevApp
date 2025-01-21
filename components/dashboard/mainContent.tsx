'use client';

import { FireIcon, UserGroupIcon, CurrencyDollarIcon, ChartBarIcon, PhotoIcon, GiftIcon, BanknotesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { LineChart, Line, ResponsiveContainer } from 'recharts';

// Estilos globales para el scrollbar
const scrollbarStyles = `
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #191538;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: #B72C7A;
    border-radius: 4px;
    transition: all 0.3s ease;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #531354;
  }
`;

// Agregar los estilos al documento
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = scrollbarStyles;
  document.head.appendChild(style);
}

const statsCards = [
  { title: "Active Tokens", value: "3 tokens", icon: <FireIcon className="w-8 h-8" /> },
  { title: "Total Value Locked", value: "$12,450", icon: <CurrencyDollarIcon className="w-8 h-8" /> },
  { title: "Total Holders", value: "1,234", icon: <UserGroupIcon className="w-8 h-8" /> },
  { title: "Total Transactions", value: "5,678", icon: <ChartBarIcon className="w-8 h-8" /> }
];

const tokenOverviewData = [
  { name: "ERC-20 Tokens", count: 2, status: "Active" },
  { name: "ERC-721 Tokens", count: 1, status: "Active" },
  { name: "ERC-1155 Tokens", count: 0, status: "None" },
  { name: "Governance Tokens", count: 1, status: "Pending" },
  { name: "Liquidity Pools", count: 2, status: "Active" },
  { name: "Token Locks", count: 3, status: "Active" },
  { name: "Token Vesting", count: 1, status: "Active" },
  { name: "Token Airdrops", count: 2, status: "Scheduled" },
  { name: "Token Sales", count: 1, status: "Active" },
  { name: "Token Staking", count: 0, status: "None" }
];

const tokenPerformanceData = [
  {
    name: "TOKENDEV Token",
    price: "$1.80",
    change: "+12.5%",
    marketCap: "$180,000",
    volume: "$35,000",
    liquidity: "$95,000",
    holders: "1,234",
    trend: [1.2, 1.4, 1.3, 1.6, 1.8],
    status: "Active",
    network: "Ethereum"
  },
  {
    name: "GameFi Token",
    price: "$0.45",
    change: "-3.2%",
    marketCap: "$45,000",
    volume: "$12,000",
    liquidity: "$25,000",
    holders: "456",
    trend: [0.5, 0.48, 0.46, 0.43, 0.45],
    status: "Active",
    network: "BSC"
  },
  {
    name: "DeFi Token",
    price: "$2.30",
    change: "+5.8%",
    marketCap: "$230,000",
    volume: "$48,000",
    liquidity: "$120,000",
    holders: "892",
    trend: [2.1, 2.2, 2.15, 2.25, 2.3],
    status: "Active",
    network: "Polygon"
  }
];

const recentActivity = [
  {
    action: "Token Created",
    token: "GameFi Token",
    network: "BSC",
    time: "2 hours ago"
  },
  {
    action: "Liquidity Added",
    token: "TOKENDEV Token",
    network: "Ethereum",
    time: "5 hours ago"
  },
  {
    action: "Token Deployed",
    token: "DeFi Token",
    network: "Polygon",
    time: "1 day ago"
  },
  {
    action: "Parameters Updated",
    token: "GameFi Token",
    network: "BSC",
    time: "2 days ago"
  }
];

const quickActions = [
  {
    title: "Create Token",
    description: "Launch your own token",
    icon: <CurrencyDollarIcon className="w-6 h-6" />,
    path: "/token-creator"
  },
  {
    title: "Generate NFT",
    description: "Create NFT collection",
    icon: <PhotoIcon className="w-6 h-6" />,
    path: "/nft-generator"
  },
  {
    title: "Start Airdrop",
    description: "Distribute tokens",
    icon: <GiftIcon className="w-6 h-6" />,
    path: "/airdrop"
  },
  {
    title: "Add Liquidity",
    description: "Create trading pair",
    icon: <BanknotesIcon className="w-6 h-6" />,
    path: "/liquidity"
  }
];

export default function MainContent() {

  return (
    <div className="pr-6 pb-6 ml-64 bg-thirty min-h-screen overflow-y-auto">
      <style jsx global>{scrollbarStyles}</style>
      <div className="rounded-2xl bg-dark p-4" >
        <div className="grid grid-cols-4 gap-4 mb-4">
          {statsCards.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-thirty p-6 rounded-xl border border-secundary relative"
            >
              <div className="absolute top-6 right-6 p-4 bg-primary rounded-lg">
                <div className="text-thirty">
                  {stat.icon}
                </div>
              </div>
              <div className="pr-20">
                <p className="text-textSecondary text-sm mb-2">{stat.title}</p>
                <p className="text-light text-2xl font-bold">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-thirty p-6 rounded-xl border border-secundary mb-4"
        >
          <h2 className="text-light text-xl font-bold mb-6">Token Overview</h2>
          <div className="grid grid-cols-5 gap-4">
            {tokenOverviewData.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col space-y-2 p-4 rounded-lg ${
                  item.status === 'Active' ? 'bg-primary/20' : 
                  item.status === 'Pending' ? 'bg-yellow-500/20' : 
                  item.status === 'Scheduled' ? 'bg-blue-500/20' : 'bg-dark'
                }`}
              >
                <span className="text-textSecondary text-sm">{item.name}</span>
                <div className="flex justify-between items-center">
                  <span className="text-light text-xl font-bold">{item.count}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.status === 'Active' ? 'bg-primary/40 text-primary' : 
                    item.status === 'Pending' ? 'bg-yellow-500/40 text-yellow-500' : 
                    item.status === 'Scheduled' ? 'bg-blue-500/40 text-blue-500' : 
                    'bg-dark text-textSecondary'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-thirty p-6 rounded-xl border border-secundary"
          >
            <h2 className="text-light text-xl font-bold mb-6">Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="bg-dark p-4 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold">{activity.token[0]}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-light">{activity.action}</span>
                      <span className="text-textSecondary">•</span>
                      <span className="text-textSecondary">{activity.token}</span>
                    </div>
                    <span className="text-textSecondary text-sm">{activity.network}</span>
                  </div>
                </div>
                <span className="text-textSecondary text-sm">{activity.time}</span>
              </div>
            ))}
          </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-thirty p-6 rounded-xl border border-secundary"
          >
            <h2 className="text-light text-xl font-bold mb-6">Challenges</h2>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => window.location.href = action.path}
                  className="bg-dark p-4 rounded-lg hover:bg-primary/20 transition-colors text-left"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-primary/20 rounded-lg">
                      <span className="text-primary">{action.icon}</span>
                    </div>
                    <span className="text-light font-medium">{action.title}</span>
                  </div>
                  <p className="text-textSecondary text-sm">{action.description}</p>
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-thirty p-6 rounded-xl border border-secundary"
        >
          <h2 className="text-light text-xl font-bold mb-6">Your Tokens Performance</h2>
          <div className="space-y-4">
            {tokenPerformanceData.map((token, index) => (
              <div key={index} className="bg-dark p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-bold">{token.name[0]}</span>
                    </div>
                    <div>
                      <h3 className="text-light font-semibold">{token.name}</h3>
                      <span className="text-textSecondary text-sm">{token.network}</span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    token.status === 'Active' ? 'bg-primary/20 text-primary' : 
                    'bg-yellow-500/20 text-yellow-500'
                  }`}>
                    {token.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-5 gap-4 mb-4">
                  <div>
                    <span className="text-textSecondary text-sm">Price</span>
                    <div className="flex items-center gap-2">
                      <span className="text-light font-bold">{token.price}</span>
                      <span className={`text-sm ${
                        token.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {token.change}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-textSecondary text-sm">Market Cap</span>
                    <p className="text-light font-bold">{token.marketCap}</p>
                  </div>
                  <div>
                    <span className="text-textSecondary text-sm">Volume 24h</span>
                    <p className="text-light font-bold">{token.volume}</p>
                  </div>
                  <div>
                    <span className="text-textSecondary text-sm">Liquidity</span>
                    <p className="text-light font-bold">{token.liquidity}</p>
                  </div>
                  <div>
                    <span className="text-textSecondary text-sm">Holders</span>
                    <p className="text-light font-bold">{token.holders}</p>
                  </div>
                </div>

                <div className="h-16">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={token.trend.map((value, i) => ({ value }))}>
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={token.change.startsWith('+') ? '#10B981' : '#EF4444'}
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}