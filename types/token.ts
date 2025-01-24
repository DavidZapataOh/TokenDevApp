export interface TokenConfig {
  network: string;
  logo: File | null;
  tokenName: string;
  tokenSymbol: string;
  decimals: string;
  initialSupply: string;
  accessControl: 'none' | 'ownable' | 'roles';
  standardFunctions: string[];
  securityFunctions: string[];
  taxFunctions: string[];
  upgradeability: 'none' | 'transparent' | 'uups';
  presaleType: 'none' | 'ico' | 'ido' | 'launchpad';
} 