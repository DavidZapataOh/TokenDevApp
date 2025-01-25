export interface TokenConfig {
  network: string;
  logo: File | null;
  tokenName: string;
  tokenSymbol: string;
  decimals: string;
  initialSupply: string;
  maxSupply?: string;
  accessControl: 'none' | 'ownable' | 'roles' | 'manager';
  standardFunctions: string[];
  securityFunctions: string[];
  taxFunctions: string[];
  upgradeability: 'none' | 'transparent' | 'uups';
  presaleType: 'none' | 'ico' | 'ido' | 'launchpad';
  maxHolderLimit?: string;
  maxTransactionAmount?: string;
  tradingCooldown?: string; // en segundos
} 