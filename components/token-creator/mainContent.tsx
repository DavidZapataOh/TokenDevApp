'use client';

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudArrowUpIcon,
  KeyIcon,
  NoSymbolIcon,
  UsersIcon,
  UserCircleIcon,
  FireIcon,
  StopIcon,
  PlusCircleIcon,
  PauseIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  UserPlusIcon,
  BanknotesIcon,
  CurrencyDollarIcon,
  ArrowPathIcon,
  WalletIcon,
  ChartBarIcon,
  ArrowsRightLeftIcon,
  BuildingLibraryIcon,
  LockClosedIcon,
  ArrowPathRoundedSquareIcon,
  CodeBracketIcon,
  RocketLaunchIcon,
  ClockIcon,
  GlobeAltIcon,
  PresentationChartLineIcon,
  HashtagIcon,
} from "@heroicons/react/24/solid";

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

// Add styles to document
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = scrollbarStyles;
  document.head.appendChild(style);
}

const chains = [
  { name: "Ethereum", logo: "/chains/ethereum.svg" },
  { name: "BSC", logo: "/chains/bsc.svg" },
  { name: "Polygon", logo: "/chains/polygon.svg" },
  { name: "Arbitrum", logo: "/chains/arbitrum.svg" },
  { name: "Optimism", logo: "/chains/optimism.svg" },
  { name: "Avalanche", logo: "/chains/avalanche.svg" }
];

export default function MainContent() {
  // Initial state
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedChain, setSelectedChain] = useState("");
  const [formData, setFormData] = useState({
    network: '',
    logo: null,
    tokenName: "",
    tokenSymbol: "",
    decimals: "18",
    initialSupply: "",
    accessControl: 'none',
    standardFunctions: [] as string[],
    securityFunctions: [] as string[],
    taxFunctions: [] as string[],
    upgradeability: "none",
    presaleType: "none",
  });

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  return (
    <div className="flex-1 pr-6 pb-6 ml-64 bg-thirty overflow-y-auto">
      <style jsx global>{scrollbarStyles}</style>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-dark p-8 h-full rounded-2xl"
      >
        <div className="max-w-4xl mx-auto pt-8">
          {/* Step 1 - Chain Selection */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-light text-center">Select Chain</h2>
              <div className="grid grid-cols-3 gap-4">
                {chains.map((chain) => (
                  <button
                    key={chain.name}
                    onClick={() => {
                      setSelectedChain(chain.name);
                      setFormData(prev => ({ ...prev, network: chain.name.toLowerCase() }));
                    }}
                    className={`h-[140px] p-6 rounded-xl border-2 transition-all ${
                      selectedChain === chain.name
                        ? "border-primary bg-primary/20"
                        : "border-secundary bg-thirty hover:border-primary/50"
                    }`}
                  >
                    <div className="flex flex-col items-center justify-center h-full gap-4">
                      <div className="w-12 h-12 flex items-center justify-center">
                        <Image
                          src={chain.logo}
                          alt={chain.name}
                          width={40}
                          height={40}
                          className={`w-10 h-10 object-contain ${
                            selectedChain === chain.name ? "" : "opacity-50"
                          }`}
                        />
                      </div>
                      <span className="text-light font-medium">{chain.name}</span>
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex justify-end pt-4">
                <button
                  onClick={handleNext}
                  disabled={!selectedChain}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 2 - Basic Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-light text-center">Basic Information</h2>
              
              <div className="relative max-w-3xl mx-auto h-[600px] flex items-center justify-center">
                {/* Center - Logo Upload */}
                <div className="absolute z-10">
                  <button 
                    className="w-48 h-48 rounded-full bg-thirty flex flex-col items-center justify-center border-2 border-dashed border-primary hover:bg-primary/20 transition-colors"
                    onClick={() => document.getElementById('logo-upload')?.click()}
                  >
                    {formData.logo ? (
                      <Image
                        src={URL.createObjectURL(formData.logo)}
                        alt="Token Logo"
                        width={120}
                        height={120}
                        className="rounded-full"
                      />
                    ) : (
                      <>
                        <CloudArrowUpIcon className="w-20 h-20 text-primary" />
                        <span className="text-light text-sm mt-2">Upload logo</span>
                      </>
                    )}
                  </button>
                  <input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setFormData(prev => ({ ...prev, logo: file }));
                    }}
                  />
                </div>

                {/* Top - Token Name */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72">
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.tokenName}
                      onChange={(e) => setFormData(prev => ({ ...prev, tokenName: e.target.value }))}
                      className="w-full px-4 pt-3 pb-12 bg-thirty rounded-xl border border-secundary text-light focus:border-primary outline-none text-center"
                      placeholder="e.g. Ethereum"
                    />
                    <div className="absolute bottom-0 left-0 right-0 py-2 px-4 bg-primary/20 rounded-b-xl">
                      <span className="text-primary text-sm font-medium">Token Name</span>
                    </div>
                  </div>
                </div>

                {/* Bottom - Initial Supply */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72">
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.initialSupply}
                      onChange={(e) => setFormData(prev => ({ ...prev, initialSupply: e.target.value }))}
                      className="w-full px-4 pt-3 pb-12 bg-thirty rounded-xl border border-secundary text-light focus:border-primary outline-none text-center"
                      placeholder="e.g. 1000000"
                    />
                    <div className="absolute bottom-0 left-0 right-0 py-2 px-4 bg-primary/20 rounded-b-xl">
                      <span className="text-primary text-sm font-medium">Initial Supply</span>
                    </div>
                  </div>
                </div>

                {/* Left - Decimals */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-72 -translate-x-24">
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.decimals}
                      onChange={(e) => setFormData(prev => ({ ...prev, decimals: e.target.value }))}
                      className="w-full px-4 pt-3 pb-12 bg-thirty rounded-xl border border-secundary text-light focus:border-primary outline-none text-center"
                      placeholder="18"
                    />
                    <div className="absolute bottom-0 left-0 right-0 py-2 px-4 bg-primary/20 rounded-b-xl">
                      <span className="text-primary text-sm font-medium">Decimals</span>
                    </div>
                  </div>
                </div>

                {/* Right - Token Symbol */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-72 translate-x-24">
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.tokenSymbol}
                      onChange={(e) => setFormData(prev => ({ ...prev, tokenSymbol: e.target.value }))}
                      className="w-full px-4 pt-3 pb-12 bg-thirty rounded-xl border border-secundary text-light focus:border-primary outline-none text-center"
                      placeholder="e.g. ETH"
                    />
                    <div className="absolute bottom-0 left-0 right-0 py-2 px-4 bg-primary/20 rounded-b-xl">
                      <span className="text-primary text-sm font-medium">Token Symbol</span>
                    </div>
                  </div>
                </div>

                {/* Decorative rings */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full border border-primary/10 rotate-45"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border border-primary/20 -rotate-45"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border border-primary/30"></div>
                  
                  {/* Connector lines */}
                  <div className="absolute top-1/2 left-1/2 w-[600px] h-[2px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
                  <div className="absolute top-1/2 left-1/2 w-[2px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-primary/20 to-transparent"></div>
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-between max-w-2xl mx-auto pt-4">
                <button
                  onClick={handleBack}
                  className="px-6 py-2 bg-thirty text-light rounded-lg hover:bg-thirty/80 border border-secundary"
                >
                  <div className="flex items-center gap-2">
                    <ChevronLeftIcon className="w-5 h-5" />
                    Back
                  </div>
                </button>
                <button
                  onClick={handleNext}
                  disabled={!formData.tokenName || !formData.tokenSymbol || !formData.initialSupply}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center gap-2">
                    Continue
                    <ChevronRightIcon className="w-5 h-5" />
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Step 3 - Access Control */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-light text-center">Access Control</h2>
              
              <div className="relative max-w-3xl mx-auto h-[600px] flex items-center justify-center">
                {/* Center - Logo */}
                <div className="absolute z-10">
                  <div className="w-48 h-48 rounded-full bg-thirty flex items-center justify-center border-2 border-primary">
                    {formData.logo ? (
                      <Image
                        src={URL.createObjectURL(formData.logo)}
                        alt="Token Logo"
                        width={120}
                        height={120}
                        className="rounded-full"
                      />
                    ) : (
                      <span className="text-primary text-6xl font-bold">?</span>
                    )}
                  </div>
                </div>

                {/* Up - Ownable */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72">
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, accessControl: 'ownable' }))}
                    className={`w-full p-6 rounded-xl border-2 transition-all ${
                      formData.accessControl === 'ownable'
                        ? "border-primary bg-primary/20"
                        : "border-secundary bg-thirty hover:border-primary/50"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <KeyIcon className={`w-12 h-12 ${formData.accessControl === 'ownable' ? 'text-primary' : 'text-light'}`} />
                      <span className="text-light font-medium">Ownable</span>
                    </div>
                  </button>
                </div>

                {/* Down - None */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72">
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, accessControl: 'none' }))}
                    className={`w-full p-6 rounded-xl border-2 transition-all ${
                      formData.accessControl === 'none'
                        ? "border-primary bg-primary/20"
                        : "border-secundary bg-thirty hover:border-primary/50"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <NoSymbolIcon className={`w-12 h-12 ${formData.accessControl === 'none' ? 'text-primary' : 'text-light'}`} />
                      <span className="text-light font-medium">None</span>
                    </div>
                  </button>
                </div>

                {/* Left - Roles */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-72 -translate-x-24">
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, accessControl: 'roles' }))}
                    className={`w-full p-6 rounded-xl border-2 transition-all ${
                      formData.accessControl === 'roles'
                        ? "border-primary bg-primary/20"
                        : "border-secundary bg-thirty hover:border-primary/50"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <UsersIcon className={`w-12 h-12 ${formData.accessControl === 'roles' ? 'text-primary' : 'text-light'}`} />
                      <span className="text-light font-medium">Roles</span>
                    </div>
                  </button>
                </div>

                {/* Rigth - Manager */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-72 translate-x-24">
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, accessControl: 'manager' }))}
                    className={`w-full p-6 rounded-xl border-2 transition-all ${
                      formData.accessControl === 'manager'
                        ? "border-primary bg-primary/20"
                        : "border-secundary bg-thirty hover:border-primary/50"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <UserCircleIcon className={`w-12 h-12 ${formData.accessControl === 'manager' ? 'text-primary' : 'text-light'}`} />
                      <span className="text-light font-medium">Manager</span>
                    </div>
                  </button>
                </div>

                {/* Decorative rings */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full border border-primary/10 rotate-45"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border border-primary/20 -rotate-45"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border border-primary/30"></div>
                  
                  {/* Connector lines */}
                  <div className="absolute top-1/2 left-1/2 w-[600px] h-[2px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
                  <div className="absolute top-1/2 left-1/2 w-[2px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-primary/20 to-transparent"></div>
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-between max-w-2xl mx-auto pt-4">
                <button
                  onClick={handleBack}
                  className="px-6 py-2 bg-thirty text-light rounded-lg hover:bg-thirty/80 border border-secundary"
                >
                  <div className="flex items-center gap-2">
                    <ChevronLeftIcon className="w-5 h-5" />
                    Back
                  </div>
                </button>
                <button
                  onClick={handleNext}
                  disabled={!formData.accessControl}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center gap-2">
                    Continue
                    <ChevronRightIcon className="w-5 h-5" />
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Step 4 - Standard Functions */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-light text-center">Standard Functions</h2>
              
              <div className="relative max-w-3xl mx-auto h-[600px] flex items-center justify-center">
                {/* Center - Logo */}
                <div className="absolute z-10">
                  <div className="w-48 h-48 rounded-full bg-thirty flex items-center justify-center border-2 border-primary">
                    {formData.logo ? (
                      <Image
                        src={URL.createObjectURL(formData.logo)}
                        alt="Token Logo"
                        width={120}
                        height={120}
                        className="rounded-full"
                      />
                    ) : (
                      <span className="text-primary text-6xl font-bold">?</span>
                    )}
                  </div>
                </div>

                {/* Up - Burn */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72">
                  <button
                    onClick={() => {
                      const newStandardFunctions = formData.standardFunctions.includes('burn')
                        ? formData.standardFunctions.filter(f => f !== 'burn')
                        : [...formData.standardFunctions, 'burn'];
                      setFormData(prev => ({ ...prev, standardFunctions: newStandardFunctions }));
                    }}
                    className={`w-full p-6 rounded-xl border-2 transition-all ${
                      formData.standardFunctions.includes('burn')
                        ? "border-primary bg-primary/20"
                        : "border-secundary bg-thirty hover:border-primary/50"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <FireIcon className={`w-12 h-12 ${formData.standardFunctions.includes('burn') ? 'text-primary' : 'text-light'}`} />
                      <span className="text-light font-medium">Burn</span>
                    </div>
                  </button>
                </div>

                {/* Down - Cappable */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72">
                  <button
                    onClick={() => {
                      const newStandardFunctions = formData.standardFunctions.includes('cappable')
                        ? formData.standardFunctions.filter(f => f !== 'cappable')
                        : [...formData.standardFunctions, 'cappable'];
                      setFormData(prev => ({ ...prev, standardFunctions: newStandardFunctions }));
                    }}
                    className={`w-full p-6 rounded-xl border-2 transition-all ${
                      formData.standardFunctions.includes('cappable')
                        ? "border-primary bg-primary/20"
                        : "border-secundary bg-thirty hover:border-primary/50"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <StopIcon className={`w-12 h-12 ${formData.standardFunctions.includes('cappable') ? 'text-primary' : 'text-light'}`} />
                      <span className="text-light font-medium">Cappable</span>
                    </div>
                  </button>
                </div>

                {/* Left - Mint */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-72 -translate-x-24">
                  <button
                    onClick={() => {
                      const newStandardFunctions = formData.standardFunctions.includes('mint')
                        ? formData.standardFunctions.filter(f => f !== 'mint')
                        : [...formData.standardFunctions, 'mint'];
                      setFormData(prev => ({ ...prev, standardFunctions: newStandardFunctions }));
                    }}
                    className={`w-full p-6 rounded-xl border-2 transition-all ${
                      formData.standardFunctions.includes('mint')
                        ? "border-primary bg-primary/20"
                        : "border-secundary bg-thirty hover:border-primary/50"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <PlusCircleIcon className={`w-12 h-12 ${formData.standardFunctions.includes('mint') ? 'text-primary' : 'text-light'}`} />
                      <span className="text-light font-medium">Mint</span>
                    </div>
                  </button>
                </div>

                {/* Right - Pausable */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-72 translate-x-24">
                  <button
                    onClick={() => {
                      const newStandardFunctions = formData.standardFunctions.includes('pausable')
                        ? formData.standardFunctions.filter(f => f !== 'pausable')
                        : [...formData.standardFunctions, 'pausable'];
                      setFormData(prev => ({ ...prev, standardFunctions: newStandardFunctions }));
                    }}
                    className={`w-full p-6 rounded-xl border-2 transition-all ${
                      formData.standardFunctions.includes('pausable')
                        ? "border-primary bg-primary/20"
                        : "border-secundary bg-thirty hover:border-primary/50"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <PauseIcon className={`w-12 h-12 ${formData.standardFunctions.includes('pausable') ? 'text-primary' : 'text-light'}`} />
                      <span className="text-light font-medium">Pausable</span>
                    </div>
                  </button>
                </div>

                {/* Decorative rings */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full border border-primary/10 rotate-45"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border border-primary/20 -rotate-45"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border border-primary/30"></div>
                  
                  {/* Connector lines */}
                  <div className="absolute top-1/2 left-1/2 w-[600px] h-[2px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
                  <div className="absolute top-1/2 left-1/2 w-[2px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-primary/20 to-transparent"></div>
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-between max-w-2xl mx-auto pt-4">
                <button
                  onClick={handleBack}
                  className="px-6 py-2 bg-thirty text-light rounded-lg hover:bg-thirty/80 border border-secundary"
                >
                  <div className="flex items-center gap-2">
                    <ChevronLeftIcon className="w-5 h-5" />
                    Back
                  </div>
                </button>
                <button
                  onClick={handleNext}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                >
                  <div className="flex items-center gap-2">
                    Continue
                    <ChevronRightIcon className="w-5 h-5" />
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Step 5 - Security Functions */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-light text-center">Security Functions</h2>
              
              <div className="relative max-w-3xl mx-auto h-[600px] flex items-center justify-center">
                {/* Center - Logo */}
                <div className="absolute z-10">
                  <div className="w-48 h-48 rounded-full bg-thirty flex items-center justify-center border-2 border-primary">
                    {formData.logo ? (
                      <Image
                        src={URL.createObjectURL(formData.logo)}
                        alt="Token Logo"
                        width={120}
                        height={120}
                        className="rounded-full"
                      />
                    ) : (
                      <span className="text-primary text-6xl font-bold">?</span>
                    )}
                  </div>
                </div>

                {/* Top - Antisnipper */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72">
                  <button
                    onClick={() => {
                      const newSecurityFunctions = formData.securityFunctions.includes('antisnipper')
                        ? formData.securityFunctions.filter(f => f !== 'antisnipper')
                        : [...formData.securityFunctions, 'antisnipper'];
                      setFormData(prev => ({ ...prev, securityFunctions: newSecurityFunctions }));
                    }}
                    className={`w-full p-6 rounded-xl border-2 transition-all ${
                      formData.securityFunctions.includes('antisnipper')
                        ? "border-primary bg-primary/20"
                        : "border-secundary bg-thirty hover:border-primary/50"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <ShieldCheckIcon className={`w-12 h-12 ${formData.securityFunctions.includes('antisnipper') ? 'text-primary' : 'text-light'}`} />
                      <span className="text-light font-medium">Antisnipper</span>
                    </div>
                  </button>
                </div>

                {/* Bottom - Allowlist */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72">
                  <button
                    onClick={() => {
                      const newSecurityFunctions = formData.securityFunctions.includes('allowlist')
                        ? formData.securityFunctions.filter(f => f !== 'allowlist')
                        : [...formData.securityFunctions, 'allowlist'];
                      setFormData(prev => ({ ...prev, securityFunctions: newSecurityFunctions }));
                    }}
                    className={`w-full p-6 rounded-xl border-2 transition-all ${
                      formData.securityFunctions.includes('allowlist')
                        ? "border-primary bg-primary/20"
                        : "border-secundary bg-thirty hover:border-primary/50"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <UserPlusIcon className={`w-12 h-12 ${formData.securityFunctions.includes('allowlist') ? 'text-primary' : 'text-light'}`} />
                      <span className="text-light font-medium">Allowlist</span>
                    </div>
                  </button>
                </div>

                {/* Left - Antibot */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-72 -translate-x-24">
                  <button
                    onClick={() => {
                      const newSecurityFunctions = formData.securityFunctions.includes('antibot')
                        ? formData.securityFunctions.filter(f => f !== 'antibot')
                        : [...formData.securityFunctions, 'antibot'];
                      setFormData(prev => ({ ...prev, securityFunctions: newSecurityFunctions }));
                    }}
                    className={`w-full p-6 rounded-xl border-2 transition-all ${
                      formData.securityFunctions.includes('antibot')
                        ? "border-primary bg-primary/20"
                        : "border-secundary bg-thirty hover:border-primary/50"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <NoSymbolIcon className={`w-12 h-12 ${formData.securityFunctions.includes('antibot') ? 'text-primary' : 'text-light'}`} />
                      <span className="text-light font-medium">Antibot</span>
                    </div>
                  </button>
                </div>

                {/* Right - Blacklist */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-72 translate-x-24">
                  <button
                    onClick={() => {
                      const newSecurityFunctions = formData.securityFunctions.includes('blacklist')
                        ? formData.securityFunctions.filter(f => f !== 'blacklist')
                        : [...formData.securityFunctions, 'blacklist'];
                      setFormData(prev => ({ ...prev, securityFunctions: newSecurityFunctions }));
                    }}
                    className={`w-full p-6 rounded-xl border-2 transition-all ${
                      formData.securityFunctions.includes('blacklist')
                        ? "border-primary bg-primary/20"
                        : "border-secundary bg-thirty hover:border-primary/50"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <UserGroupIcon className={`w-12 h-12 ${formData.securityFunctions.includes('blacklist') ? 'text-primary' : 'text-light'}`} />
                      <span className="text-light font-medium">Blacklist</span>
                    </div>
                  </button>
                </div>

                {/* Decorative rings */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full border border-primary/10 rotate-45"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border border-primary/20 -rotate-45"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border border-primary/30"></div>
                  
                  {/* Connector lines */}
                  <div className="absolute top-1/2 left-1/2 w-[600px] h-[2px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
                  <div className="absolute top-1/2 left-1/2 w-[2px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-primary/20 to-transparent"></div>
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-between max-w-2xl mx-auto pt-4">
                <button
                  onClick={handleBack}
                  className="px-6 py-2 bg-thirty text-light rounded-lg hover:bg-thirty/80 border border-secundary"
                >
                  <div className="flex items-center gap-2">
                    <ChevronLeftIcon className="w-5 h-5" />
                    Back
                  </div>
                </button>
                <button
                  onClick={handleNext}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                >
                  <div className="flex items-center gap-2">
                    Continue
                    <ChevronRightIcon className="w-5 h-5" />
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Step 6 - Tax Functions */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-light text-center">Tax Functions</h2>
              
              <div className="relative max-w-3xl mx-auto h-[600px] flex items-center justify-center">
                {/* Center - Logo */}
                <div className="absolute z-10">
                  <div className="w-48 h-48 rounded-full bg-thirty flex items-center justify-center border-2 border-primary">
                    {formData.logo ? (
                      <Image
                        src={URL.createObjectURL(formData.logo)}
                        alt="Token Logo"
                        width={120}
                        height={120}
                        className="rounded-full"
                      />
                    ) : (
                      <span className="text-primary text-6xl font-bold">?</span>
                    )}
                  </div>
                </div>

                {/* Top - Dividends */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72">
                  <button
                    onClick={() => {
                      const newTaxFunctions = formData.taxFunctions.includes('dividends')
                        ? formData.taxFunctions.filter(f => f !== 'dividends')
                        : [...formData.taxFunctions, 'dividends'];
                      setFormData(prev => ({ ...prev, taxFunctions: newTaxFunctions }));
                    }}
                    className={`w-full p-6 rounded-xl border-2 transition-all ${
                      formData.taxFunctions.includes('dividends')
                        ? "border-primary bg-primary/20"
                        : "border-secundary bg-thirty hover:border-primary/50"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <ChartBarIcon className={`w-12 h-12 ${formData.taxFunctions.includes('dividends') ? 'text-primary' : 'text-light'}`} />
                      <span className="text-light font-medium">Dividends</span>
                    </div>
                  </button>
                </div>

                {/* Bottom - Treasury Fee */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72">
                  <button
                    onClick={() => {
                      const newTaxFunctions = formData.taxFunctions.includes('treasuryFee')
                        ? formData.taxFunctions.filter(f => f !== 'treasuryFee')
                        : [...formData.taxFunctions, 'treasuryFee'];
                      setFormData(prev => ({ ...prev, taxFunctions: newTaxFunctions }));
                    }}
                    className={`w-full p-6 rounded-xl border-2 transition-all ${
                      formData.taxFunctions.includes('treasuryFee')
                        ? "border-primary bg-primary/20"
                        : "border-secundary bg-thirty hover:border-primary/50"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <BuildingLibraryIcon className={`w-12 h-12 ${formData.taxFunctions.includes('treasuryFee') ? 'text-primary' : 'text-light'}`} />
                      <span className="text-light font-medium">Treasury Fee</span>
                    </div>
                  </button>
                </div>

                {/* Left - Auto LP */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-72 -translate-x-24">
                  <button
                    onClick={() => {
                      const newTaxFunctions = formData.taxFunctions.includes('autoLP')
                        ? formData.taxFunctions.filter(f => f !== 'autoLP')
                        : [...formData.taxFunctions, 'autoLP'];
                      setFormData(prev => ({ ...prev, taxFunctions: newTaxFunctions }));
                    }}
                    className={`w-full p-6 rounded-xl border-2 transition-all ${
                      formData.taxFunctions.includes('autoLP')
                        ? "border-primary bg-primary/20"
                        : "border-secundary bg-thirty hover:border-primary/50"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <ArrowsRightLeftIcon className={`w-12 h-12 ${formData.taxFunctions.includes('autoLP') ? 'text-primary' : 'text-light'}`} />
                      <span className="text-light font-medium">Auto LP</span>
                    </div>
                  </button>
                </div>

                {/* Right - Auto Burn */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-72 translate-x-24">
                  <button
                    onClick={() => {
                      const newTaxFunctions = formData.taxFunctions.includes('autoBurn')
                        ? formData.taxFunctions.filter(f => f !== 'autoBurn')
                        : [...formData.taxFunctions, 'autoBurn'];
                      setFormData(prev => ({ ...prev, taxFunctions: newTaxFunctions }));
                    }}
                    className={`w-full p-6 rounded-xl border-2 transition-all ${
                      formData.taxFunctions.includes('autoBurn')
                        ? "border-primary bg-primary/20"
                        : "border-secundary bg-thirty hover:border-primary/50"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <FireIcon className={`w-12 h-12 ${formData.taxFunctions.includes('autoBurn') ? 'text-primary' : 'text-light'}`} />
                      <span className="text-light font-medium">Auto Burn</span>
                    </div>
                  </button>
                </div>

                {/* Decorative rings */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full border border-primary/10 rotate-45"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border border-primary/20 -rotate-45"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border border-primary/30"></div>
                  
                  {/* Connector lines */}
                  <div className="absolute top-1/2 left-1/2 w-[600px] h-[2px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
                  <div className="absolute top-1/2 left-1/2 w-[2px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-primary/20 to-transparent"></div>
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-between max-w-2xl mx-auto pt-4">
                <button
                  onClick={handleBack}
                  className="px-6 py-2 bg-thirty text-light rounded-lg hover:bg-thirty/80 border border-secundary"
                >
                  <div className="flex items-center gap-2">
                    <ChevronLeftIcon className="w-5 h-5" />
                    Back
                  </div>
                </button>
                <button
                  onClick={handleNext}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                >
                  <div className="flex items-center gap-2">
                    Continue
                    <ChevronRightIcon className="w-5 h-5" />
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Step 7 - Upgradeability */}
          {currentStep === 7 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-light text-center">Upgradeability</h2>
              
              <div className="relative max-w-3xl mx-auto h-[600px] flex items-center justify-center">
                {/* Center - Logo */}
                <div className="absolute z-10">
                  <div className="w-48 h-48 rounded-full bg-thirty flex items-center justify-center border-2 border-primary">
                    {formData.logo ? (
                      <Image
                        src={URL.createObjectURL(formData.logo)}
                        alt="Token Logo"
                        width={120}
                        height={120}
                        className="rounded-full"
                      />
                    ) : (
                      <span className="text-primary text-6xl font-bold">?</span>
                    )}
                  </div>
                </div>

                {/* Right - Transparent */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-72 translate-x-24">
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, upgradeability: 'transparent' }))}
                    className={`w-full p-6 rounded-xl border-2 transition-all ${
                      formData.upgradeability === 'transparent'
                        ? "border-primary bg-primary/20"
                        : "border-secundary bg-thirty hover:border-primary/50"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <CodeBracketIcon className={`w-12 h-12 ${formData.upgradeability === 'transparent' ? 'text-primary' : 'text-light'}`} />
                      <span className="text-light font-medium">Transparent</span>
                    </div>
                  </button>
                </div>

                {/* Bottom - None */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72">
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, upgradeability: 'none' }))}
                    className={`w-full p-6 rounded-xl border-2 transition-all ${
                      formData.upgradeability === 'none'
                        ? "border-primary bg-primary/20"
                        : "border-secundary bg-thirty hover:border-primary/50"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <LockClosedIcon className={`w-12 h-12 ${formData.upgradeability === 'none' ? 'text-primary' : 'text-light'}`} />
                      <span className="text-light font-medium">None</span>
                    </div>
                  </button>
                </div>

                {/* Left - UUPS */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-72 -translate-x-24">
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, upgradeability: 'uups' }))}
                    className={`w-full p-6 rounded-xl border-2 transition-all ${
                      formData.upgradeability === 'uups'
                        ? "border-primary bg-primary/20"
                        : "border-secundary bg-thirty hover:border-primary/50"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <ArrowPathRoundedSquareIcon className={`w-12 h-12 ${formData.upgradeability === 'uups' ? 'text-primary' : 'text-light'}`} />
                      <span className="text-light font-medium">UUPS</span>
                    </div>
                  </button>
                </div>

                {/* Decorative rings */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full border border-primary/10 rotate-45"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border border-primary/20 -rotate-45"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border border-primary/30"></div>
                  
                  {/* Connector lines */}
                  <div className="absolute top-1/2 left-1/2 w-[600px] h-[2px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
                  <div className="absolute top-1/2 left-1/2 w-[2px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-primary/20 to-transparent"></div>
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-between max-w-2xl mx-auto pt-4">
                <button
                  onClick={handleBack}
                  className="px-6 py-2 bg-thirty text-light rounded-lg hover:bg-thirty/80 border border-secundary"
                >
                  <div className="flex items-center gap-2">
                    <ChevronLeftIcon className="w-5 h-5" />
                    Back
                  </div>
                </button>
                <button
                  onClick={handleNext}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                >
                  <div className="flex items-center gap-2">
                    Continue
                    <ChevronRightIcon className="w-5 h-5" />
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Step 8 - Presale Type */}
          {currentStep === 8 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-light text-center">Presale Type</h2>
              
              <div className="relative max-w-3xl mx-auto h-[600px] flex items-center justify-center">
                {/* Center - Logo */}
                <div className="absolute z-10">
                  <div className="w-48 h-48 rounded-full bg-thirty flex items-center justify-center border-2 border-primary">
                    {formData.logo ? (
                      <Image
                        src={URL.createObjectURL(formData.logo)}
                        alt="Token Logo"
                        width={120}
                        height={120}
                        className="rounded-full"
                      />
                    ) : (
                      <span className="text-primary text-6xl font-bold">?</span>
                    )}
                  </div>
                </div>

                {/* Top - ICO */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72">
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, presaleType: 'ico' }))}
                    className={`w-full p-6 rounded-xl border-2 transition-all ${
                      formData.presaleType === 'ico'
                        ? "border-primary bg-primary/20"
                        : "border-secundary bg-thirty hover:border-primary/50"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <GlobeAltIcon className={`w-12 h-12 ${formData.presaleType === 'ico' ? 'text-primary' : 'text-light'}`} />
                      <span className="text-light font-medium">ICO</span>
                    </div>
                  </button>
                </div>

                {/* Bottom - None */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72">
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, presaleType: 'none' }))}
                    className={`w-full p-6 rounded-xl border-2 transition-all ${
                      formData.presaleType === 'none'
                        ? "border-primary bg-primary/20"
                        : "border-secundary bg-thirty hover:border-primary/50"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <NoSymbolIcon className={`w-12 h-12 ${formData.presaleType === 'none' ? 'text-primary' : 'text-light'}`} />
                      <span className="text-light font-medium">None</span>
                    </div>
                  </button>
                </div>

                {/* Left - IDO */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-72 -translate-x-24">
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, presaleType: 'ido' }))}
                    className={`w-full p-6 rounded-xl border-2 transition-all ${
                      formData.presaleType === 'ido'
                        ? "border-primary bg-primary/20"
                        : "border-secundary bg-thirty hover:border-primary/50"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <PresentationChartLineIcon className={`w-12 h-12 ${formData.presaleType === 'ido' ? 'text-primary' : 'text-light'}`} />
                      <span className="text-light font-medium">IDO</span>
                    </div>
                  </button>
                </div>

                {/* Right - Launchpad */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-72 translate-x-24">
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, presaleType: 'launchpad' }))}
                    className={`w-full p-6 rounded-xl border-2 transition-all ${
                      formData.presaleType === 'launchpad'
                        ? "border-primary bg-primary/20"
                        : "border-secundary bg-thirty hover:border-primary/50"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <RocketLaunchIcon className={`w-12 h-12 ${formData.presaleType === 'launchpad' ? 'text-primary' : 'text-light'}`} />
                      <span className="text-light font-medium">Launchpad</span>
                    </div>
                  </button>
                </div>

                {/* Decorative rings */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full border border-primary/10 rotate-45"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border border-primary/20 -rotate-45"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border border-primary/30"></div>
                  
                  {/* Connector lines */}
                  <div className="absolute top-1/2 left-1/2 w-[600px] h-[2px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
                  <div className="absolute top-1/2 left-1/2 w-[2px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-primary/20 to-transparent"></div>
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-between max-w-2xl mx-auto pt-4">
                <button
                  onClick={handleBack}
                  className="px-6 py-2 bg-thirty text-light rounded-lg hover:bg-thirty/80 border border-secundary"
                >
                  <div className="flex items-center gap-2">
                    <ChevronLeftIcon className="w-5 h-5" />
                    Back
                  </div>
                </button>
                <button
                  onClick={handleNext}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                >
                  <div className="flex items-center gap-2">
                    Continue
                    <ChevronRightIcon className="w-5 h-5" />
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Step 9 - Token Summary */}
          {currentStep === 9 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-light text-center">Token Summary</h2>
              
              <div className="max-w-5xl mx-auto">
                <div className="bg-thirty rounded-3xl border-2 border-primary/30 overflow-hidden flex relative">
                  {/* Network badge in top left corner */}
                  <div className="absolute top-6 left-6 flex items-center gap-3 bg-dark/30 px-4 py-2 rounded-xl">
                    <Image
                      src={`/chains/${formData.network}.svg`}
                      alt={formData.network}
                      width={24}
                      height={24}
                    />
                    <span className="text-light font-medium capitalize">
                      {
                        {
                          'bsc': 'BNB Chain',
                          'ethereum': 'Ethereum',
                          'polygon': 'Polygon',
                          'arbitrum': 'Arbitrum',
                          'optimism': 'Optimism',
                          'avalanche': 'Avalanche'
                        }[formData.network] || formData.network
                      }
                    </span>
                  </div>

                  {/* Left side - Logo and basic details */}
                  <div className="w-1/3 bg-gradient-to-br from-primary/20 to-transparent p-8 flex flex-col items-center justify-center border-r border-primary/20">
                    {/* Token logo */}
                    <div className="w-40 h-40 rounded-full bg-thirty border-4 border-primary flex items-center justify-center overflow-hidden mb-6">
                      {formData.logo ? (
                        <Image
                          src={URL.createObjectURL(formData.logo)}
                          alt="Token Logo"
                          width={150}
                          height={150}
                          className="rounded-full"
                        />
                      ) : (
                        <span className="text-primary text-6xl font-bold">?</span>
                      )}
                    </div>
                    
                    {/* Token name and symbol */}
                    <h3 className="text-2xl font-bold text-light text-center mb-2">{formData.tokenName}</h3>
                    <span className="text-primary text-xl font-medium">${formData.tokenSymbol}</span>
                    
                    {/* Basic token info */}
                    <div className="mt-6 space-y-2 w-full">
                      <div className="flex items-center justify-between text-light/80">
                        <span>Initial Supply:</span>
                        <span className="text-primary">{formData.initialSupply}</span>
                      </div>
                      <div className="flex items-center justify-between text-light/80">
                        <span>Decimals:</span>
                        <span className="text-primary">{formData.decimals}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right side - Features */}
                  <div className="flex-1 p-8">
                    <div className="h-full flex flex-col">
                      {/* Main characteristics grid */}
                      <div className="grid grid-cols-2 gap-6 mb-6">
                        {/* Access Control info */}
                        <div className="bg-dark/20 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <KeyIcon className="w-6 h-6 text-primary" />
                            <h4 className="text-light font-medium">Access Control</h4>
                          </div>
                          <span className="text-primary capitalize">{formData.accessControl}</span>
                        </div>

                        {/* Upgradeability info */}
                        <div className="bg-dark/20 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <ArrowPathRoundedSquareIcon className="w-6 h-6 text-primary" />
                            <h4 className="text-light font-medium">Upgradeability</h4>
                          </div>
                          <span className="text-primary capitalize">{formData.upgradeability}</span>
                        </div>

                        {/* Presale info */}
                        <div className="bg-dark/20 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <RocketLaunchIcon className="w-6 h-6 text-primary" />
                            <h4 className="text-light font-medium">Presale Type</h4>
                          </div>
                          <span className="text-primary uppercase">{formData.presaleType}</span>
                        </div>
                      </div>

                      {/* Features columns */}
                      <div className="flex-1 grid grid-cols-3 gap-6">
                        {/* Standard Functions list */}
                        <div className="bg-dark/20 rounded-xl p-4">
                          <h4 className="text-light font-medium mb-3">Standard Functions</h4>
                          <div className="flex flex-wrap gap-2">
                            {formData.standardFunctions.map((func) => (
                              <span key={func} className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm">
                                {func}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Security Functions list */}
                        <div className="bg-dark/20 rounded-xl p-4">
                          <h4 className="text-light font-medium mb-3">Security Functions</h4>
                          <div className="flex flex-wrap gap-2">
                            {formData.securityFunctions.map((func) => (
                              <span key={func} className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm">
                                {func}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Tax Functions list */}
                        <div className="bg-dark/20 rounded-xl p-4">
                          <h4 className="text-light font-medium mb-3">Tax Functions</h4>
                          <div className="flex flex-wrap gap-2">
                            {formData.taxFunctions.map((func) => (
                              <span key={func} className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm">
                                {func}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex justify-between mt-6">
                  <button
                    onClick={handleBack}
                    className="px-6 py-3 bg-thirty text-light rounded-xl hover:bg-thirty/80 border border-secundary"
                  >
                    <div className="flex items-center gap-2">
                      <ChevronLeftIcon className="w-5 h-5" />
                      Back
                    </div>
                  </button>
                  <button
                    onClick={() => {/* Token generation logic */}}
                    className="px-8 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 flex items-center gap-3"
                  >
                    <RocketLaunchIcon className="w-6 h-6" />
                    <span className="font-medium">Deploy Token</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
